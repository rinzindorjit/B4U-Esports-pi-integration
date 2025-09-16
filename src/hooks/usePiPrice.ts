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
  refreshPrice: () => Promise<void>
  convertUsdtToPi: (usdtAmount: number) => number | null
}

export function usePiPrice(autoRefreshInterval: number = 60000): UsePiPriceReturn {
  const [price, setPrice] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [source, setSource] = useState<string | null>(null)

  const fetchPrice = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/pricing/pi-price')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch Pi price')
      }

      const data: PiPriceData = result.data
      setPrice(data.priceUsd)
      setLastUpdated(data.timestamp)
      setSource(data.source)

    } catch (err) {
      console.error('Error fetching Pi price:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const refreshPrice = useCallback(async () => {
    await fetchPrice()
  }, [fetchPrice])

  const convertUsdtToPi = useCallback((usdtAmount: number): number | null => {
    if (!price || price <= 0) return null
    return usdtAmount / price
  }, [price])

  useEffect(() => {
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
    refreshPrice,
    convertUsdtToPi
  }
}