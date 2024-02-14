import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { gpaKeywords } from '../utils/keywords'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | weGPA',
    default: 'weGPA',
  },
  description: 'weGPA is a dynamic GPA and CGPA calculator designed specifically for college students. It allows for seamless user experience and a feature to export GPA and CGPA result to PDF.',
  icons: {
    icon: '/icon.png',
    other: {
      rel: 'icon',
      url: '/icon.png',
    },
  },
  generator: 'Next.js',
  applicationName: 'weGPA',
  referrer: 'origin-when-cross-origin',
  keywords: gpaKeywords,
  authors: [{ name: 'Alphadevking', url: 'https://github.com/alphadevking' }],
  creator: 'Favour Orukpe',
  publisher: 'Favour Orukpe',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          {
            children
          }
        </body>
      </html>
    </Providers>
  )
}
