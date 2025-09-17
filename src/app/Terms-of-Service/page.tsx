'use client'
import Link from 'next/link'

export default function TermsOfServicePage() {
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
                Terms of Service
              </span>
            </h1>
          </div>

          {/* Content */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20 mb-12">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-6">
                These Terms of Service govern your use of B4U Esports platform and services.
              </p>
              
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 mb-6">
                By accessing or using B4U Esports, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">2. Service Description</h2>
              <p className="text-gray-300 mb-6">
                B4U Esports provides a platform for purchasing in-game currencies using Pi Network cryptocurrency for games such as PUBG Mobile and Mobile Legends.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
              <p className="text-gray-300 mb-6">
                You must authenticate through Pi Network to access our services. You are responsible for maintaining the confidentiality of your account information.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">4. Purchases and Payments</h2>
              <p className="text-gray-300 mb-6">
                All payments are processed through Pi Network cryptocurrency. Prices are subject to real-time Pi/USD conversion rates.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">5. Prohibited Activities</h2>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li>Using the service for any illegal purpose</li>
                <li>Attempting to manipulate prices or exploit system vulnerabilities</li>
                <li>Interfering with or disrupting the service</li>
                <li>Using automated systems or bots to access the service</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-300 mb-6">
                B4U Esports shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">7. Changes to Terms</h2>
              <p className="text-gray-300 mb-6">
                We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
              </p>
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