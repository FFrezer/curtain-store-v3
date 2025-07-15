'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'am', label: 'አማርኛ' },
  { code: 'zh', label: '中文' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'om', label: 'Afaan Oromoo' },
  { code: 'ti', label: 'ትግርኛ' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={pathname ?? "/"}
          locale={lang.code}
          className={`border px-3 py-1 rounded hover:bg-gray-100 ${
            locale === lang.code ? 'bg-gray-200 font-bold' : ''
          }`}
        >
          {lang.label}
        </Link>
      ))}
    </div>
  );
}
