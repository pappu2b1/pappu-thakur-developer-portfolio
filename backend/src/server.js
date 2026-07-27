import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { randomUUID } from 'node:crypto';
import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createResendProvider } from './contactProvider.js';
import { isFileFallbackEnabled } from './contactConfig.js';
import { clean, validateContact } from './contactValidation.js';

const app = express();
const isProduction = String(process.env.NODE_ENV || 'development').toLowerCase() === 'production';
const port = Number(process.env.PORT) || (isProduction ? 10000 : 5000);
const sourceDir = path.dirname(fileURLToPath(import.meta.url));
const outboxDir = path.resolve(sourceDir, '../data');
const outboxPath = path.join(outboxDir, 'contact-outbox.jsonl');
const contactTo = String(process.env.CONTACT_TO_EMAIL || 'contact@papputhakur.com').trim();
const contactFrom = String(process.env.CONTACT_FROM_EMAIL || 'Pappu Thakur Portfolio <portfolio@updates.papputhakur.com>').trim();
const emailProvider = String(process.env.EMAIL_PROVIDER || 'resend').trim().toLowerCase();
const resendProvider = emailProvider === 'resend'
  ? createResendProvider({ apiKey: String(process.env.RESEND_API_KEY || '').trim(), from: contactFrom, to: contactTo })
  : null;
const fileFallbackEnabled = isFileFallbackEnabled();
const genericFailure = 'Your enquiry could not be safely delivered right now. Please contact me directly by email or WhatsApp.';
const requestIdFor = (request) => clean(request.get('x-request-id'), 100) || randomUUID();

async function storeEnquiry(enquiry, requestId) {
  await mkdir(outboxDir, { recursive: true });
  const record = { ...enquiry, requestId, storedAt: new Date().toISOString() };
  await appendFile(outboxPath, `${JSON.stringify(record)}\n`, { encoding: 'utf8', flag: 'a' });
}

async function deliverByEmail(enquiry, requestId) {
  if (!resendProvider) throw new Error('Unsupported email provider');
  return resendProvider.send(enquiry, requestId);
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
app.get('/api/version', (_, response) => response.json({ version: '1.3.0' }));
app.post('/api/contact', contactLimiter, async (request, response) => {
  const requestId = requestIdFor(request);
  const result = validateContact(request.body || {});
  if (result.error) return response.status(400).json({ success: false, ok: false, error: result.error, requestId });
  try {
    await deliverByEmail(result.enquiry, requestId);
    console.info('Contact enquiry delivered', { requestId, channel: 'resend' });
    return response.status(201).json({ success: true, ok: true, message: 'Your enquiry has been received.', deliveryStatus: 'emailed', requestId });
  } catch {
    if (fileFallbackEnabled) {
      try {
        await storeEnquiry(result.enquiry, requestId);
        console.warn('Contact enquiry stored for delivery', { requestId, channel: 'outbox' });
        return response.status(201).json({ success: true, ok: true, message: 'Your enquiry has been received.', deliveryStatus: 'queued', requestId });
      } catch {
        // Fall through to the safe failure response.
      }
    }
    console.error('Contact enquiry could not be delivered', { requestId });
    return response.status(503).json({ success: false, ok: false, error: genericFailure, requestId });
  }
});
app.use((_, response) => response.status(404).json({ success: false, ok: false, error: 'Not found' }));
app.use((error, _, response, __) => { console.error('Unhandled API error', { name: error?.name, message: error?.message }); response.status(500).json({ success: false, ok: false, error: 'The server could not process the request.' }); });

const server = app.listen(port, '0.0.0.0', () => console.log(`Portfolio API listening on ${port}`));
const shutdown = () => server.close(() => process.exit(0));
process.once('SIGTERM', shutdown);
process.once('SIGINT', shutdown);