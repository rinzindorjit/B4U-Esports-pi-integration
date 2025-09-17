import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { z } from 'zod'
import { sendEmail, createOrderCompletionEmail } from '../../../../lib/email'

const completePaymentSchema = z.object({
  paymentId: z.string(),
  txid: z.string()
})

export async function POST(request: NextRequest) {
  let paymentId: string | undefined
  
  try {
    const body = await request.json()
    const parsed = completePaymentSchema.parse(body)
    paymentId = parsed.paymentId
    const txid = parsed.txid

    console.log('Completing Pi payment:', { paymentId, txid })

    // Find transaction by Pi payment ID
    const transaction = await prisma.transaction.findFirst({
      where: { 
        piTransactionId: paymentId
      },
      include: { 
        package: true, 
        user: {
          include: {
            pubgProfile: true,
            mlbbProfile: true
          }
        }
      }
    })

    if (!transaction) {
      return NextResponse.json({
        success: false,
        error: 'Transaction not found'
      }, { status: 404 })
    }

    // Only process if transaction is in PROCESSING state
    if (transaction.status !== 'PROCESSING') {
      return NextResponse.json({
        success: false,
        error: `Transaction is in unexpected state: ${transaction.status}`
      }, { status: 400 })
    }

    // Process the game currency delivery
    console.log('Processing game currency delivery:', {
      game: transaction.package.game,
      amount: transaction.package.amount,
      targetUser: transaction.gameUserId,
      zoneId: transaction.gameZoneId
    })

    // Update transaction to completed
    const completedTransaction = await prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        status: 'COMPLETED',
        completedAt: new Date()
      }
    })

    // Send completion email to user
    try {
      if (transaction.user.email) {
        const completionEmailData = createOrderCompletionEmail(transaction, transaction.user)
        await sendEmail(completionEmailData)
        console.log('Order completion email sent to user:', transaction.user.email)
      }
    } catch (emailError) {
      console.error('Completion email notification failed:', emailError)
      // Don't fail the completion if email fails
    }

    console.log('Payment completed successfully:', {
      transactionId: transaction.id,
      paymentId,
      txid,
      game: transaction.package.game,
      amount: transaction.package.amount
    })

    return NextResponse.json({
      success: true,
      message: 'Payment completed successfully',
      transaction: completedTransaction
    })

  } catch (error) {
    console.error('Payment completion error:', error)
    
    // Mark transaction as failed if something went wrong
    if (error instanceof Error && paymentId) {
      try {
        await prisma.transaction.updateMany({
          where: { piTransactionId: paymentId },
          data: { 
            status: 'FAILED',
            errorMessage: error.message
          }
        })
      } catch (dbError) {
        console.error('Failed to update transaction status:', dbError)
      }
    }
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.issues
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to complete payment'
    }, { status: 500 })
  }
}