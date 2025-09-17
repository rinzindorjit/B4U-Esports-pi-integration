'use client'
import { useState, useEffect } from 'react'
import WelcomeScreen from '../components/WelcomeScreen'

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Simple test - always show welcome screen for now
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    )
  }

  return <WelcomeScreen />
}