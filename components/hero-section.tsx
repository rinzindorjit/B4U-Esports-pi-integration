"use client"

import { useState } from "react"
import { usePiNetwork } from "@/components/pi-network-provider"

export function HeroSection() {
  const { isInitialized, isAuthenticated, user, authenticate, getWalletAddress, openShareDialog } = usePiNetwork()
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const handleAuthenticate = async () => {
    setIsAuthenticating(true)
    try {
      await authenticate()
    } catch (error: any) {
      if (error.message.includes("User cancelled") || error.message.includes("user_cancelled")) {
        alert("You cancelled the authentication process. Please try again.")
      } else {
        alert("Authentication failed: " + error.message)
      }
    } finally {
      setIsAuthenticating(false)
    }
  }

  const handleShowWallet = async () => {
    try {
      const address = await getWalletAddress()
      alert(`Your Pi Wallet Address:\n${address}`)
    } catch (error: any) {
      alert("Failed to get wallet address: " + error.message)
    }
  }

  const handleShare = () => {
    const title = "B4U Esports"
    const message = "Check out B4U Esports - The ultimate gaming marketplace with Pi Network integration!"
    openShareDialog(title, message)
  }

  return (
    <section className="relative text-center py-20 px-4 max-w-[1200px] mx-auto overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating gaming elements */}
        <div className="absolute top-10 left-10 text-4xl text-yellow-400/30 animate-float">
          <i className="fas fa-gamepad"></i>
        </div>
        <div className="absolute top-20 right-20 text-3xl text-blue-400/30 animate-float-delayed">
          <i className="fas fa-trophy"></i>
        </div>
        <div className="absolute bottom-32 left-20 text-5xl text-purple-400/30 animate-float">
          <i className="fas fa-coins"></i>
        </div>
        <div className="absolute bottom-20 right-10 text-4xl text-green-400/30 animate-float-delayed">
          <i className="fas fa-medal"></i>
        </div>
        <div className="absolute top-1/2 left-5 text-3xl text-red-400/30 animate-float">
          <i className="fas fa-fire"></i>
        </div>
        <div className="absolute top-1/3 right-5 text-4xl text-cyan-400/30 animate-float-delayed">
          <i className="fas fa-bolt"></i>
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-16 left-1/4 w-20 h-20 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-24 right-1/4 w-16 h-16 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-full blur-2xl animate-pulse"></div>
      </div>

      <h1 className="relative z-10 text-4xl md:text-6xl font-bold mb-8 text-white">
        <i className="fas fa-hand-peace mr-3"></i>
        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          KUZUZANGPOLA!
        </span>
        <i className="fas fa-gamepad ml-3"></i>
      </h1>

      {/* Pi Network Auth Button */}
      {!isAuthenticated ? (
        <button
          onClick={handleAuthenticate}
          disabled={!isInitialized || isAuthenticating}
          className="mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAuthenticating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2 inline-block" />
              Signing In...
            </>
          ) : (
            <>
              <i className="fas fa-sign-in-alt mr-2"></i>
              Sign In with Pi Network
            </>
          )}
        </button>
      ) : (
        <div className="mb-6 space-y-4">
          <button
            disabled
            className="bg-green-600 text-white font-semibold px-8 py-4 text-lg cursor-default rounded-lg shadow-lg"
          >
            <i className="fas fa-check-circle mr-2"></i>
            Signed in as {user?.username}
          </button>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={handleShowWallet}
              className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black bg-transparent px-6 py-3 rounded-lg transition-all duration-300 font-semibold"
            >
              <i className="fas fa-wallet mr-2"></i>
              Wallet Address
            </button>
            <button
              onClick={handleShare}
              className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black bg-transparent px-6 py-3 rounded-lg transition-all duration-300 font-semibold"
            >
              <i className="fas fa-share-alt mr-2"></i>
              Share
            </button>
          </div>
        </div>
      )}

      <div className="bg-yellow-500/80 border border-yellow-400 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
        <p className="text-black flex items-center justify-center font-semibold">
          <i className="fas fa-exclamation-circle mr-2"></i>
          New users: Please complete your registration after signing in with Pi Network
        </p>
      </div>

      <p className="relative z-10 text-xl text-gray-200">Your Ultimate Gaming Marketplace</p>
    </section>
  )
}
