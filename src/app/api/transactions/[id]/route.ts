import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: transactionId } = await params

    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: {
        package: true,
        user: true
      }
    })

    if (!transaction) {
      return NextResponse.json({
        success: false,
        error: 'Transaction not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: transaction
    })

  } catch (error) {
    console.error('Transaction fetch error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch transaction'
    }, { status: 500 })
  }
}