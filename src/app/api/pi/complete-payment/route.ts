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
        piTransactionId: paymentId,
        status: 'PROCESSING'
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
        error: 'Transaction not found or not in processing state'
      }, { status: 404 })
    }

    // In a real implementation, you would:
    // 1. Submit the completed payment to Pi Network
    // 2. Verify the blockchain transaction
    // 3. Process the in-game currency delivery

    // For development, we'll simulate the completion process
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

    // In real implementation, submit to Pi Network:
    /*
    const submitResponse = await fetch('https://api.minepi.com/v2/payments/' + paymentId + '/complete', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.PI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        txid: txid
      })
    })
    
    if (!submitResponse.ok) {
      throw new Error('Failed to submit payment to Pi Network')
    }
    */

    // In real implementation, integrate with game APIs for currency delivery:
    /*
    if (transaction.package.game === 'PUBG_MOBILE') {
      await deliverPubgUC(transaction.gameUserId, transaction.package.amount)
    } else if (transaction.package.game === 'MLBB') {
      await deliverMLBBDiamonds(transaction.gameUserId, transaction.gameZoneId, transaction.package.amount)
    }
    */

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
    if (error instanceof Error && error.message.includes('paymentId') && paymentId) {
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