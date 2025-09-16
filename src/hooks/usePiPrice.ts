'use client'
import { useState, useEffect, useCallback } from 'react'

interface PiPriceData {
  priceUsd: number
  timestamp: string
  source: string
}

interface UsePiPriceReturn {
  price: number | null
  isLoading: boolean
  error: string | null
  lastUpdated: string | null
  source: string | null
  isMockData: boolean
  refreshPrice: () => Promise<void>
  convertUsdtToPi: (usdtAmount: number) => number | null
}

export function usePiPrice(autoRefreshInterval: number = 60000): UsePiPriceReturn {
  const [price, setPrice] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [source, setSource] = useState<string | null>(null)
  const [isMockData, setIsMockData] = useState(false)

  const fetchPrice = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        console.log('Skipping Pi price fetch in server environment')
        setIsLoading(false)
        return
      }

      console.log('Fetching Pi price from API...')
      const response = await fetch('/api/pricing/pi-price', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add timeout to prevent hanging requests
        signal: AbortSignal.timeout(10000) // 10 second timeout
      })
      
      console.log('API response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('API error response:', errorText)
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }

      const result = await response.json()
      console.log('API response data:', result)
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch Pi price')
      }

      const data: PiPriceData = result.data
      setPrice(data.priceUsd)
      setLastUpdated(data.timestamp)
      setSource(data.source)
      
      // Check if we're using mock/fallback data
      const mockSources = ['mock_fallback', 'mock_simulation', 'database_fallback', 'emergency_fallback']
      setIsMockData(mockSources.includes(data.source))
      
      // Show warning if using mock data
      if (result.warning) {
        console.warn('Pi Price Warning:', result.warning)
      }

    } catch (err) {
      console.error('Error fetching Pi price:', err)
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      
      // If this is the first load and we have an error, try to use a fallback price
      if (!price) {
        console.log('Setting emergency fallback price')
        const emergencyPrice = 1.47 // Emergency fallback price
        setPrice(emergencyPrice)
        setLastUpdated(new Date().toISOString())
        setSource('emergency_fallback')
        setIsMockData(true)
      }
    } finally {
      setIsLoading(false)
    }
  }, [price])

  const refreshPrice = useCallback(async () => {
    await fetchPrice()
  }, [fetchPrice])

  const convertUsdtToPi = useCallback((usdtAmount: number): number | null => {
    // Validate inputs
    if (typeof usdtAmount !== 'number' || isNaN(usdtAmount) || usdtAmount <= 0) {
      console.warn('Invalid USDT amount provided to convertUsdtToPi:', usdtAmount)
      return null
    }
    
    if (!price || price <= 0) {
      console.warn('Pi price not available for conversion')
      return null
    }
    
    const result = usdtAmount / price
    return result
  }, [price])

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') {
      console.log('Skipping Pi price fetch in server environment')
      setIsLoading(false)
      return
    }
    
    // Initial fetch
    fetchPrice()

    // Set up auto-refresh interval
    if (autoRefreshInterval > 0) {
      const interval = setInterval(fetchPrice, autoRefreshInterval)
      return () => clearInterval(interval)
    }
  }, [fetchPrice, autoRefreshInterval])

  return {
    price,
    isLoading,
    error,
    lastUpdated,
    source,
    isMockData,
    refreshPrice,
    convertUsdtToPi
  }
}