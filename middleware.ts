import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

export const routing = {
  locales: ['en', 'zh', 'zhs', 'ja', 'ko', 'es'],
  defaultLocale: 'ja', // 默认语言改为日文
  localePrefix: 'always' as const // 确保所有路径都包含语言前缀，包括默认语言
};

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // 处理根路径重定向到日文（默认语言）
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/ja', request.url));
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
    // - robots.txt, sitemap.xml 等
    '/((?!api|_next|_vercel|.*\\..*|favicon.ico|robots.txt|sitemap.xml).*)'
  ]
};
