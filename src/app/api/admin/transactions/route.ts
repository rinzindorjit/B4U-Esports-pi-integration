import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        package: true,
        user: {
          select: {
            id: true,
            piUsername: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ data: transactions })
  } catch (error) {
    console.error('Admin transactions error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}