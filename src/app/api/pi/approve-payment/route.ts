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

    console.log('Approving Pi payment:', paymentId)

    // Find transaction by Pi payment ID
    const transaction = await prisma.transaction.findFirst({
      where: { 
        piTransactionId: paymentId  // Look for the specific payment ID
      },
      include: { package: true, user: true }
    })

    // If we don't find by payment ID, look for the most recent pending transaction
    if (!transaction) {
      const pendingTransaction = await prisma.transaction.findFirst({
        where: { 
          status: 'PENDING',
          piTransactionId: null
        },
        orderBy: { createdAt: 'desc' },
        include: { package: true, user: true }
      })

      if (pendingTransaction) {
        // Update the pending transaction with the payment ID
        const updatedTransaction = await prisma.transaction.update({
          where: { id: pendingTransaction.id },
          data: {
            piTransactionId: paymentId,
            status: 'PROCESSING'
          }
        })
        
        console.log('Payment approved successfully:', {
          transactionId: updatedTransaction.id,
          paymentId,
          amount: updatedTransaction.piAmount
        })

        return NextResponse.json({
          success: true,
          message: 'Payment approved successfully',
          transactionId: updatedTransaction.id
        })
      } else {
        return NextResponse.json({
          success: false,
          error: 'No pending transaction found'
        }, { status: 404 })
      }
    }

    // If we found the transaction by payment ID, update its status
    if (transaction.status === 'PENDING') {
      const updatedTransaction = await prisma.transaction.update({
        where: { id: transaction.id },
        data: {
          status: 'PROCESSING'
        }
      })

      console.log('Payment approved successfully:', {
        transactionId: updatedTransaction.id,
        paymentId,
        amount: updatedTransaction.piAmount
      })

      return NextResponse.json({
        success: true,
        message: 'Payment approved successfully',
        transactionId: updatedTransaction.id
      })
    } else if (transaction.status === 'PROCESSING') {
      // Already processing, no need to update
      return NextResponse.json({
        success: true,
        message: 'Payment already approved',
        transactionId: transaction.id
      })
    } else {
      // Transaction is in an unexpected state
      return NextResponse.json({
        success: false,
        error: `Transaction is in unexpected state: ${transaction.status}`
      }, { status: 400 })
    }

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