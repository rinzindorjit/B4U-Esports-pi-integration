import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../hooks/useAuth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'B4U Esports - Pi Network Gaming Marketplace',
  description: 'Purchase in-game currencies for PUBG Mobile and Mobile Legends using Pi Network',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div id="modal-root"></div>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}