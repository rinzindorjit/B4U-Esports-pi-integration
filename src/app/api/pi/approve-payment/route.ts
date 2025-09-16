import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { z } from 'zod'

const approvePaymentSchema = z.object({
  paymentId: z.string()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentId } = approvePaymentSchema.parse(body)

    // In a real implementation, you would:
    // 1. Verify the payment with Pi Network servers
    // 2. Check payment authenticity and amount
    // 3. Update transaction status accordingly

    // For development, we'll simulate the approval process
    console.log('Approving Pi payment:', paymentId)

    // Find transaction by Pi payment ID (in real implementation)
    // For now, we'll approve the most recent pending transaction
    const transaction = await prisma.transaction.findFirst({
      where: { 
        status: 'PENDING',
        piTransactionId: null // Not yet assigned a Pi transaction ID
      },
      orderBy: { createdAt: 'desc' },
      include: { package: true, user: true }
    })

    if (!transaction) {
      return NextResponse.json({
        success: false,
        error: 'No pending transaction found'
      }, { status: 404 })
    }

    // Update transaction with Pi payment ID and set to processing
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        piTransactionId: paymentId,
        status: 'PROCESSING'
      }
    })

    // In real implementation, verify with Pi Network API:
    /*
    const verificationResponse = await fetch('https://api.minepi.com/v2/payments/' + paymentId, {
      method: 'GET',
      headers: {
        'Authorization': `Key ${process.env.PI_API_KEY}`
      }
    })
    
    if (!verificationResponse.ok) {
      throw new Error('Payment verification failed')
    }
    
    const paymentData = await verificationResponse.json()
    
    // Verify payment details match transaction
    if (paymentData.amount !== transaction.piAmount || 
        paymentData.status !== 'developer_approved') {
      throw new Error('Payment verification mismatch')
    }
    */

    console.log('Payment approved successfully:', {
      transactionId: transaction.id,
      paymentId,
      amount: transaction.piAmount
    })

    return NextResponse.json({
      success: true,
      message: 'Payment approved successfully',
      transactionId: transaction.id
    })

  } catch (error) {
    console.error('Payment approval error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.issues
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to approve payment'
    }, { status: 500 })
  }
}