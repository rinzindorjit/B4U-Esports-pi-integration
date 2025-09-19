import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "B4U Esports",
  description: "Your Ultimate Gaming Marketplace",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        <script src="https://sdk.minepi.com/pi-sdk.js" async></script>
      </head>
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <div
          id="overlay"
          className="fixed inset-0 bg-black bg-opacity-50 z-[998] opacity-0 invisible transition-all duration-300 [&.active]:opacity-100 [&.active]:visible"
        ></div>

        <div className="snowfall-container fixed inset-0 pointer-events-none z-[1] overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="snowflake absolute text-white opacity-60 animate-snowfall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                fontSize: `${0.3 + Math.random() * 0.2}rem`, // Much smaller snowflakes
              }}
            >
              ❄
            </div>
          ))}
        </div>

        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
