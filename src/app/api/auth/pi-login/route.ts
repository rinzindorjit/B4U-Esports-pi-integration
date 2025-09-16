import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { z } from 'zod'

const piLoginSchema = z.object({
  piUserId: z.string(),
  piUsername: z.string(),
  accessToken: z.string()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { piUserId, piUsername, accessToken } = piLoginSchema.parse(body)

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { piUserId },
      include: {
        pubgProfile: true,
        mlbbProfile: true,
        transactions: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          include: { package: true }
        }
      }
    })

    if (!user) {
      // Create new user
      // For now, we'll generate a mock wallet address since we don't have real Pi integration
      const mockWalletAddress = `mock_wallet_${piUserId.slice(0, 8)}`
      
      user = await prisma.user.create({
        data: {
          piUserId,
          piUsername,
          piWalletAddress: mockWalletAddress,
          email: `${piUsername}@placeholder.com`, // Will be updated in profile
        },
        include: {
          pubgProfile: true,
          mlbbProfile: true,
          transactions: {
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: { package: true }
          }
        }
      })

      // Log consent (since user is logging in, they're consenting to data sharing)
      await prisma.consentLog.create({
        data: {
          userId: user.id,
          consentType: 'data_sharing',
          granted: true,
          ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
          userAgent: request.headers.get('user-agent') || 'unknown'
        }
      })
    }

    return NextResponse.json({
      success: true,
      user,
      message: 'Authentication successful'
    })

  } catch (error) {
    console.error('Pi login error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.issues
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      error: 'Authentication failed'
    }, { status: 500 })
  }
}