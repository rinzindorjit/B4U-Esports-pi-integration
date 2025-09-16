'use client'
import { usePiPrice } from '../hooks/usePiPrice'
import Image from 'next/image'

type GameType = 'PUBG_MOBILE' | 'MLBB'

interface Package {
  id: string
  name: string
  game: GameType
  description?: string
  amount: number
  usdtPrice: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

interface PackageCardProps {
  package: Package
  onPurchase: (packageData: Package) => void
  isAuthenticated: boolean
}

export default function PackageCard({ package: pkg, onPurchase, isAuthenticated }: PackageCardProps) {
  const { convertUsdtToPi, isLoading: priceLoading } = usePiPrice()

  const piAmount = convertUsdtToPi(pkg.usdtPrice)

  const getGameLogo = (game: string) => {
    switch (game) {
      case 'PUBG_MOBILE':
        return 'https://cdn.midasbuy.com/images/pubgm_app-icon_512x512%281%29.e9f7efc0.png'
      case 'MLBB':
        return 'https://b4uesports.com/wp-content/uploads/2025/04/1000077486.png'
      default:
        return 'https://b4uesports.com/wp-content/uploads/2025/04/PI.jpg'
    }
  }

  const getGameName = (game: string) => {
    switch (game) {
      case 'PUBG_MOBILE':
        return 'PUBG Mobile'
      case 'MLBB':
        return 'Mobile Legends'
      default:
        return 'Unknown Game'
    }
  }

  const getCurrency = (game: string) => {
    switch (game) {
      case 'PUBG_MOBILE':
        return 'UC'
      case 'MLBB':
        return 'Diamonds'
      default:
        return 'Currency'
    }
  }

  const handlePurchaseClick = () => {
    if (!isAuthenticated) {
      alert('Please sign in with Pi Network to make a purchase.')
      return
    }
    onPurchase(pkg)
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-gray-100">
        <div className="flex items-center space-x-2 sm:space-x-3">
          {pkg.game === 'PUBG_MOBILE' ? (
            <img
              src={getGameLogo(pkg.game)}
              alt={getGameName(pkg.game)}
              width={32}
              height={32}
              className="rounded-lg sm:w-10 sm:h-10 bg-transparent object-contain"
            />
          ) : (
            <Image
              src={getGameLogo(pkg.game)}
              alt={getGameName(pkg.game)}
              width={32}
              height={32}
              className="rounded-lg sm:w-10 sm:h-10"
            />
          )}
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{pkg.name}</h3>
            <p className="text-xs sm:text-sm text-gray-600 truncate">{getGameName(pkg.game)}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 space-y-3">
        {/* Amount */}
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-blue-600">
            {pkg.amount.toLocaleString()} {getCurrency(pkg.game)}
          </div>
          {pkg.description && (
            <p className="text-xs sm:text-sm text-gray-500 mt-1">{pkg.description}</p>
          )}
        </div>

        {/* Pricing */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Pi Amount:</span>
            <div className="flex items-center space-x-1">
              {priceLoading ? (
                <div className="w-12 sm:w-16 h-3 sm:h-4 bg-gray-200 animate-pulse rounded"></div>
              ) : piAmount ? (
                <span className="font-semibold text-yellow-600 text-xs sm:text-sm">
                  {piAmount.toFixed(4)} Pi
                </span>
              ) : (
                <span className="text-gray-400 text-xs">Price loading...</span>
              )}
              <Image
                src="https://b4uesports.com/wp-content/uploads/2025/04/PI.jpg"
                alt="Pi"
                width={14}
                height={14}
                className="rounded-full sm:w-4 sm:h-4"
              />
            </div>
          </div>
        </div>

        {/* Purchase Button */}
        <button
          onClick={handlePurchaseClick}
          disabled={!piAmount && !priceLoading}
          className={`w-full py-2.5 sm:py-2 px-4 rounded-lg font-semibold text-sm sm:text-base transition-all touch-manipulation ${
            !piAmount && !priceLoading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : pkg.game === 'PUBG_MOBILE'
              ? 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95 hover:shadow-md'
              : 'bg-purple-600 hover:bg-purple-700 text-white active:scale-95 hover:shadow-md'
          }`}
        >
          {!isAuthenticated 
            ? 'Sign In to Purchase' 
            : !piAmount && !priceLoading 
            ? 'Price Unavailable'
            : 'Buy Now'
          }
        </button>
      </div>

      {/* Testnet Notice */}
      <div className="px-3 sm:px-4 pb-3 sm:pb-4">
        <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded text-center">
          Testnet Mode - No real Pi coins will be charged
        </div>
      </div>
    </div>
  )
}