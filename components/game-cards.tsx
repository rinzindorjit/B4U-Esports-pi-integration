"use client"

import { useModalStore } from "@/lib/modal-store"

export function GameCards() {
  const { openTokenSelection, openPaymentModal } = useModalStore()

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Marketplace Card */}
        <div className="bg-[rgba(0,0,0,0.4)] backdrop-blur-sm border border-[rgba(255,255,255,0.2)] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:transform hover:scale-105 hover:shadow-3xl">
          <img
            src="https://b4uesports.com/wp-content/uploads/2025/04/ChatGPT-Image-Apr-22-2025-07_04_11-PM.png"
            alt="Marketplace"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center">
              <i className="fas fa-store mr-3 text-blue-400"></i>
              Marketplace
            </h2>
            <p className="text-gray-200 mb-4">Buy and sell gaming accounts and items</p>
            <button
              onClick={() => openPaymentModal("Marketplace Listing", 5, "marketplace")}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <i className="fas fa-shopping-cart mr-2"></i>
              List Your Item
            </button>
          </div>
        </div>

        {/* In-game Tokens Card */}
        <div className="bg-[rgba(0,0,0,0.4)] backdrop-blur-sm border border-[rgba(255,255,255,0.2)] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:transform hover:scale-105 hover:shadow-3xl">
          <img
            src="https://b4uesports.com/wp-content/uploads/2025/05/ucandmlbb-dias.png"
            alt="In-game Tokens"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center">
              <i className="fas fa-coins mr-3 text-yellow-400"></i>
              In-game Tokens
            </h2>
            <p className="text-gray-200 mb-4">Purchase various game currencies instantly</p>
            <button
              onClick={openTokenSelection}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <i className="fas fa-shopping-bag mr-2"></i>
              GET TOKENS
            </button>
          </div>
        </div>

        {/* Social Boosting Card */}
        <div className="bg-[rgba(0,0,0,0.4)] backdrop-blur-sm border border-[rgba(255,255,255,0.2)] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:transform hover:scale-105 hover:shadow-3xl">
          <img
            src="https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1266&q=80"
            alt="Social Media"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center">
              <i className="fas fa-rocket mr-3 text-green-400"></i>
              Social Boosting
            </h2>
            <p className="text-gray-200 mb-4">Boost your online presence</p>
            <button
              onClick={() => openPaymentModal("Social Boost", 15, "social")}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <i className="fas fa-chart-line mr-2"></i>
              BOOST NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
