'use client'
import Link from 'next/link'

export default function RefundPolicyPage() {
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
                Refund Policy
              </span>
            </h1>
          </div>

          {/* Content */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20 mb-12">
            <div className="prose prose-invert max-w-none">
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-6">
                <h3 className="text-xl font-bold text-red-300 mb-2">Important Notice</h3>
                <p className="text-red-200">
                  All sales of digital in-game currency are final and non-refundable.
                </p>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4">1. No Refund Policy</h2>
              <p className="text-gray-300 mb-6">
                B4U Esports operates a strict no-refund policy for all digital in-game currency purchases, including but not limited to:
              </p>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li>PUBG Mobile UC (Unknown Cash)</li>
                <li>Mobile Legends: Bang Bang Diamonds</li>
                <li>Any other in-game currencies or digital items</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-4">2. Reasons for No Refund Policy</h2>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li>Digital currencies are instantly delivered to your gaming account</li>
                <li>In-game currencies cannot be retrieved once delivered</li>
                <li>Digital products have no physical return mechanism</li>
                <li>Blockchain transactions are irreversible</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mb-4">3. Delivery Issues</h2>
              <p className="text-gray-300 mb-6">
                If you experience delivery issues, we will investigate and attempt to resolve them within 24-48 hours. 
                Resolution efforts do not constitute a refund guarantee. We will work to deliver the purchased currency, 
                not provide monetary refunds.
              </p>

              <h2 className="text-2xl font-bold text-white mb-4">4. Exceptional Circumstances</h2>
              <p className="text-gray-300 mb-6">
                Refunds may be considered only in exceptional circumstances such as proven system errors resulting in 
                duplicate charges or unauthorized transactions with proper evidence.
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