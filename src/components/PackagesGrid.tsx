'use client'
import { useState, useEffect } from 'react'
import PackageCard from './PackageCard'
import { useAuth } from '../hooks/useAuth'

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

interface PackagesGridProps {
  gameType?: GameType
  gameFilter?: GameType
  onPurchase: (packageData: Package) => void
}

export default function PackagesGrid({ gameType, gameFilter, onPurchase }: PackagesGridProps) {
  const [packages, setPackages] = useState<Package[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    fetchPackages()
  }, [gameType, gameFilter])

  const fetchPackages = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const filterGame = gameFilter || gameType
      const url = filterGame 
        ? `/api/packages-static?game=${filterGame}`
        : '/api/packages-static'
      
      const response = await fetch(url)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        // Handle service unavailable error specifically
        if (response.status === 503) {
          throw new Error('Service temporarily unavailable. Please try again in a few minutes.')
        }
        throw new Error(errorData.error || `Failed to fetch packages: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch packages')
      }

      setPackages(result.data)

    } catch (err) {
      console.error('Error fetching packages:', err)
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred while loading packages'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-2">Error loading packages: {error}</div>
        <button
          onClick={fetchPackages}
          className="text-blue-600 hover:underline"
        >
          Try again
        </button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-4 sm:p-6 animate-pulse">
            <div className="h-10 sm:h-12 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 sm:h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 sm:h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 sm:h-10 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (packages.length === 0) {
    return (
      <div className="text-center py-8 px-4">
        <div className="text-gray-600 mb-4 text-base sm:text-lg">No packages available</div>
        {gameType && (
          <div className="text-sm text-gray-500 mt-1">
            Try switching to a different game
          </div>
        )}
      </div>
    )
  }

  // Group packages by game for display
  const groupedPackages = packages.reduce((acc, pkg) => {
    if (!acc[pkg.game]) {
      acc[pkg.game] = []
    }
    acc[pkg.game].push(pkg)
    return acc
  }, {} as Record<GameType, Package[]>)

  return (
    <div className="space-y-6 sm:space-y-8">
      {Object.entries(groupedPackages).map(([game, gamePackages]) => (
        <div key={game}>
          {!gameType && (
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 px-2 sm:px-0">
              {game === 'PUBG_MOBILE' ? 'PUBG Mobile UC' : 'Mobile Legends Diamonds'}
            </h3>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {(gamePackages as Package[]).map((pkg) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                onPurchase={onPurchase}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}