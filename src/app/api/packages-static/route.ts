import { NextRequest, NextResponse } from 'next/server'
import { staticPackages } from '../../../data/packages'

type GameType = 'PUBG_MOBILE' | 'MLBB'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const game = searchParams.get('game') as GameType | null

    console.log('Fetching static packages with filter:', { game })

    // Filter packages based on game if provided
    const filteredPackages = game 
      ? staticPackages.filter(pkg => pkg.game === game && pkg.isActive)
      : staticPackages.filter(pkg => pkg.isActive)

    // Sort by price
    const sortedPackages = filteredPackages.sort((a, b) => a.usdtPrice - b.usdtPrice)

    console.log('Found static packages:', sortedPackages.length)

    return NextResponse.json({
      success: true,
      data: sortedPackages
    })

  } catch (error) {
    console.error('Static packages fetch error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch packages'
    
    return NextResponse.json({
      success: false,
      error: errorMessage
    }, { status: 500 })
  }
}