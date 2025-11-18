import createMiddleware from 'next-intl/middleware';

export const routing = {
  locales: ['en', 'zh', 'ja', 'ko', 'es'],
  defaultLocale: 'en'
};

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*).*)'
  ]
};
