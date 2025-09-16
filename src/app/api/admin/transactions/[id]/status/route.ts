import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../../lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { status } = await request.json()
    const { id: transactionId } = await params

    if (!status || !['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const transaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: { 
        status,
        updatedAt: new Date()
      },
      include: {
        package: true,
        user: true
      }
    })

    return NextResponse.json({ success: true, transaction })
  } catch (error) {
    console.error('Transaction status update error:', error)
    return NextResponse.json(
      { error: 'Failed to update transaction status' },
      { status: 500 }
    )
  }
}