import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { z } from 'zod'

const piLoginSchema = z.object({
  piUserId: z.string(),
  piUsername: z.string(),
  piWalletAddress: z.string().optional(), // Make wallet address optional for backward compatibility
  accessToken: z.string()
})

export async function POST(request: NextRequest) {
  try {
    console.log('Pi login request received')
    
    const body = await request.json()
    console.log('Request body:', { ...body, accessToken: '[REDACTED]' })
    
    const { piUserId, piUsername, piWalletAddress, accessToken } = piLoginSchema.parse(body)

    // Check database connection and handle potential issues
    let user
    try {
      // Check if user already exists
      user = await prisma.user.findUnique({
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
      console.log('User lookup result:', user ? 'found' : 'not found')
    } catch (dbError) {
      console.error('Database lookup error:', dbError)
      // For production fallback, create a mock user response
      if (process.env.NODE_ENV === 'production') {
        console.log('Using fallback user creation due to database issues')
        const fallbackUser = {
          id: `fallback_${piUserId}`,
          piUserId,
          piUsername,
          piWalletAddress: piWalletAddress || `fallback_wallet_${piUserId.slice(0, 8)}`,
          email: `${piUsername}@fallback.com`,
          contactNumber: null,
          country: null,
          language: 'en',
          referralCode: null,
          isActive: true,
          isVerified: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          pubgProfile: null,
          mlbbProfile: null,
          transactions: []
        }
        
        return NextResponse.json({
          success: true,
          user: fallbackUser,
          message: 'Authentication successful (fallback mode)',
          warning: 'Database temporarily unavailable, using fallback authentication'
        })
      }
      throw dbError
    }

    if (!user) {
      console.log('Creating new user')
      // Create new user
      // Use the provided wallet address or generate a mock one
      const walletAddress = piWalletAddress || `demo_wallet_${piUserId.slice(0, 8)}`
      
      try {
        user = await prisma.user.create({
          data: {
            piUserId,
            piUsername,
            piWalletAddress: walletAddress,
            email: `${piUsername}@demo.com`, // Will be updated in profile
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
        console.log('New user created successfully')
      } catch (createError) {
        console.error('User creation error:', createError)
        // Fallback for creation issues
        if (process.env.NODE_ENV === 'production') {
          const fallbackUser = {
            id: `new_fallback_${piUserId}`,
            piUserId,
            piUsername,
            piWalletAddress: walletAddress,
            email: `${piUsername}@demo.com`,
            contactNumber: null,
            country: null,
            language: 'en',
            referralCode: null,
            isActive: true,
            isVerified: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            pubgProfile: null,
            mlbbProfile: null,
            transactions: []
          }
          
          return NextResponse.json({
            success: true,
            user: fallbackUser,
            message: 'Authentication successful (new user fallback)',
            warning: 'Database temporarily unavailable, using fallback authentication'
          })
        }
        throw createError
      }

      // Log consent (since user is logging in, they're consenting to data sharing)
      try {
        await prisma.consentLog.create({
          data: {
            userId: user.id,
            consentType: 'data_sharing',
            granted: true,
            ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
            userAgent: request.headers.get('user-agent') || 'unknown'
          }
        })
      } catch (consentError) {
        console.warn('Consent logging failed:', consentError)
        // Don't fail the whole request for consent logging issues
      }
    } else {
      // Update existing user with wallet address if it wasn't set before
      if (piWalletAddress && !user.piWalletAddress) {
        try {
          user = await prisma.user.update({
            where: { id: user.id },
            data: { piWalletAddress },
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
          console.log('Updated user with wallet address')
        } catch (updateError) {
          console.warn('Failed to update user with wallet address:', updateError)
        }
      }
    }

    console.log('Authentication successful for user:', piUsername)
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
      error: 'Authentication failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}