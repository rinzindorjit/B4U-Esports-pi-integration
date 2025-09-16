import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price'
const PI_PRICE_CACHE_DURATION = 60 * 1000 // 1 minute in milliseconds

// In-memory cache for Pi price (in production, use Redis or similar)
let priceCache: {
  price: number
  timestamp: number
} | null = null

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

    // Try to get the last known price from database
    try {
      const lastKnownPrice = await prisma.piPrice.findFirst({
        orderBy: { createdAt: 'desc' }
      })

      if (lastKnownPrice) {
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

    // Final fallback to a mock price for development
    const mockPrice = 1.50 // Mock price for development
    return NextResponse.json({
      success: true,
      data: {
        priceUsd: mockPrice,
        timestamp: new Date().toISOString(),
        source: 'mock_fallback'
      }
    })
  }
}