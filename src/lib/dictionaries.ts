// src/lib/dictionaries.ts
import { Locale } from './i18n';

export const getDictionary = async (locale: Locale) => {
  const dict = await import(`../../../public/locales/${locale}/common.json`);
  return dict.default;
};
