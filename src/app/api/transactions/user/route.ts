import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // For now, get the first user (in production, use proper authentication)
    const user = await prisma.user.findFirst()
    
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 })
    }

    const transactions = await prisma.transaction.findMany({
      where: { userId: user.id },
      include: {
        package: true,
        user: true
      },
      orderBy: { createdAt: 'desc' },
      take: 50 // Limit to last 50 transactions
    })

    return NextResponse.json({
      success: true,
      data: transactions
    })

  } catch (error) {
    console.error('Transactions fetch error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch transactions'
    }, { status: 500 })
  }
}