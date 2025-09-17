'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useAuth } from '../hooks/useAuth'
import ConsentModal from './ConsentModal'

export default function PiLoginButton() {
  const { login, isLoading, isAuthenticated } = useAuth()
  const [showConsentModal, setShowConsentModal] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleLoginClick = () => {
    setShowConsentModal(true)
  }

  const handleConsent = async () => {
    setShowConsentModal(false)
    setIsLoggingIn(true)
    
    try {
      await login()
      console.log('Login successful!')
    } catch (error) {
      console.error('Login failed:', error)
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      
      if (errorMessage.includes('Failed to authenticate with server') || errorMessage.includes('500')) {
        alert('Login temporarily unavailable. Please try again in a few moments.')
      } else if (errorMessage.includes('Network') || errorMessage.includes('network') || errorMessage.includes('connection')) {
        alert('Network connection issue. Please check your internet connection and try again.')
      } else if (errorMessage.includes('cancelled')) {
        // Don't show alert for cancelled authentication, user intentionally cancelled
        console.log('User cancelled authentication')
      } else {
        alert(`Login failed: ${errorMessage}. Please try again.`)
      }
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleDecline = () => {
    setShowConsentModal(false)
  }

  if (isAuthenticated) {
    return null // Don't show login button if already authenticated
  }

  return (
    <>
      <button
        onClick={handleLoginClick}
        disabled={isLoading || isLoggingIn}
        className={`
          group relative
          bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600
          text-white font-bold px-6 py-3 rounded-lg overflow-hidden
          flex items-center justify-center space-x-3 transition-all duration-300
          shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1
          min-w-[220px] max-w-[300px] mx-auto
          ${(isLoading || isLoggingIn) ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
        `}
      >
        {/* Animated background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/50 via-orange-400/50 to-red-400/50 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 animate-pulse"></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
        
        {/* Pi Network Icon */}
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
          <span className="text-lg font-bold text-orange-600">π</span>
        </div>
        
        {/* Button Text */}
        <span className="text-base font-bold group-hover:text-yellow-100 transition-colors duration-300 relative z-10">
          {isLoggingIn ? 'Connecting...' : 'Connect Pi Wallet'}
        </span>
        
        {/* Loading Spinner */}
        {isLoggingIn && (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10"></div>
        )}
        
        {/* Pulsing border effect */}
        <div className="absolute inset-0 rounded-lg border-2 border-yellow-300 group-hover:border-yellow-200 transition-colors duration-300 animate-pulse"></div>
      </button>

      <ConsentModal
        isOpen={showConsentModal}
        onConsent={handleConsent}
        onDecline={handleDecline}
      />
    </>
  )
}