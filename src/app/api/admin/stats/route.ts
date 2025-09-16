import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Get admin stats
    const totalUsers = await prisma.user.count()
    const totalTransactions = await prisma.transaction.count()
    
    const transactionStats = await prisma.transaction.aggregate({
      _sum: {
        usdtAmount: true,
        piAmount: true
      },
      _avg: {
        usdtAmount: true
      }
    })

    const statusCounts = await prisma.transaction.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    })

    const statusMap = statusCounts.reduce((acc: Record<string, number>, item: any) => {
      acc[item.status] = item._count.status
      return acc
    }, {} as Record<string, number>)

    const stats = {
      totalUsers,
      totalTransactions,
      totalRevenue: transactionStats._sum.usdtAmount || 0,
      totalPiVolume: transactionStats._sum.piAmount || 0,
      averageTransactionValue: transactionStats._avg.usdtAmount || 0,
      completedTransactions: statusMap.COMPLETED || 0,
      pendingTransactions: statusMap.PENDING || 0,
      failedTransactions: statusMap.FAILED || 0
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    )
  }
}