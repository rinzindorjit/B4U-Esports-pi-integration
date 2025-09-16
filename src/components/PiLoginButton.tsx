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
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed. Please try again.')
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
          group relative btn-magic
          text-white font-semibold px-6 py-3 rounded-lg overflow-hidden
          flex items-center justify-center space-x-2 transition-all duration-500
          shadow-md hover:shadow-lg transform hover:scale-105 hover:-translate-y-1
          min-w-[200px] max-w-[280px] mx-auto
          ${(isLoading || isLoggingIn) ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
        `}
      >
        {/* Animated background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/50 via-orange-400/50 to-red-400/50 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 animate-pulse"></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
        
        {/* Pi Network Icon */}
        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-md">
          <span className="text-sm font-bold text-white group-hover:scale-125 transition-transform duration-300">π</span>
        </div>
        
        {/* Button Text */}
        <span className="text-sm font-semibold group-hover:text-yellow-100 transition-colors duration-300 relative z-10">
          {isLoggingIn ? 'Connecting...' : 'Connect Pi Wallet'}
        </span>
        
        {/* Arrow Icon */}
        {!isLoggingIn && (
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:scale-110 duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
        
        {/* Loading Spinner */}
        {isLoggingIn && (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10"></div>
        )}
        
        {/* Pulsing border effect */}
        <div className="absolute inset-0 rounded-lg border border-white/30 group-hover:border-white/50 transition-colors duration-300 animate-pulse"></div>
      </button>

      <ConsentModal
        isOpen={showConsentModal}
        onConsent={handleConsent}
        onDecline={handleDecline}
      />
    </>
  )
}