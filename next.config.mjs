import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is default in Next.js 15, no need for experimental.appDir
  // 确保所有路由都能正确生成
  output: undefined, // 使用默认输出模式，确保 middleware 正常工作
}

export default withNextIntl(nextConfig);