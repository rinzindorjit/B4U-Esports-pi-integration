'use client'
import { useState } from 'react'
import Image from 'next/image'

interface ConsentModalProps {
  isOpen: boolean
  onConsent: () => void
  onDecline: () => void
}

export default function ConsentModal({ isOpen, onConsent, onDecline }: ConsentModalProps) {
  const [hasReadTerms, setHasReadTerms] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg max-w-sm sm:max-w-md w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-4">
            <Image
              src="https://b4uesports.com/wp-content/uploads/2025/04/PI.jpg"
              alt="Pi Network"
              width={32}
              height={32}
              className="rounded-full sm:w-10 sm:h-10"
            />
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Pi Network Data Sharing</h2>
              <p className="text-xs sm:text-sm text-gray-600">Required for B4U Esports account</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">What we collect:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Pi Network username</li>
                <li>• Pi Network wallet address</li>
                <li>• Payment authorization for transactions</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">How we use it:</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Create and manage your B4U Esports account</li>
                <li>• Process in-game currency purchases</li>
                <li>• Provide transaction history and support</li>
              </ul>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Important Notice:</h3>
              <p className="text-sm text-orange-800">
                This service operates on Pi Testnet. No real Pi coins from your mainnet wallet will be used for purchases.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={hasReadTerms}
                  onChange={(e) => setHasReadTerms(e.target.checked)}
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I have read and agree to the{' '}
                  <a href="/terms" target="_blank" className="text-blue-600 hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="/privacy" target="_blank" className="text-blue-600 hover:underline">Privacy Policy</a>.
                  I consent to sharing my Pi Network data with B4U Esports for account creation and transaction processing.
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              onClick={onDecline}
              className="flex-1 px-4 py-3 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors touch-manipulation"
            >
              Decline
            </button>
            <button
              onClick={onConsent}
              disabled={!hasReadTerms}
              className={`flex-1 px-4 py-3 sm:py-2 rounded-lg transition-colors touch-manipulation ${
                hasReadTerms
                  ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Accept & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}