import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const profileUpdateSchema = z.object({
  profileData: z.object({
    email: z.string().email(),
    contactNumber: z.string().optional(),
    country: z.string().optional(),
    language: z.string().default('en'),
    referralCode: z.string().optional()
  }),
  pubgData: z.object({
    ign: z.string().min(1),
    uid: z.string().regex(/^\d+$/, 'UID must contain only numbers')
  }).optional().nullable(),
  mlbbData: z.object({
    userId_game: z.string().regex(/^\d+$/, 'User ID must contain only numbers'),
    zoneId: z.string().regex(/^\d+$/, 'Zone ID must contain only numbers')
  }).optional().nullable()
})

// In-memory storage for user profiles (for demonstration purposes)
// In a real application, you would use a database or other persistent storage
const userProfiles: Record<string, any> = {}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { profileData, pubgData, mlbbData } = profileUpdateSchema.parse(body)

    // For demonstration, we'll use a static user ID
    // In a real application, this would come from authentication
    const userId = 'user-static-123'
    
    // Update or create user profile in memory
    userProfiles[userId] = {
      id: userId,
      piUserId: 'pi-user-456',
      piUsername: 'demo-user',
      piWalletAddress: 'pi-wallet-789',
      email: profileData.email,
      contactNumber: profileData.contactNumber || null,
      country: profileData.country || null,
      language: profileData.language,
      referralCode: profileData.referralCode || null,
      isActive: true,
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pubgProfile: pubgData ? {
        id: 'pubg-profile-1',
        userId: userId,
        ign: pubgData.ign,
        uid: pubgData.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } : null,
      mlbbProfile: mlbbData ? {
        id: 'mlbb-profile-1',
        userId: userId,
        userId_game: mlbbData.userId_game,
        zoneId: mlbbData.zoneId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } : null,
      transactions: []
    }

    console.log('User profile updated successfully (static):', userId)

    return NextResponse.json({
      success: true,
      user: userProfiles[userId],
      message: 'Profile updated successfully'
    })

  } catch (error) {
    console.error('Profile update error (static):', error)
    
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.issues)
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.issues
      }, { status: 400 })
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Profile update failed with error:', errorMessage)

    return NextResponse.json({
      success: false,
      error: 'Failed to update profile. Please try again.'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // For demonstration, we'll use a static user ID
    // In a real application, this would come from authentication
    const userId = 'user-static-123'
    
    const user = userProfiles[userId] || {
      id: userId,
      piUserId: 'pi-user-456',
      piUsername: 'demo-user',
      piWalletAddress: 'pi-wallet-789',
      email: '',
      contactNumber: null,
      country: 'BT',
      language: 'en',
      referralCode: null,
      isActive: true,
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pubgProfile: null,
      mlbbProfile: null,
      transactions: []
    }

    console.log('User profile fetched successfully (static):', userId)

    return NextResponse.json({
      success: true,
      user
    })

  } catch (error) {
    console.error('Profile fetch error (static):', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Profile fetch failed with error:', errorMessage)

    return NextResponse.json({
      success: false,
      error: 'Failed to fetch profile. Please try again.'
    }, { status: 500 })
  }
}