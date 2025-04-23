import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: 'Brian | Full-Stack Developer',
    template: '%s | Alex'
  },
  description: 'Creative developer specializing in modern web applications',
  keywords: ['portfolio', 'developer', 'react', 'nextjs'],
  openGraph: {
    title: 'Brian | Full-Stack Developer',
    description: 'Creative developer specializing in modern web applications',
    url: 'https://yourdomain.com',
    siteName: 'Alex Portfolio',
    images: [
      {
        url: 'https://yourdomain.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex | Full-Stack Developer',
    description: 'Creative developer specializing in modern web applications',
    creator: '@yourhandle',
    images: ['https://yourdomain.com/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className={`
        bg-black text-white 
        font-sans antialiased 
        selection:bg-red-500 selection:text-white
      `}>
        {/* Smooth scrolling container */}
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}