import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Health check endpoint for Pi Network integration
  const healthData = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Pi Network Integration',
    version: '1.0.0',
    environment: process.env.NEXT_PUBLIC_PI_ENVIRONMENT || 'development',
    backendUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    piNetwork: {
      sdkAvailable: typeof window !== 'undefined' ? !!window.Pi : false,
      environment: process.env.NEXT_PUBLIC_PI_ENVIRONMENT || 'sandbox'
    }
  }

  return NextResponse.json(healthData)
}