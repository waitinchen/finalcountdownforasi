import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is default in Next.js 15, no need for experimental.appDir
}

export default withNextIntl(nextConfig);