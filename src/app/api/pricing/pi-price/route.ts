import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price'
const PI_PRICE_CACHE_DURATION = 60 * 1000 // 1 minute in milliseconds

// In-memory cache for Pi price (in production, use Redis or similar)
let priceCache: {
  price: number
  timestamp: number
} | null = null

// Enhanced mock price system with realistic fluctuations
function getMockPrice(): number {
  const basePrice = 1.47 // Base Pi price around $1.47
  const variation = 0.05 // 5% price variation
  const timeBasedFluctuation = Math.sin(Date.now() / 300000) * 0.02 // Slow sine wave fluctuation
  const randomFluctuation = (Math.random() - 0.5) * variation
  
  return Number((basePrice + timeBasedFluctuation + randomFluctuation).toFixed(4))
}

// Get mock price with timestamp simulation
function getMockPriceData() {
  return {
    priceUsd: getMockPrice(),
    timestamp: new Date().toISOString(),
    source: 'mock_simulation'
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check cache first
    if (priceCache && (Date.now() - priceCache.timestamp) < PI_PRICE_CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        data: {
          priceUsd: priceCache.price,
          timestamp: new Date(priceCache.timestamp).toISOString(),
          source: 'cache'
        }
      })
    }

    // Fetch fresh price from CoinGecko
    const response = await fetch(
      `${COINGECKO_API_URL}?ids=pi-network&vs_currencies=usd&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'B4U-Esports-App/1.0'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    const data = await response.json()
    const piPrice = data['pi-network']?.usd

    if (!piPrice || typeof piPrice !== 'number') {
      throw new Error('Invalid price data received from CoinGecko')
    }

    // Update cache
    priceCache = {
      price: piPrice,
      timestamp: Date.now()
    }

    // Store price in database for historical tracking
    try {
      await prisma.piPrice.create({
        data: {
          priceUsd: piPrice,
          source: 'coingecko'
        }
      })
    } catch (dbError) {
      console.error('Failed to store price in database:', dbError)
      // Don't fail the request if database storage fails
    }

    return NextResponse.json({
      success: true,
      data: {
        priceUsd: piPrice,
        timestamp: new Date().toISOString(),
        source: 'coingecko'
      }
    })

  } catch (error) {
    console.error('Pi price fetch error:', error)
    console.log('Attempting fallback methods...')

    // Try to get the last known price from database
    try {
      const lastKnownPrice = await prisma.piPrice.findFirst({
        orderBy: { createdAt: 'desc' }
      })

      if (lastKnownPrice) {
        console.log('Using database fallback price:', lastKnownPrice.priceUsd)
        return NextResponse.json({
          success: true,
          data: {
            priceUsd: lastKnownPrice.priceUsd,
            timestamp: lastKnownPrice.createdAt.toISOString(),
            source: 'database_fallback'
          }
        })
      }
    } catch (dbError) {
      console.error('Database fallback failed:', dbError)
    }

    // Enhanced mock fallback with realistic price simulation
    console.log('Using enhanced mock price simulation')
    const mockData = getMockPriceData()
    
    // Update cache with mock data to ensure consistency
    priceCache = {
      price: mockData.priceUsd,
      timestamp: Date.now()
    }

    // Try to store mock price in database for consistency
    try {
      await prisma.piPrice.create({
        data: {
          priceUsd: mockData.priceUsd,
          source: 'mock_simulation'
        }
      })
    } catch (dbError) {
      console.log('Could not store mock price in database:', dbError)
    }

    return NextResponse.json({
      success: true,
      data: mockData,
      warning: 'Using simulated Pi price - live data unavailable'
    })
  }
}