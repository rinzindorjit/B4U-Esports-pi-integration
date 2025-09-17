'use client'
import { useState } from 'react'
import { Package, GameType } from '../types'
import { useAuth } from '../hooks/useAuth'
import { usePiPrice } from '../hooks/usePiPrice'
import { piNetworkService } from '../lib/pi-network'
import UserProfileForm from './UserProfileForm'
import Image from 'next/image'

interface PurchaseModalProps {
  isOpen: boolean
  package: Package | null
  onClose: () => void
  onPurchaseComplete: () => void
}

export default function PurchaseModal({ isOpen, package: pkg, onClose, onPurchaseComplete }: PurchaseModalProps) {
  const { user, isAuthenticated } = useAuth()
  const { convertUsdtToPi } = usePiPrice()
  const [showProfileForm, setShowProfileForm] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [gameUserId, setGameUserId] = useState('')
  const [gameZoneId, setGameZoneId] = useState('')

  if (!isOpen || !pkg) return null

  const piAmount = convertUsdtToPi(pkg.usdtPrice)

  // Check if user has required profile data for this game
  const hasRequiredProfile = () => {
    if (!user) return false
    
    if (pkg.game === 'PUBG_MOBILE') {
      return user.pubgProfile && user.pubgProfile.ign && user.pubgProfile.uid
    } else if (pkg.game === 'MLBB') {
      return user.mlbbProfile && user.mlbbProfile.userId_game && user.mlbbProfile.zoneId
    }
    
    return false
  }

  const isProfileComplete = user?.email && user?.country && hasRequiredProfile()

  const handleProfileComplete = () => {
    setShowProfileForm(false)
    // Profile form will trigger auth context update
  }

  const handlePurchase = async () => {
    if (!isAuthenticated || !user || !piAmount) return

    if (!isProfileComplete) {
      setShowProfileForm(true)
      return
    }

    setIsProcessing(true)
    try {
      // Create transaction record
      const response = await fetch('/api/transactions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: pkg.id,
          gameUserId: gameUserId || (pkg.game === 'PUBG_MOBILE' ? user.pubgProfile?.uid : user.mlbbProfile?.userId_game),
          gameZoneId: pkg.game === 'MLBB' ? (gameZoneId || user.mlbbProfile?.zoneId) : undefined
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create transaction')
      }

      const { transaction } = await response.json()

      // Prepare Pi payment data with enhanced metadata
      const paymentData = {
        amount: piAmount,
        memo: `${pkg.name} - ${getCurrency(pkg.game)} for ${getGameName(pkg.game)}`,
        metadata: {
          transactionId: transaction.id,
          userId: user.id,
          packageId: pkg.id,
          gameUserId: transaction.gameUserId,
          gameZoneId: transaction.gameZoneId,
          packageName: pkg.name,
          gameType: pkg.game,
          // Additional metadata for Pi Network processing
          timestamp: Date.now(),
          platform: 'B4U-Esports',
          // Pi Network required metadata for backend processing
          backendUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
          apiVersion: 'v1',
          environment: process.env.NEXT_PUBLIC_PI_ENVIRONMENT || 'development'
        }
      }

      // Initiate Pi payment
      try {
        console.log('Initiating Pi payment with data:', paymentData)
        const paymentId = await piNetworkService.createPayment(paymentData)
        console.log('Pi payment initiated:', paymentId)
        
        // Show success message
        alert(`Payment initiated successfully!

Transaction ID: ${transaction.id}
Pi Payment ID: ${paymentId}

Your ${pkg.amount.toLocaleString()} ${getCurrency(pkg.game)} will be delivered once the payment is completed.`)
        
      } catch (piError) {
        console.error('Pi Network payment failed:', piError)
        
        // Show detailed error message to user
        const errorMessage = piError instanceof Error ? piError.message : 'Unknown error occurred'
        
        // Fall back to mock payment for development
        if (process.env.NODE_ENV === 'development' || window.location.hostname.includes('localhost')) {
          console.warn('Using mock payment for development:', piError)
          const mockPaymentId = await piNetworkService.mockCreatePayment(paymentData)
          
          alert(`Mock payment initiated for development!

Transaction ID: ${transaction.id}
Mock Payment ID: ${mockPaymentId}

In production, this would process ${piAmount.toFixed(4)} Pi for ${pkg.amount.toLocaleString()} ${getCurrency(pkg.game)}.`)
        } else {
          // Show error to user in production
          alert(`Payment failed: ${errorMessage}

Please try again or contact support if the issue persists.`)
          
          // Also log the error to our backend for debugging
          try {
            await fetch('/api/logs', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: 'payment_error',
                error: errorMessage,
                paymentData: {
                  ...paymentData,
                  // Don't send sensitive data
                  metadata: {
                    transactionId: paymentData.metadata.transactionId,
                    userId: paymentData.metadata.userId,
                    packageId: paymentData.metadata.packageId
                  }
                }
              })
            })
          } catch (logError) {
            console.error('Failed to log payment error:', logError)
          }
          
          throw piError
        }
      }
      
      onPurchaseComplete()
      onClose()

    } catch (error) {
      console.error('Purchase failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert(`Purchase failed: ${errorMessage}

Please try again.`)
    } finally {
      setIsProcessing(false)
    }
  }

  const getGameLogo = (game: GameType) => {
    switch (game) {
      case 'PUBG_MOBILE':
        return 'https://cdn.midasbuy.com/images/pubgm_app-icon_512x512%281%29.e9f7efc0.png'
      case 'MLBB':
        return 'https://sm.ign.com/ign_za/cover/m/mobile-leg/mobile-legends-bang-bang_c6z8.jpg'
      default:
        return 'https://b4uesports.com/wp-content/uploads/2025/04/PI.jpg'
    }
  }

  const getGameName = (game: GameType) => {
    switch (game) {
      case 'PUBG_MOBILE':
        return 'PUBG Mobile'
      case 'MLBB':
        return 'Mobile Legends'
      default:
        return 'Unknown Game'
    }
  }

  const getCurrency = (game: GameType) => {
    switch (game) {
      case 'PUBG_MOBILE':
        return 'UC'
      case 'MLBB':
        return 'Diamonds'
      default:
        return 'Currency'
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto mx-auto">
          <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Purchase Confirmation</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl sm:text-3xl p-1 touch-manipulation">×</button>
            </div>

            {/* Package Info */}
            <div className="border rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3">
                {pkg.game === 'PUBG_MOBILE' ? (
                  <img
                    src={getGameLogo(pkg.game)}
                    alt={getGameName(pkg.game)}
                    width={32}
                    height={32}
                    className="sm:w-10 sm:h-10 rounded-lg flex-shrink-0 bg-transparent object-contain"
                  />
                ) : (
                  <Image
                    src={getGameLogo(pkg.game)}
                    alt={getGameName(pkg.game)}
                    width={32}
                    height={32}
                    className="sm:w-10 sm:h-10 rounded-lg flex-shrink-0"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm sm:text-base truncate">{pkg.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{getGameName(pkg.game)}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold">{pkg.amount.toLocaleString()} {getCurrency(pkg.game)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pi Amount:</span>
                  <span className="font-semibold text-yellow-600">
                    {piAmount ? `${piAmount.toFixed(4)} Pi` : 'Calculating...'}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Status */}
            {!isProfileComplete && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <h4 className="font-semibold text-orange-900 mb-2 text-sm sm:text-base">Profile Required</h4>
                <p className="text-xs sm:text-sm text-orange-800 mb-3">
                  Please complete your profile to make purchases. We need your game details to deliver the currency.
                </p>
                <button
                  onClick={() => setShowProfileForm(true)}
                  className="text-sm bg-orange-600 text-white px-3 py-1.5 rounded hover:bg-orange-700 touch-manipulation active:scale-95"
                >
                  Complete Profile
                </button>
              </div>
            )}

            {/* Game-specific fields for manual entry (if needed) */}
            {isProfileComplete && pkg.game === 'PUBG_MOBILE' && (
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <h4 className="font-medium text-sm sm:text-base">Delivery Details</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  UC will be delivered to: <strong>{user?.pubgProfile?.ign}</strong> (UID: {user?.pubgProfile?.uid})
                </p>
              </div>
            )}

            {isProfileComplete && pkg.game === 'MLBB' && (
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <h4 className="font-medium text-sm sm:text-base">Delivery Details</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Diamonds will be delivered to User ID: <strong>{user?.mlbbProfile?.userId_game}</strong> (Zone: {user?.mlbbProfile?.zoneId})
                </p>
              </div>
            )}

            {/* Testnet Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm text-blue-800">
                <strong>Testnet Mode:</strong> This is a demonstration using Pi Testnet. No real Pi coins will be charged from your mainnet wallet.
              </p>
            </div>

            {/* Actions */}
            <div className="flex space-x-2 sm:space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-3 py-2.5 sm:px-4 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm sm:text-base touch-manipulation active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                disabled={isProcessing || !piAmount}
                className={`flex-1 px-3 py-2.5 sm:px-4 sm:py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base touch-manipulation ${
                  isProcessing || !piAmount
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                }`}
              >
                {isProcessing ? 'Processing...' : isProfileComplete ? 'Pay with Pi' : 'Complete Profile First'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form Modal */}
      <UserProfileForm
        isOpen={showProfileForm}
        onClose={() => setShowProfileForm(false)}
        onComplete={handleProfileComplete}
      />
    </>
  )
}