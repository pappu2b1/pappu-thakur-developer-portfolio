const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export async function submitContact(payload, signal) {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal,
  });
  let data = null;
  try { data = await response.json(); } catch { /* safe fallback for non-JSON responses */ }
  if (!response.ok) {
    const error = new Error(data?.error || 'The enquiry could not be sent right now.');
    error.status = response.status;
    throw error;
  }
  if (!data?.ok) throw new Error('The enquiry could not be sent right now.');
  return data;
}
