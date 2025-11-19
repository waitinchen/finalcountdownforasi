'use client';

import {useRouter, usePathname} from 'next/navigation';
import {useLocale} from 'next-intl';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '繁體' },
  { code: 'zhs', label: '简体' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'es', label: 'ES' }
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchTo = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div className="fixed top-2 right-2 md:top-4 md:right-4 z-30 flex gap-1.5 md:gap-3 text-xs md:text-sm">
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => switchTo(lang.code)}
          className={`px-2 py-1 md:px-3 md:py-1 rounded-lg border transition-all duration-300 ${
            locale === lang.code
              ? 'bg-cyan-300/20 border-cyan-300/50 text-cyan-300/90'
              : 'bg-white/5 border-cyan-300/20 text-cyan-300/60 hover:bg-cyan-300/10 hover:border-cyan-300/40'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}

