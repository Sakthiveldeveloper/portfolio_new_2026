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

export type BackgroundTheme = 'aurora' | 'cyber_grid' | 'stars';

// 🌟 DEFAULT THEME FOR THE WHOLE WEBSITE:
// Change this value to switch your default background directly in code (deploys to Netlify immediately!):
// Options: 'cyber_grid' | 'aurora' | 'stars'
export const DEFAULT_BACKGROUND_THEME: BackgroundTheme = 'cyber_grid';

export const getInitialBackgroundTheme = (): BackgroundTheme => {
  if (typeof window !== 'undefined') {
    // 1. URL Parameter check: e.g. https://your-site.com/?bg=stars or ?bg=cyber_grid
    const params = new URLSearchParams(window.location.search);
    const bgParam = params.get('bg')?.toLowerCase();
    if (bgParam === 'stars') return 'stars';
    if (bgParam === 'cyber_grid' || bgParam === 'grid' || bgParam === 'cyber') return 'cyber_grid';
    if (bgParam === 'aurora') return 'aurora';

    // 2. Saved local storage check (from the on-page switcher)
    const stored = localStorage.getItem('portfolio_bg_theme')?.toLowerCase();
    if (stored === 'stars') return 'stars';
    if (stored === 'cyber_grid') return 'cyber_grid';
    if (stored === 'aurora') return 'aurora';
  }

  // 3. Env variable override
  const envTheme = import.meta.env.VITE_BACKGROUND_THEME?.toLowerCase();
  if (envTheme === 'stars') return 'stars';
  if (envTheme === 'cyber_grid' || envTheme === 'grid' || envTheme === 'cyber') return 'cyber_grid';
  if (envTheme === 'aurora') return 'aurora';

  // 4. Default in code
  return DEFAULT_BACKGROUND_THEME;
};


