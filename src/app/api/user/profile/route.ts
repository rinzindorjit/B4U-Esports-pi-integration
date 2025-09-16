import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { z } from 'zod'

const profileUpdateSchema = z.object({
  profileData: z.object({
    email: z.string().email(),
    contactNumber: z.string().optional(),
    country: z.string().min(1),
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

    // Get user from Pi access token (in a real implementation)
    // For now, we'll get the user from the request or session
    const authHeader = request.headers.get('authorization')
    const piAccessToken = request.headers.get('x-pi-access-token')
    
    if (!piAccessToken && !authHeader) {
      return NextResponse.json({
        success: false,
        error: 'Authentication required'
      }, { status: 401 })
    }

    // For development, we'll get user by email since we don't have real Pi auth yet
    let user = await prisma.user.findFirst({
      where: { email: profileData.email },
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
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 })
    }

    // Update user profile
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        email: profileData.email,
        contactNumber: profileData.contactNumber || null,
        country: profileData.country,
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

    // Update or create PUBG profile
    if (pubgData && user) {
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
    }

    // Update or create MLBB profile
    if (mlbbData && user) {
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
    }

    return NextResponse.json({
      success: true,
      user,
      message: 'Profile updated successfully'
    })

  } catch (error) {
    console.error('Profile update error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.issues
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      error: 'Failed to update profile'
    }, { status: 500 })
  }
}