/**
 * Portfolio global configuration & feature flags
 */
export const RESUME_CONFIG = {
  // Flag to control whether the resume can be downloaded when unlocked
  // Set to 'true' in .env (VITE_ALLOW_RESUME_DOWNLOAD=true) to enable download buttons
  allowDownload: import.meta.env.VITE_ALLOW_RESUME_DOWNLOAD === 'true',

  // Default approval passcode if not set in .env
  defaultAccessCode: import.meta.env.VITE_RESUME_ACCESS_CODE || 'SAKTHI2026',

  // WhatsApp contact details
  whatsappNumber: '916380350108',

  // Contact email
  contactEmail: 'sakthivel24498@gmail.com',
};
