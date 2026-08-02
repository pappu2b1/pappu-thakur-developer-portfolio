const emailPattern = /^[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]+$/;

export const clean = (value, max) => String(value ?? '')
  .replace(/[\u0000-\u001F\u007F]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, max);

export function validateContact(body = {}) {
  const rawName = String(body.name ?? '').trim();
  const rawCompany = String(body.company ?? '').trim();
  const rawOpportunityType = String(body.opportunityType ?? '').trim();
  const rawBudget = String(body.budget ?? '').trim();
  const rawMessage = String(body.message ?? '').trim();
  if (rawName.length > 120) return { error: 'Please provide a valid name.' };
  if (rawCompany.length > 200) return { error: 'Please provide a valid company name.' };
  if (rawOpportunityType.length > 100) return { error: 'Please select a valid opportunity type.' };
  if (rawBudget.length > 100) return { error: 'Please select a valid budget range.' };
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
