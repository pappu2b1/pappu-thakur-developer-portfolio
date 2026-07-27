export function isFileFallbackEnabled(env = process.env) {
  const explicit = String(env.CONTACT_FILE_FALLBACK ?? '').trim().toLowerCase();
  if (explicit) return ['1', 'true', 'yes'].includes(explicit);
  return String(env.NODE_ENV || 'development').toLowerCase() !== 'production';
}