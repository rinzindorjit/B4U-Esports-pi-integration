import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

type GameType = 'PUBG_MOBILE' | 'MLBB'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const game = searchParams.get('game') as GameType | null

    console.log('Fetching packages with filter:', { game })

    const whereClause = {
      isActive: true,
      ...(game && { game })
    }

    const packages = await prisma.package.findMany({
      where: whereClause,
      orderBy: { usdtPrice: 'asc' }
    })

    console.log('Found packages:', packages.length)

    return NextResponse.json({
      success: true,
      data: packages
    })

  } catch (error) {
    console.error('Packages fetch error:', error)
    
    // Provide more specific error message
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch packages'
    
    // If it's a database connection error, provide a more user-friendly message
    if (errorMessage.includes('database') || errorMessage.includes('Unable to open') || errorMessage.includes('connection') || errorMessage.includes('P1001') || errorMessage.includes('P1010')) {
      return NextResponse.json({
        success: false,
        error: 'Service temporarily unavailable. Database connection error.'
      }, { status: 503 })
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage
    }, { status: 500 })
  }
}