'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutUsPage() {
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
                About B4U Esports
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your Ultimate Gaming Currency Marketplace
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
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                B4U Esports is a pioneering gaming marketplace that bridges the gap between traditional gaming 
                and blockchain technology. Founded with the vision of making gaming currencies more accessible, 
                we specialize in providing secure, instant, and affordable in-game currency purchases for 
                popular mobile games like PUBG Mobile and Mobile Legends: Bang Bang.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">What We Offer</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Our platform offers gamers a seamless experience to enhance their gameplay with top-ups, 
                tournament entries, and social media boosting services. We're committed to providing the best 
                value and service to our community of players worldwide.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-black/30 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                    <span className="mr-2">🎮</span> Gaming Currency
                  </h3>
                  <p className="text-gray-300">
                    Purchase PUBG Mobile UC and Mobile Legends Diamonds using Pi Network cryptocurrency for a 
                    secure and transparent transaction experience.
                  </p>
                </div>
                <div className="bg-black/30 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                    <span className="mr-2">🛡️</span> Security First
                  </h3>
                  <p className="text-gray-300">
                    All transactions are secured by blockchain technology, ensuring your payments and personal 
                    information are protected at all times.
                  </p>
                </div>
                <div className="bg-black/30 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                    <span className="mr-2">⚡</span> Instant Delivery
                  </h3>
                  <p className="text-gray-300">
                    Get your gaming currency delivered instantly after payment confirmation, so you can get 
                    back to gaming without delays.
                  </p>
                </div>
                <div className="bg-black/30 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                    <span className="mr-2">💰</span> Competitive Pricing
                  </h3>
                  <p className="text-gray-300">
                    We offer the best value for your Pi cryptocurrency, with competitive pricing and regular 
                    promotions for our community.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">Why Choose B4U Esports?</h2>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Powered by Pi Network blockchain for secure transactions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Real-time Pi to USD conversion with automatic price updates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Instant delivery of gaming currency after confirmation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>24/7 customer support and assistance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Regular promotions and special offers for our community</span>
                </li>
              </ul>

              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Join Our Community</h3>
                <p className="text-gray-300 mb-4">
                  Become part of our growing community of gamers who trust B4U Esports for their in-game currency needs. 
                  Connect with us on social media and stay updated with the latest news, tournaments, and special offers.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://facebook.com/b4uesports" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    Facebook
                  </a>
                  <a 
                    href="https://twitter.com/b4uesports" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    Twitter
                  </a>
                  <a 
                    href="https://instagram.com/b4uesports" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    Instagram
                  </a>
                  <a 
                    href="https://youtube.com/@b4uesports" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    YouTube
                  </a>
                </div>
              </div>
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