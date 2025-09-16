import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(request: NextRequest) {
  try {
    console.log('Testing database connection...')
    
    // Try a simple query to test the connection
    const result = await prisma.$queryRaw`SELECT 1 as test`
    
    console.log('Database connection test result:', result)
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      result
    })
  } catch (error) {
    console.error('Database connection test failed:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorDetails = {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    }
    
    return NextResponse.json({
      success: false,
      error: 'Database connection failed',
      details: errorDetails
    }, { status: 500 })
  }
}