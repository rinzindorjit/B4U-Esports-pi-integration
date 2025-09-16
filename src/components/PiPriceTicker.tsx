'use client'
import { usePiPrice } from '../hooks/usePiPrice'
import Image from 'next/image'

interface PiPriceTickerProps {
  className?: string
  showDetails?: boolean
}

export default function PiPriceTicker({ className = '', showDetails = false }: PiPriceTickerProps) {
  const { price, isLoading, error, lastUpdated, source, refreshPrice } = usePiPrice(60000) // Refresh every 60 seconds

  const formatPrice = (price: number | null): string => {
    if (price === null) return '...'
    return `$${price.toFixed(4)}`
  }

  const formatTime = (timestamp: string | null): string => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    return date.toLocaleTimeString()
  }

  if (error && !price) {
    return (
      <div className={`flex items-center space-x-2 text-red-500 ${className}`}>
        <span className="text-sm">Price unavailable</span>
        <button
          onClick={refreshPrice}
          className="text-xs underline hover:no-underline"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-1 sm:space-x-2 ${className}`}>
      <Image
        src="https://b4uesports.com/wp-content/uploads/2025/04/PI.jpg"
        alt="Pi Network"
        width={16}
        height={16}
        className="rounded-full sm:w-5 sm:h-5"
      />
      <div className="flex items-center space-x-1">
        <span className="font-semibold text-yellow-500 text-sm sm:text-base">Pi:</span>
        <span className={`font-mono text-sm sm:text-base ${isLoading ? 'animate-pulse' : ''}`}>
          {formatPrice(price)}
        </span>
        {isLoading && (
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-500 rounded-full animate-ping"></div>
        )}
      </div>
      
      {showDetails && lastUpdated && (
        <div className="text-xs text-gray-500 hidden sm:block">
          <span>Updated: {formatTime(lastUpdated)}</span>
          {source && source !== 'coingecko' && (
            <span className="ml-1 text-orange-500">({source})</span>
          )}
        </div>
      )}
      
      {!isLoading && (
        <button
          onClick={refreshPrice}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors p-1 touch-manipulation"
          title="Refresh price"
        >
          ↻
        </button>
      )}
    </div>
  )
}