import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import { randomUUID } from 'node:crypto';
import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT || 5000);
const sourceDir = path.dirname(fileURLToPath(import.meta.url));
const outboxDir = path.resolve(sourceDir, '../data');
const outboxPath = path.join(outboxDir, 'contact-outbox.jsonl');
const contactTo = String(process.env.CONTACT_TO_EMAIL || 'contact@papputhakur.com').trim();
const smtpHost = String(process.env.SMTP_HOST || '').trim();
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = ['1', 'true', 'yes'].includes(String(process.env.SMTP_SECURE || '').toLowerCase());
const smtpUser = String(process.env.SMTP_USER || '').trim();
const smtpPass = String(process.env.SMTP_PASS || '');
const contactFrom = String(process.env.CONTACT_FROM_EMAIL || smtpUser || '').trim();
const smtpPortValid = Number.isInteger(smtpPort) && smtpPort >= 1 && smtpPort <= 65535;
const smtpFields = [smtpHost, smtpUser, smtpPass, contactFrom];
const smtpPartiallyConfigured = smtpFields.some(Boolean) && !smtpFields.every(Boolean);
const smtpTransport = smtpPortValid && !smtpPartiallyConfigured && smtpFields.every(Boolean)
  ? nodemailer.createTransport({ host: smtpHost, port: smtpPort, secure: smtpSecure, auth: { user: smtpUser, pass: smtpPass } })
  : null;

const genericFailure = 'Your enquiry could not be safely delivered right now. Please contact me directly by email or WhatsApp.';
const emailPattern = /^[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]+$/;
const clean = (value, max) => String(value ?? '').replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
const requestIdFor = (request) => clean(request.get('x-request-id'), 100) || randomUUID();

function validateContact(body) {
  const rawName = String(body.name ?? '').trim();
  const rawMessage = String(body.message ?? '').trim();
  if (rawName.length > 120) return { error: 'Please provide a valid name.' };
  if (rawMessage.length > 2000) return { error: 'Please provide a message between 20 and 2,000 characters.' };
  const enquiry = {
    name: clean(body.name, 120),
    email: String(body.email ?? '').trim(),
    company: clean(body.company, 200),
    opportunityType: clean(body.opportunityType, 100),
    budget: clean(body.budget, 100),
    message: clean(body.message, 2000),
    website: clean(body.website, 200),
  };
  if (enquiry.email.length > 254 || !emailPattern.test(enquiry.email)) return { error: 'Please provide a valid email address.' };
  if (!enquiry.name) return { error: 'Please provide a valid name.' };
  if (!enquiry.opportunityType) return { error: 'Please select an opportunity type.' };
  if (enquiry.message.length < 20) return { error: 'Please provide a message between 20 and 2,000 characters.' };
  if (enquiry.website) return { error: 'Unable to process submission.' };
  delete enquiry.website;
  return { enquiry };
}

async function storeEnquiry(enquiry, requestId) {
  await mkdir(outboxDir, { recursive: true });
  const record = { ...enquiry, requestId, storedAt: new Date().toISOString() };
  await appendFile(outboxPath, `${JSON.stringify(record)}\n`, { encoding: 'utf8', flag: 'a' });
}

async function deliverByEmail(enquiry, requestId) {
  if (!smtpTransport) throw new Error('SMTP is not configured or is incomplete');
  const submittedAt = new Date().toISOString();
  const text = [
    'New portfolio enquiry', `Request ID: ${requestId}`, `Submission time: ${submittedAt}`,
    `Name: ${enquiry.name}`, `Email: ${enquiry.email}`, `Company: ${enquiry.company || 'Not provided'}`,
    `Opportunity type: ${enquiry.opportunityType}`, `Budget range: ${enquiry.budget || 'Not provided'}`,
    '', 'Message:', enquiry.message,
  ].join('\n');
  await smtpTransport.sendMail({ to: contactTo, from: contactFrom, replyTo: enquiry.email, subject: `Portfolio enquiry: ${enquiry.opportunityType} [${requestId}]`, text });
}

const configuredOrigins = String(process.env.CORS_ORIGINS || '').split(',').map((origin) => origin.trim()).filter(Boolean);
const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    return callback(null, configuredOrigins.includes(origin));
  },
};
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 100, standardHeaders: true, legacyHeaders: false,
  handler: (_, response) => response.status(429).json({ success: false, ok: false, error: 'Too many requests were submitted. Please wait before trying again.' }),
});

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '50kb' }));
app.get('/api/health', (_, response) => response.json({ ok: true }));
app.get('/api/version', (_, response) => response.json({ version: '1.2.0' }));
app.post('/api/contact', contactLimiter, async (request, response) => {
  const requestId = requestIdFor(request);
  const result = validateContact(request.body || {});
  if (result.error) return response.status(400).json({ success: false, ok: false, error: result.error, requestId });
  try {
    await deliverByEmail(result.enquiry, requestId);
    console.info('Contact enquiry delivered', { requestId, channel: 'email' });
    return response.status(201).json({ success: true, ok: true, message: 'Your enquiry has been received.', deliveryStatus: 'emailed', requestId });
  } catch {
    try {
      await storeEnquiry(result.enquiry, requestId);
      console.warn('Contact enquiry stored for delivery', { requestId, channel: 'outbox' });
      return response.status(201).json({ success: true, ok: true, message: 'Your enquiry has been received.', deliveryStatus: 'queued', requestId });
    } catch {
      console.error('Contact enquiry could not be delivered or stored', { requestId });
      return response.status(503).json({ success: false, ok: false, error: genericFailure, requestId });
    }
  }
});
app.use((_, response) => response.status(404).json({ success: false, ok: false, error: 'Not found' }));
app.use((error, _, response, __) => { console.error('Unhandled API error', { name: error?.name, message: error?.message }); response.status(500).json({ success: false, ok: false, error: 'The server could not process the request.' }); });
app.listen(port, '0.0.0.0', () => console.log(`Portfolio API listening on ${port}`));