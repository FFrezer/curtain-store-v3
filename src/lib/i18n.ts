// src/lib/i18n.ts
export const locales = ['en', 'am', 'om', 'ti', 'tr', 'zh'] as const;
export const defaultLocale = 'en';

export type Locale = typeof locales[number];
