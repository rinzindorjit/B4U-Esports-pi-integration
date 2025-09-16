'use client'
import Image from 'next/image'
import PiLoginButton from './PiLoginButton'
import PiPriceTicker from './PiPriceTicker'

export default function WelcomeScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating orbs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-2xl animate-ping"></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-gradient-to-r from-orange-500/25 to-red-500/25 rounded-full blur-2xl animate-bounce"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-particle-float delay-300"></div>
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-pink-400 rounded-full animate-particle-float delay-700"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-particle-float delay-500"></div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-particle-float delay-1000"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-20 left-1/3 w-8 h-8 border-2 border-blue-400/40 rotate-45 animate-float"></div>
        <div className="absolute bottom-40 right-1/4 w-6 h-6 border-2 border-purple-400/40 rotate-12 animate-glow"></div>
        
        {/* Moving gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse duration-[3s]"></div>
      </div>

      {/* Header with Pi Price */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-float">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-pink-400 hover:via-purple-400 hover:to-indigo-400 transition-all duration-300">
                Gaming Hub
              </h1>
              <p className="text-gray-300 text-sm hover:text-white transition-colors duration-300">Powered by Pi Network</p>
            </div>
          </div>
          
          <div className="hidden sm:block">
            <PiPriceTicker showDetails={true} className="text-white" />
          </div>
          <div className="sm:hidden">
            <PiPriceTicker showDetails={false} className="text-white" />
          </div>
        </div>
      </header>

      {/* Main Welcome Content */}
      <main className="relative z-10 container mx-auto px-4 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Brand Logo and Title */}
          <div className="mb-8 sm:mb-12">
            <div className="relative inline-block mb-6 group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105">
                <Image
                  src="https://b4uesports.com/wp-content/uploads/2025/04/cropped-Black_and_Blue_Simple_Creative_Illustrative_Dragons_E-Sport_Logo_20240720_103229_0000-removebg-preview.png"
                  alt="B4U Esports Logo"
                  width={120}
                  height={120}
                  className="mx-auto rounded-xl hover:rotate-6 transition-transform duration-300"
                />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 group">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent hover:from-yellow-400 hover:via-pink-400 hover:to-purple-400 transition-all duration-500 group-hover:scale-110 inline-block transform text-glow">
                Welcome to
              </span>
              <br />
              <span className="text-white hover:bg-gradient-to-r hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 hover:bg-clip-text hover:text-transparent transition-all duration-500 group-hover:scale-105 inline-block transform hover:text-neon">
                B4U Esports
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-4 leading-relaxed hover:text-white transition-colors duration-300 hover:scale-105 transform">
              Your Ultimate Gaming Currency Marketplace
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed hover:text-gray-200 transition-colors duration-300">
              Purchase PUBG Mobile UC and Mobile Legends Diamonds using Pi Network. 
              Fast, secure, and powered by cryptocurrency technology.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="group bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:bg-white/15 hover:border-white/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 glass-effect">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-2xl animate-float">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">Secure Payments</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors duration-300">Pi Network blockchain ensures safe and transparent transactions</p>
            </div>
            
            <div className="group bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:bg-white/15 hover:border-white/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 glass-effect">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-2xl animate-float delay-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors duration-300">Live Prices</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors duration-300">Real-time Pi to USD conversion with automatic price updates</p>
            </div>
            
            <div className="group bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:bg-white/15 hover:border-white/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 glass-effect">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-2xl animate-float delay-500">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">Instant Delivery</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors duration-300">Get your gaming currency delivered instantly after confirmation</p>
            </div>
          </div>

          {/* Gaming Platforms Preview */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 hover:bg-gradient-to-r hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 hover:bg-clip-text hover:text-transparent transition-all duration-500 transform hover:scale-105">Supported Games</h2>
            <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
              <div className="group bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:bg-white/15 hover:border-white/30 transition-all duration-300 transform hover:scale-110 hover:-translate-y-3 hover:rotate-1">
                <div className="w-16 h-16 mx-auto mb-3 rounded-xl overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  <img
                    src="https://cdn.midasbuy.com/images/apps/pubgm/1599546030876PIvqwGaa.png"
                    alt="PUBG Mobile"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain bg-transparent p-1 group-hover:rotate-6 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-white font-semibold group-hover:text-blue-300 transition-colors duration-300">PUBG Mobile</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors duration-300">UC Packages</p>
              </div>
              
              <div className="group bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:bg-white/15 hover:border-white/30 transition-all duration-300 transform hover:scale-110 hover:-translate-y-3 hover:-rotate-1">
                <div className="w-16 h-16 mx-auto mb-3 rounded-xl overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="https://sm.ign.com/ign_za/cover/m/mobile-leg/mobile-legends-bang-bang_c6z8.jpg"
                    alt="Mobile Legends"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover group-hover:-rotate-6 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-white font-semibold group-hover:text-purple-300 transition-colors duration-300">Mobile Legends</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors duration-300">Diamond Packages</p>
              </div>
            </div>
          </div>

          {/* Pi Network Login Section */}
          <div className="group bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-8 sm:p-12 border border-white/20 hover:border-white/40 max-w-2xl mx-auto transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <span className="text-2xl font-bold text-white group-hover:scale-125 transition-transform duration-300">π</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:via-orange-400 group-hover:to-red-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                Connect with Pi Network
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                Sign in with your Pi Network wallet to start purchasing gaming currency. 
                Your transactions are secured by blockchain technology.
              </p>
            </div>
            
            {/* Enhanced Pi Login Button */}
            <div className="space-y-3 text-center">
              <PiLoginButton />
              <p className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors duration-300">
                New to Pi Network? <a href="https://minepi.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-cyan-300 underline hover:no-underline transition-all duration-300 hover:scale-105 inline-block">Download the app</a> to get started
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-orange-500/10 border border-orange-500/30 hover:border-orange-400/50 rounded-xl p-4 max-w-2xl mx-auto transition-all duration-300 hover:bg-orange-500/20 group">
            <p className="text-orange-200 text-sm group-hover:text-orange-100 transition-colors duration-300">
              <strong className="group-hover:text-yellow-300 transition-colors duration-300">🧪 Testnet Mode:</strong> This platform uses Pi testnet for secure testing. 
              Your real Pi mainnet coins will not be deducted - explore all features risk-free!
            </p>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="relative z-10 bg-black/20 backdrop-blur-xl border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">
              © 2024 B4U Esports. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              Powered by Pi Network • Secure • Transparent • Decentralized
            </p>
          </div>
        </div>
      </footer>

      {/* Enhanced Floating Elements */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-bounce shadow-lg"></div>
      </div>
      <div className="absolute top-1/4 right-10 hidden lg:block">
        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping shadow-lg"></div>
      </div>
      <div className="absolute bottom-1/4 right-1/4 hidden lg:block">
        <div className="w-1 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse shadow-lg"></div>
      </div>
      <div className="absolute top-1/3 left-1/3 hidden lg:block">
        <div className="w-4 h-4 border-2 border-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-spin duration-[4s]"></div>
      </div>
    </div>
  )
}