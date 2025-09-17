'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import WelcomeScreen from '../components/WelcomeScreen'
import UserDashboard from '../components/UserDashboard'

export default function Home() {
  const { user, isLoading } = useAuth()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Show loading state while checking auth and client status
  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    )
  }

  // Show dashboard if user is authenticated, otherwise show welcome screen
  return user ? <UserDashboard /> : <WelcomeScreen />
}