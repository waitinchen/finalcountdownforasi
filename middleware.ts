import createMiddleware from 'next-intl/middleware';

export const routing = {
  locales: ['en', 'zh', 'ja', 'ko', 'es'],
  defaultLocale: 'en',
  localePrefix: 'always' as const // 确保所有路径都包含语言前缀，包括默认语言
};

export default createMiddleware(routing);

export const config = {
  matcher: [
    // 匹配所有路径，除了：
    // - API 路由
    // - _next 内部文件
    // - 静态文件（.png, .jpg, etc.）
    // - favicon.ico
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
