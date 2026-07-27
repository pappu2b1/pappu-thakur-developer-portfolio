import test from 'node:test';
import assert from 'node:assert/strict';
import { buildEmailContent, createResendProvider } from '../src/contactProvider.js';
import { isFileFallbackEnabled } from '../src/contactConfig.js';
import { validateContact } from '../src/contactValidation.js';

const enquiry = { name: 'A <script>alert(1)</script>', email: 'visitor@example.com', company: 'Example & Co', opportunityType: 'Website', budget: 'Not specified', message: 'Build a useful website with a clear enquiry flow.' };
const response = (ok, status = ok ? 200 : 500) => ({ ok, status });

test('Resend success sends safe content and reply-to', async () => {
  let request;
  const provider = createResendProvider({ apiKey: 'test-key', from: 'Pappu Thakur Portfolio <portfolio@updates.papputhakur.com>', to: 'contact@papputhakur.com', fetchImpl: async (url, options) => { request = { url, options, body: JSON.parse(options.body) }; return response(true); } });
  await provider.send(enquiry, 'request-123');
  assert.equal(request.url, 'https://api.resend.com/emails');
  assert.equal(request.options.headers.Authorization, 'Bearer test-key');
  assert.equal(request.body.reply_to, enquiry.email);
  assert.match(request.body.text, /Request ID: request-123/);
  assert.match(request.body.html, /&lt;script&gt;/);
  assert.doesNotMatch(request.body.html, /<script>/);
});

test('Resend rejection, missing key, and timeout fail safely', async () => {
  const rejected = createResendProvider({ apiKey: 'test-key', from: 'from@example.com', to: 'to@example.com', fetchImpl: async () => response(false, 401) });
  await assert.rejects(rejected.send(enquiry, 'request-401'));
  const missing = createResendProvider({ apiKey: '', from: 'from@example.com', to: 'to@example.com', fetchImpl: async () => response(true) });
  await assert.rejects(missing.send(enquiry, 'request-missing'));
  const timeout = createResendProvider({ apiKey: 'test-key', from: 'from@example.com', to: 'to@example.com', fetchImpl: async () => { throw new Error('timeout'); } });
  await assert.rejects(timeout.send(enquiry, 'request-timeout'));
});

test('validation rejects invalid email, missing name, empty or oversized message, honeypot, and header injection', () => {
  assert.ok(validateContact({ ...enquiry, email: 'bad\r\nBcc:evil@example.com' }).error);
  assert.ok(validateContact({ ...enquiry, name: '' }).error);
  assert.ok(validateContact({ ...enquiry, message: '' }).error);
  assert.ok(validateContact({ ...enquiry, message: 'x'.repeat(2001) }).error);
  assert.ok(validateContact({ ...enquiry, website: 'bot' }).error);
});

test('production disables local file fallback', () => {
  assert.equal(isFileFallbackEnabled({ NODE_ENV: 'development', CONTACT_FILE_FALLBACK: 'true' }), true);
  assert.equal(isFileFallbackEnabled({ NODE_ENV: 'production', CONTACT_FILE_FALLBACK: 'false' }), false);
});

test('email content includes text and escaped HTML', () => {
  const content = buildEmailContent(enquiry, 'request-content', '2026-01-01T00:00:00.000Z');
  assert.match(content.text, /Message:/);
  assert.match(content.html, /Example &amp; Co/);
  assert.doesNotMatch(content.html, /<script>/);
});