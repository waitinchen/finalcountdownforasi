import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

export const routing = {
  locales: ['en', 'zh', 'ja', 'ko', 'es'],
  defaultLocale: 'en',
  localePrefix: 'always' as const // 确保所有路径都包含语言前缀，包括默认语言
};

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // 处理根路径重定向
  if (request.nextUrl.pathname === '/') {
    const locale = request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] || 'en';
    const validLocale = routing.locales.includes(locale) ? locale : routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${validLocale}`, request.url));
  }

  // 使用 next-intl 的 middleware 处理其他路径
  return intlMiddleware(request);
}

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
