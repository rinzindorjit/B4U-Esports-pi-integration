import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'B4U Esports API is running',
    timestamp: new Date().toISOString(),
    service: 'b4u-esports-api'
  })
}