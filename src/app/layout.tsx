import type { Metadata } from 'next'
// Import Inter font with local fallback
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../hooks/useAuth'

// Use local fallback for Inter font
const inter = Inter({ 
  subsets: ['latin'],
  fallback: ['system-ui', 'arial', 'sans-serif']
})

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