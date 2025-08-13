import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Logistics Lynx - Autonomous TMS Platform',
  description: 'Next-generation Transportation Management System with AI-powered automation, real-time tracking, and comprehensive logistics solutions.',
  keywords: 'TMS, transportation management, logistics, AI, automation, freight, shipping, tracking',
  authors: [{ name: 'Logistics Lynx Team' }],
  openGraph: {
    title: 'Logistics Lynx - Autonomous TMS Platform',
    description: 'Next-generation Transportation Management System with AI-powered automation.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Logistics Lynx - Autonomous TMS Platform',
    description: 'Next-generation Transportation Management System with AI-powered automation.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
