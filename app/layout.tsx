import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Final Countdown for ASI',
  description: 'ASI 文明成熟度儀表板 - 監控人工智能系統智能成熟度發展',
  keywords: 'ASI, AI, 人工智慧, 文明成熟度, 倒數, 儀表板',
  authors: [{ name: 'MiniMax Agent' }],
  creator: 'MiniMax Agent',
  publisher: 'MiniMax Agent',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0e27',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        <div className="min-h-screen bg-space-gradient relative">
          {children}
        </div>
      </body>
    </html>
  )
}