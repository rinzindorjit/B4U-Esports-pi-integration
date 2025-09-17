'use client'
import Image from 'next/image'
import PiLoginButton from '../../components/PiLoginButton'
import PiPriceTicker from '../../components/PiPriceTicker'
import { useState } from 'react'

export default function TestWelcomeScreen() {
  const [logoError, setLogoError] = useState(false)
  const [logoLoading, setLogoLoading] = useState(true)
  
  // Updated logo URL with transparent background
  const b4uLogoUrl = "https://emofly.b-cdn.net/hbd_exvhac6ayb3ZKT/width:640/plain/https://storage.googleapis.com/takeapp/media/clz8o83hw00020cla0wkze36l.png"
  
  // Handle logo loading error
  const handleLogoError = () => {
    console.log('Failed to load B4U Esports logo, using fallback')
    setLogoError(true)
    setLogoLoading(false)
  }

  // Handle logo loading success
  const handleLogoLoad = () => {
    setLogoLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Simple header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Gaming Hub
              </h1>
              <p className="text-gray-300 text-xs sm:text-sm">Powered by Pi Network</p>
            </div>
          </div>
          
          <div className="hidden sm:block">
            <PiPriceTicker showDetails={true} className="text-white" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 sm:py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 sm:mb-8 md:mb-12">
            <div className="relative inline-block mb-4 sm:mb-6">
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/30">
                {/* B4U Esports Logo with fallback */}
                {logoLoading && (
                  <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                
                {!logoError && !logoLoading ? (
                  // Using img tag for the new logo URL with transparent background
                  <img
                    src={b4uLogoUrl}
                    alt="B4U Esports Logo"
                    width="120"
                    height="120"
                    className="mx-auto rounded-xl w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32"
                    onError={handleLogoError}
                    onLoad={handleLogoLoad}
                  />
                ) : null}
                
                {logoError && (
                  <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                    <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">B4U</span>
                  </div>
                )}
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 md:mb-6">
              <span className="text-white">
                Welcome to
              </span>
              <br />
              <span className="text-white">
                B4U Esports
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-3 leading-relaxed">
              Your Ultimate Gaming Currency Marketplace
            </p>
          </div>

          {/* Simple Login Button */}
          <div className="mt-8">
            <PiLoginButton />
          </div>
        </div>
      </main>
    </div>
  )
}