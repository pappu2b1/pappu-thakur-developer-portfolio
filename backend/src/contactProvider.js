const RESEND_ENDPOINT = 'https://api.resend.com/emails';

export const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

export function buildEmailContent(enquiry, requestId, submittedAt = new Date().toISOString()) {
  const fields = [
    ['Name', enquiry.name],
    ['Email', enquiry.email],
    ['Company', enquiry.company || 'Not provided'],
    ['Opportunity type', enquiry.opportunityType],
    ['Budget range', enquiry.budget || 'Not provided'],
    ['Submission time', submittedAt],
    ['Request ID', requestId],
  ];
  const text = [
    'New portfolio enquiry',
    ...fields.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    enquiry.message,
  ].join('\n');
  const rows = fields.map(([label, value]) => `<tr><th align="left">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`).join('');
  const html = `<p>New portfolio enquiry</p><table>${rows}</table><p><strong>Message</strong></p><p>${escapeHtml(enquiry.message).replace(/\n/g, '<br>')}</p>`;
  return { text, html, submittedAt };
}

export function createResendProvider({ apiKey, from, to, fetchImpl = globalThis.fetch } = {}) {
  return {
    async send(enquiry, requestId) {
      if (!apiKey) throw new Error('Resend API key is not configured');
      if (typeof fetchImpl !== 'function') throw new Error('Fetch is unavailable');
      const content = buildEmailContent(enquiry, requestId);
      const response = await fetchImpl(RESEND_ENDPOINT, {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: enquiry.email,
          subject: `Portfolio enquiry: ${enquiry.opportunityType} [${requestId}]`,
          text: content.text,
          html: content.html,
        }),
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) throw new Error(`Resend rejected the message with status ${response.status}`);
      return content;
    },
  };
}