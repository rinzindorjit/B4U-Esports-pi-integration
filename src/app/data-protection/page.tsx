'use client'
import Link from 'next/link'

export default function DataProtectionPage() {
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
                Data Protection
              </span>
            </h1>
          </div>

          {/* Content */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20 mb-12">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-6">
                B4U Esports is committed to protecting your personal data and respecting your privacy rights.
              </p>
              
              <h2 className="text-2xl font-bold text-white mb-4">1. Data Protection Commitment</h2>
              <p className="text-gray-300 mb-6">
                We implement appropriate technical and organizational security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">2. Legal Basis for Processing</h2>
              <p className="text-gray-300 mb-6">
                We process your personal data based on:
              </p>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li><strong>Consent:</strong> When you explicitly agree to data processing</li>
                <li><strong>Contract Performance:</strong> To fulfill purchase agreements</li>
                <li><strong>Legitimate Interest:</strong> For fraud prevention and service improvement</li>
                <li><strong>Legal Obligation:</strong> To comply with applicable laws</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-4">3. Data Categories and Purposes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Identity Data</h3>
                  <p className="text-gray-300 text-sm">Pi username, email, contact info</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Financial Data</h3>
                  <p className="text-gray-300 text-sm">Pi wallet address, transaction history</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Gaming Data</h3>
                  <p className="text-gray-300 text-sm">PUBG UID, MLBB User ID/Zone ID</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Technical Data</h3>
                  <p className="text-gray-300 text-sm">IP address, browser type, usage patterns</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">4. Data Retention</h2>
              <p className="text-gray-300 mb-6">
                We retain your personal data only as long as necessary for the purposes outlined in this policy:
              </p>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li><strong>Account Data:</strong> Until account deletion or 3 years of inactivity</li>
                <li><strong>Transaction Records:</strong> 7 years for legal and audit purposes</li>
                <li><strong>Support Communications:</strong> 2 years after issue resolution</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-4">5. Your Data Protection Rights</h2>
              <p className="text-gray-300 mb-6">
                Under applicable data protection laws, you have the right to access, rectify, erase, and port your personal data.
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
