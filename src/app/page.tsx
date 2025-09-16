'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import PiLoginButton from '../components/PiLoginButton'
import PiPriceTicker from '../components/PiPriceTicker'
import PackagesGrid from '../components/PackagesGrid'
import PurchaseModal from '../components/PurchaseModal'
import WelcomeScreen from '../components/WelcomeScreen'
import { useAuth } from '../hooks/useAuth'
import Footer from '../components/Footer'
import { Package } from '../types'
// import { Package } from '@prisma/client'

type GameType = 'PUBG_MOBILE' | 'MLBB'

export default function Home() {
  const { isAuthenticated, user } = useAuth()
  const searchParams = useSearchParams()
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [selectedGameType, setSelectedGameType] = useState<'PUBG_MOBILE' | 'MLBB' | null>(null)

  // Handle URL parameters for direct navigation
  useEffect(() => {
    const gameParam = searchParams.get('game')
    if (gameParam === 'PUBG_MOBILE' || gameParam === 'MLBB') {
      setSelectedGameType(gameParam)
    }
  }, [searchParams])

  const handlePurchase = (packageData: Package) => {
    if (!isAuthenticated) {
      alert('Please sign in with Pi Network to make purchases')
      return
    }
    setSelectedPackage(packageData)
    setShowPurchaseModal(true)
  }

  const handlePurchaseComplete = () => {
    // Refresh page or update state as needed
    console.log('Purchase completed')
  }

  const handleGameSelection = (gameType: 'PUBG_MOBILE' | 'MLBB') => {
    setSelectedGameType(gameType)
  }
  // Show welcome screen for non-authenticated users
  if (!isAuthenticated) {
    return <WelcomeScreen />
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-green-500/10 rounded-full blur-2xl animate-bounce delay-700"></div>
      </div>
      {/* Header */}
      <header className="container mx-auto px-4 py-4 sm:py-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse"></div>
              <Image
                src="https://b4uesports.com/wp-content/uploads/2025/04/cropped-Black_and_Blue_Simple_Creative_Illustrative_Dragons_E-Sport_Logo_20240720_103229_0000-removebg-preview.png"
                alt="Gaming Hub Logo"
                width={50}
                height={50}
                className="relative rounded-xl sm:w-[60px] sm:h-[60px] hover:scale-110 transition-transform duration-300 cursor-pointer hover:rotate-6"
              />
            </div>
          </div>
          
          {/* User Menu for Authenticated Users */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:block">
              <PiPriceTicker showDetails={true} className="text-white" />
            </div>
            <div className="sm:hidden">
              <PiPriceTicker showDetails={false} className="text-white" />
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <span className="text-white text-xs sm:text-sm hidden sm:inline group relative">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-bold text-base hover:from-yellow-400 hover:via-orange-400 hover:to-red-400 transition-all duration-500 animate-pulse hover:scale-110">
                  🎉 Welcome, {user?.piUsername}! ✨
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 group-hover:w-full transition-all duration-500 animate-pulse"></span>
              </span>
              {/* Admin Panel Link */}
              {(user?.piWalletAddress === 'GBP7PG27L3U4IQWFQGXNCHCGPJH3GVV72EEO4Q7RHFASMVR4TIA6J5F2' || user?.email === 'admin@b4uesports.com') && (
                <Link
                  href="/admin"
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm touch-manipulation active:scale-95"
                >
                  Admin
                </Link>
              )}
              <Link
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-2 sm:px-4 rounded-lg transition-colors text-sm touch-manipulation active:scale-95"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-4 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-3 sm:p-4 rounded">
          <p className="text-xs sm:text-sm">
            <strong>Note:</strong> This platform uses Pi testnet for secure testing. 
            Your real Pi mainnet coins will not be deducted during testing - explore all features risk-free!
          </p>
        </div>
      </header>

      {/* Game Selection or Packages Section */}
      {!selectedGameType ? (
        // Game Selection Section
        <section className="container mx-auto px-4 py-8 sm:py-16 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-6 hover:scale-110 transition-transform duration-300">
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent hover:from-cyan-400 hover:via-emerald-400 hover:to-blue-400 transition-all duration-500 animate-pulse">
              🎮 Gaming Currency Marketplace 🚀
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4 hover:text-gray-100 transition-colors duration-300">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent hover:from-yellow-400 hover:to-pink-400 transition-all duration-500">
              Purchase PUBG Mobile UC and MLBB Diamonds using Pi Network. ⚡
              Fast, secure, and powered by Pi cryptocurrency! 💫
            </span>
          </p>
          
          {/* Game Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:-translate-y-3 group hover:border-orange-400/50">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-xl overflow-hidden shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <img
                  src="https://cdn.midasbuy.com/images/pubgm_app-icon_512x512%281%29.e9f7efc0.png"
                  alt="PUBG Mobile"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain bg-transparent p-2 group-hover:animate-pulse"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-orange-300 transition-colors duration-300">
                🔥 PUBG Mobile UC 🎯
              </h3>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed group-hover:text-orange-200 transition-colors duration-300">
                Get Unknown Cash (UC) for PUBG Mobile to unlock premium items, battle passes, weapon skins, and exclusive cosmetics. Enhance your gaming experience today! ✨
              </p>
              <button
                onClick={() => handleGameSelection('PUBG_MOBILE')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-lg transition-colors text-sm sm:text-base touch-manipulation active:scale-95 shadow-lg hover:shadow-xl group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-500 group-hover:scale-110 group-hover:animate-pulse"
              >
                🚀 Buy UC Now →
              </button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:-translate-y-3 group hover:border-purple-400/50">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-xl overflow-hidden shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Image
                  src="https://sm.ign.com/ign_za/cover/m/mobile-leg/mobile-legends-bang-bang_c6z8.jpg"
                  alt="Mobile Legends"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover group-hover:animate-pulse"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-purple-300 transition-colors duration-300">
                💎 MLBB Diamonds ✨
              </h3>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed group-hover:text-purple-200 transition-colors duration-300">
                Purchase Diamonds for Mobile Legends: Bang Bang to unlock heroes, premium skins, battle passes, and special items. Level up your gameplay! 🎆
              </p>
              <button
                onClick={() => handleGameSelection('MLBB')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-lg transition-colors text-sm sm:text-base touch-manipulation active:scale-95 shadow-lg hover:shadow-xl group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:scale-110 group-hover:animate-pulse"
              >
                🚀 Buy Diamonds →
              </button>
            </div>
          </div>
          

        </section>
      ) : (
        // Packages Section
        <section className="container mx-auto px-4 py-8 sm:py-16 relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <button
              onClick={() => setSelectedGameType(null)}
              className="text-blue-400 hover:text-blue-300 mb-4 text-sm sm:text-base flex items-center mx-auto touch-manipulation hover:scale-110 transition-all duration-300 group"
            >
              <span className="group-hover:animate-bounce">←</span> Back to Games
            </button>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 hover:scale-110 transition-transform duration-300">
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent hover:from-cyan-400 hover:via-emerald-400 hover:to-blue-400 transition-all duration-500">
                {selectedGameType === 'PUBG_MOBILE' ? '🔥 PUBG Mobile UC Packages 🎯' : '💎 MLBB Diamond Packages ✨'}
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base px-4 hover:text-gray-100 transition-colors duration-300">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent hover:from-yellow-400 hover:to-pink-400 transition-all duration-500">
                All packages show live Pi conversion rates. Prices update automatically every 60 seconds. ⚡
              </span>
            </p>
          </div>
          
          <PackagesGrid onPurchase={handlePurchase} gameFilter={selectedGameType} />
        </section>
      )}

      {/* Footer */}
      <Footer />

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={showPurchaseModal}
        package={selectedPackage}
        onClose={() => setShowPurchaseModal(false)}
        onPurchaseComplete={handlePurchaseComplete}
      />
    </main>
  )
}