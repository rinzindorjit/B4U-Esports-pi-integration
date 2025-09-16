import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

type GameType = 'PUBG_MOBILE' | 'MLBB'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const game = searchParams.get('game') as GameType | null

    const whereClause = {
      isActive: true,
      ...(game && { game })
    }

    const packages = await prisma.package.findMany({
      where: whereClause,
      orderBy: { usdtPrice: 'asc' }
    })

    return NextResponse.json({
      success: true,
      data: packages
    })

  } catch (error) {
    console.error('Packages fetch error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch packages'
    }, { status: 500 })
  }
}