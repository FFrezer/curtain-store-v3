'use client';

import { usePathname, useRouter } from 'next/navigation';

const supportedLocales = ['en', 'am', 'zh', 'tr', 'om', 'ti'];

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname(); // e.g. /en/shop/123

  function handleLocaleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value;
    const segments = pathname.split('/');
    segments[1] = newLocale; // replace the old locale
    router.push(segments.join('/'));
  }

  return (
    <select onChange={handleLocaleChange} defaultValue={pathname.split('/')[1]}>
      {supportedLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
