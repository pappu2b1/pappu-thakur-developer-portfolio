import { readFile, writeFile, rename, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outbox = path.join(root, 'data', 'contact-outbox.jsonl');
const temp = `${outbox}.tmp`;
const host = String(process.env.SMTP_HOST || '').trim(); const port = Number(process.env.SMTP_PORT || 587); const secure = ['1','true','yes'].includes(String(process.env.SMTP_SECURE || '').toLowerCase()); const user = String(process.env.SMTP_USER || '').trim(); const pass = String(process.env.SMTP_PASS || ''); const from = String(process.env.CONTACT_FROM_EMAIL || user || '').trim(); const to = String(process.env.CONTACT_TO_EMAIL || 'contact@papputhakur.com').trim();
const configured = Number.isInteger(port) && port >= 1 && port <= 65535 && [host,user,pass,from].every(Boolean);
const report = { attempted: 0, delivered: 0, failed: 0, remaining: 0 }; let raw;
try { raw = await readFile(outbox, 'utf8'); } catch (error) { if (error.code === 'ENOENT') { console.log(JSON.stringify(report)); process.exit(0); } throw error; }
const lines = raw.split(/\r?\n/).filter(Boolean); const pending = [];
if (!configured) { report.remaining = lines.length; console.log(JSON.stringify(report)); process.exit(0); }
const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
for (const line of lines) { let record; try { record = JSON.parse(line); } catch { pending.push(line); report.failed += 1; continue; } if (!record || !record.email || !record.name || !record.message || !record.requestId) { pending.push(line); report.failed += 1; continue; } report.attempted += 1; const text = ['Queued portfolio enquiry',`Request ID: ${record.requestId}`,`Submission time: ${record.storedAt || 'Unknown'}`,`Name: ${record.name}`,`Email: ${record.email}`,`Company: ${record.company || 'Not provided'}`,`Opportunity type: ${record.opportunityType || 'Not provided'}`,`Budget range: ${record.budget || 'Not provided'}`,'','Message:',record.message].join('\n'); try { await transporter.sendMail({ to, from, replyTo: record.email, subject: `Portfolio enquiry: ${String(record.opportunityType || 'General').replace(/[\r\n]/g, ' ')} [${record.requestId}]`, text }); report.delivered += 1; } catch { pending.push(line); report.failed += 1; } }
report.remaining = pending.length; if (pending.length) await writeFile(temp, `${pending.join('\n')}\n`, 'utf8'); else { try { await unlink(outbox); } catch (error) { if (error.code !== 'ENOENT') throw error; } } if (pending.length) await rename(temp, outbox); console.log(JSON.stringify(report));