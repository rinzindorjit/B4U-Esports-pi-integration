import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { z } from 'zod'

const profileUpdateSchema = z.object({
  profileData: z.object({
    email: z.string().email(),
    contactNumber: z.string().optional(),
    country: z.string().optional(), // Make country optional to match the type definition
    language: z.string().default('en'),
    referralCode: z.string().optional()
  }),
  pubgData: z.object({
    ign: z.string().min(1),
    uid: z.string().regex(/^\d+$/, 'UID must contain only numbers')
  }).optional(),
  mlbbData: z.object({
    userId_game: z.string().regex(/^\d+$/, 'User ID must contain only numbers'),
    zoneId: z.string().regex(/^\d+$/, 'Zone ID must contain only numbers')
  }).optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { profileData, pubgData, mlbbData } = profileUpdateSchema.parse(body)

    // For development, find the most recent user
    // In production, this would be based on the verified Pi access token
    let user = await prisma.user.findFirst({
      orderBy: { createdAt: 'desc' },
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
      console.error('User not found in database')
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 })
    }

    console.log('Updating profile for user:', user.id)

    // Update user profile
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        email: profileData.email,
        contactNumber: profileData.contactNumber || null,
        country: profileData.country || null, // Handle optional country
        language: profileData.language,
        referralCode: profileData.referralCode || null
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

    console.log('User profile updated successfully')

    // Update or create PUBG profile
    if (pubgData && user) {
      console.log('Updating PUBG profile for user:', user.id)
      await prisma.pubgProfile.upsert({
        where: { userId: user.id },
        update: {
          ign: pubgData.ign,
          uid: pubgData.uid
        },
        create: {
          userId: user.id,
          ign: pubgData.ign,
          uid: pubgData.uid
        }
      })

      // Refresh user data to include updated profile
      user = await prisma.user.findUnique({
        where: { id: user.id },
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
      console.log('PUBG profile updated successfully')
    }

    // Update or create MLBB profile
    if (mlbbData && user) {
      console.log('Updating MLBB profile for user:', user.id)
      await prisma.mlbbProfile.upsert({
        where: { userId: user.id },
        update: {
          userId_game: mlbbData.userId_game,
          zoneId: mlbbData.zoneId
        },
        create: {
          userId: user.id,
          userId_game: mlbbData.userId_game,
          zoneId: mlbbData.zoneId
        }
      })

      // Refresh user data to include updated profile
      user = await prisma.user.findUnique({
        where: { id: user.id },
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
      console.log('MLBB profile updated successfully')
    }

    console.log('Profile update completed successfully for user:', user?.id)

    return NextResponse.json({
      success: true,
      user,
      message: 'Profile updated successfully'
    })

  } catch (error) {
    console.error('Profile update error:', error)
    
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.issues)
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.issues
      }, { status: 400 })
    }

    // Handle database connection errors
    if (error instanceof Error && (error.message.includes('database') || error.message.includes('Unable to open') || error.message.includes('connection') || error.message.includes('P1001') || error.message.includes('P1010'))) {
      console.error('Database connection error:', error.message)
      return NextResponse.json({
        success: false,
        error: 'Service temporarily unavailable. Database connection error.'
      }, { status: 503 })
    }

    // Log the specific error for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Profile update failed with error:', errorMessage)

    return NextResponse.json({
      success: false,
      error: 'Failed to update profile. Please try again.'
    }, { status: 500 })
  }
}