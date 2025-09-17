'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function OurHistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Link href="/" className="inline-block mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </div>
            </Link>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Our History
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The Journey of B4U Esports
            </p>
          </div>

          {/* Logo and Main Content */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20 mb-12">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-50"></div>
                <Image
                  src="https://b4uesports.com/wp-content/uploads/2025/04/cropped-Black_and_Blue_Simple_Creative_Illustrative_Dragons_E-Sport_Logo_20240720_103229_0000-removebg-preview.png"
                  alt="B4U Esports Logo"
                  width={120}
                  height={120}
                  className="relative rounded-xl"
                />
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-4">The Beginning (2024)</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Established in 2024, B4U Esports began as a small team of passionate gamers who recognized 
                the need for a more accessible and secure way to purchase in-game currencies. Our journey 
                started with PUBG Mobile and quickly expanded to include other popular titles.
              </p>

              <div className="bg-black/30 rounded-xl p-6 border border-white/10 mb-8">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <span className="mr-2">🎯</span> Our Founding Vision
                </h3>
                <p className="text-gray-300 mb-4">
                  We envisioned a platform where gamers could easily and securely purchase in-game currencies 
                  without the hassle of traditional payment methods. Our goal was to create a seamless 
                  experience that bridges the gap between gaming and modern payment technologies.
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">→</span>
                    <span>Make gaming currencies more accessible to players worldwide</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">→</span>
                    <span>Provide secure and transparent transactions using blockchain technology</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">→</span>
                    <span>Offer competitive pricing and instant delivery of gaming currency</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">→</span>
                    <span>Build a trusted community of gamers who value quality and service</span>
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">Pi Network Integration (2025)</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                In 2025, we integrated Pi Network's revolutionary payment system, becoming one of the first 
                gaming platforms to accept Pi cryptocurrency. This integration has allowed us to serve a 
                global community of gamers while providing secure, low-cost transactions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-500/30">
                  <h3 className="text-xl font-semibold text-white mb-3">Benefits of Pi Integration</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Lower transaction fees compared to traditional payment methods</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Enhanced security through blockchain technology</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Global accessibility for Pi Network users</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Transparent and immutable transaction records</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30">
                  <h3 className="text-xl font-semibold text-white mb-3">Milestones Achieved</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">★</span>
                      <span>10,000+ successful transactions within the first month</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">★</span>
                      <span>Support for 5+ popular mobile games</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">★</span>
                      <span>Integration with major gaming platforms</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">★</span>
                      <span>Community of 50,000+ active users</span>
                    </li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">Current Status and Future Plans</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Today, we continue to innovate and expand our services, with plans to support more games, 
                tournaments, and gaming services. Our mission remains the same: to empower gamers with the 
                tools and currencies they need to succeed in their favorite games.
              </p>

              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold text-white mb-3">Upcoming Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-black/30 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">🎮 Tournament Support</h4>
                    <p className="text-gray-300 text-sm">
                      Integration with popular gaming tournaments and esports events
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">📱 Mobile App</h4>
                    <p className="text-gray-300 text-sm">
                      Dedicated mobile application for iOS and Android platforms
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">🔄 Exchange Services</h4>
                    <p className="text-gray-300 text-sm">
                      Cross-game currency exchange and trading platform
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center py-8">
                <h3 className="text-2xl font-bold text-white mb-4">Join Us on This Journey</h3>
                <p className="text-gray-300 mb-6">
                  Be part of our growing community and help shape the future of gaming currency transactions. 
                  Together, we're building the next generation of gaming marketplaces.
                </p>
                <Link 
                  href="/"
                  className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Start Your Gaming Journey Today
                </Link>
              </div>
            </div>
          </div>

          {/* Important Links */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Important Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                href="/dashboard"
                className="block bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 p-4 rounded-xl border border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <span className="text-white font-semibold">Dashboard</span>
                </div>
              </Link>
              
              <Link 
                href="/Privacy-Policy"
                className="block bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 p-4 rounded-xl border border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span className="text-white font-semibold">Privacy Policy</span>
                </div>
              </Link>
              
              <Link 
                href="/Terms-of-Service"
                className="block bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 p-4 rounded-xl border border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-white font-semibold">Terms of Service</span>
                </div>
              </Link>
              
              <Link 
                href="/Refund-Policy"
                className="block bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 p-4 rounded-xl border border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-white font-semibold">Refund Policy</span>
                </div>
              </Link>
              
              <Link 
                href="/Data-Protection"
                className="block bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 p-4 rounded-xl border border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-white font-semibold">Data Protection</span>
                </div>
              </Link>
              
              <Link 
                href="/User-Agreement"
                className="block bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 p-4 rounded-xl border border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-white font-semibold">User Agreement</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Link 
              href="/"
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}