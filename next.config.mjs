import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is default in Next.js 15, no need for experimental.appDir
  // 确保所有语言路径都能正确生成
  output: 'standalone', // 可选：用于生产环境优化
}

export default withNextIntl(nextConfig);