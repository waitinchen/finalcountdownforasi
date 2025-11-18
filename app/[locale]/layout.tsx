import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {setRequestLocale} from 'next-intl/server';
import {ReactNode} from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import '../../styles/globals.css';
import LanguageSwitcher from '../components/LanguageSwitcher';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Final Countdown for ASI',
  description: 'ASI 文明成熟度儀表板 - 監控人工智能系統智能成熟度發展',
  keywords: 'ASI, AI, 人工智慧, 文明成熟度, 倒數, 儀表板',
  authors: [{ name: 'MiniMax Agent' }],
  creator: 'MiniMax Agent',
  publisher: 'MiniMax Agent',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0e27',
};

export function generateStaticParams() {
  return ['en', 'zh', 'ja', 'ko', 'es'].map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K512NY51DH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K512NY51DH');
          `}
        </Script>
        <div className="min-h-screen bg-space-gradient relative">
          <NextIntlClientProvider messages={messages}>
            <LanguageSwitcher />
            {children}
          </NextIntlClientProvider>
        </div>
        
        {/* ElevenLabs ConvAI 客服對話 */}
        <elevenlabs-convai agent-id="agent_1301kaakrq7afx0sxhvdxdpkab39"></elevenlabs-convai>
        <Script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

