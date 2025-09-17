import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { z } from 'zod'
import { sendEmail, createOrderConfirmationEmail, createAdminOrderNotificationEmail } from '../../../../lib/email'

const createTransactionSchema = z.object({
  packageId: z.string(),
  gameUserId: z.string(),
  gameZoneId: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { packageId, gameUserId, gameZoneId } = createTransactionSchema.parse(body)

    // Get current Pi price
    const priceResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/pricing/pi-price`)
    if (!priceResponse.ok) {
      throw new Error('Failed to get current Pi price')
    }
    const priceData = await priceResponse.json()
    const currentPiPrice = priceData.data.priceUsd

    // Get package details
    const packageData = await prisma.package.findUnique({
      where: { id: packageId }
    })

    if (!packageData) {
      return NextResponse.json({
        success: false,
        error: 'Package not found'
      }, { status: 404 })
    }

    // Calculate Pi amount
    const piAmount = packageData.usdtPrice / currentPiPrice

    // TODO: In production, use authenticated user from Pi Network token
    // For now, get user by the first available user (in development)
    const user = await prisma.user.findFirst({
      include: {
        pubgProfile: true,
        mlbbProfile: true
      }
    })

    // In production, you would extract the user from the Pi Network authentication token:
    /*
    const authToken = request.headers.get('authorization')
    if (!authToken) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required'
      }, { status: 401 })
    }
    
    // Verify the token with Pi Network and extract user info
    const user = await getUserFromPiToken(authToken)
    */

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 })
    }

    // Validate user has required profile for this game
    if (packageData.game === 'PUBG_MOBILE' && !user.pubgProfile) {
      return NextResponse.json({
        success: false,
        error: 'PUBG profile required for this purchase'
      }, { status: 400 })
    }

    if (packageData.game === 'MLBB' && !user.mlbbProfile) {
      return NextResponse.json({
        success: false,
        error: 'Mobile Legends profile required for this purchase'
      }, { status: 400 })
    }

    // Create transaction
    const transaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        packageId: packageData.id,
        piAmount,
        usdtAmount: packageData.usdtPrice,
        piPriceSnapshot: currentPiPrice,
        gameUserId,
        gameZoneId: gameZoneId || null,
        status: 'PENDING'
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

    // Send email notifications
    try {
      // Send confirmation email to user (if email is provided)
      if (user.email) {
        const userEmailData = createOrderConfirmationEmail(transaction, user)
        await sendEmail(userEmailData)
        console.log('Order confirmation email sent to user:', user.email)
      }

      // Send notification email to admin
      const adminEmailData = createAdminOrderNotificationEmail(transaction, user)
      await sendEmail(adminEmailData)
      console.log('Admin notification email sent')
    } catch (emailError) {
      console.error('Email notification failed:', emailError)
      // Don't fail the transaction if email fails
    }

    return NextResponse.json({
      success: true,
      transaction,
      message: 'Transaction created successfully'
    })

  } catch (error) {
    console.error('Transaction creation error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.issues
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to create transaction'
    }, { status: 500 })
  }
}