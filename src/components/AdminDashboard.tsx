'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { usePiPrice } from '../hooks/usePiPrice'
import { TransactionWithPackage } from '../types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface AdminStats {
  totalUsers: number
  totalTransactions: number
  totalRevenue: number
  pendingTransactions: number
  completedTransactions: number
  failedTransactions: number
  totalPiVolume: number
  averageTransactionValue: number
}

export default function AdminDashboard() {
  const { user, isLoading: authLoading } = useAuth()
  const { price: piPrice } = usePiPrice()
  const router = useRouter()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [transactions, setTransactions] = useState<TransactionWithPackage[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'users' | 'analytics'>('overview')

  // Simple admin check - in production this should be more robust
  const isAdmin = user?.piWalletAddress === 'GBP7PG27L3U4IQWFQGXNCHCGPJH3GVV72EEO4Q7RHFASMVR4TIA6J5F2' || 
                  user?.email === 'admin@b4uesports.com'

  useEffect(() => {
    // Redirect if not authenticated and not loading
    if (!authLoading && !user) {
      router.push('/dashboard')
      return
    }
    
    if (!authLoading && !isAdmin && user) {
      router.push('/dashboard')
      return
    }
    
    if (!authLoading && isAdmin) {
      fetchAdminData()
      
      // Set up real-time refresh for admin dashboard
      const interval = setInterval(() => {
        fetchAdminData()
      }, 30000) // Refresh every 30 seconds
      
      return () => clearInterval(interval)
    }
  }, [user, isAdmin, router, authLoading])

  const fetchAdminData = async () => {
    try {
      setIsLoading(true)
      
      // Fetch admin stats
      const statsResponse = await fetch('/api/admin/stats')
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      // Fetch all transactions
      const transactionsResponse = await fetch('/api/admin/transactions')
      if (transactionsResponse.ok) {
        const transactionsData = await transactionsResponse.json()
        setTransactions(transactionsData.data || [])
      }

      // Fetch all users
      const usersResponse = await fetch('/api/admin/users')
      if (usersResponse.ok) {
        const usersData = await usersResponse.json()
        setUsers(usersData.data || [])
      }

    } catch (error) {
      console.error('Failed to fetch admin data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600 bg-green-100'
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-100'
      case 'PROCESSING':
        return 'text-blue-600 bg-blue-100'
      case 'FAILED':
        return 'text-red-600 bg-red-100'
      case 'CANCELLED':
        return 'text-gray-600 bg-gray-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const updateTransactionStatus = async (transactionId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/transactions/${transactionId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        // Refresh data
        await fetchAdminData()
        
        // Show success notification
        const notification = document.createElement('div')
        notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50'
        notification.textContent = `Transaction ${newStatus.toLowerCase()} successfully! Email notifications sent.`
        document.body.appendChild(notification)
        
        setTimeout(() => {
          document.body.removeChild(notification)
        }, 3000)
      } else {
        throw new Error('Failed to update transaction status')
      }
    } catch (error) {
      console.error('Error updating transaction:', error)
      alert('Failed to update transaction status')
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Please sign in to access admin panel</h2>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-300 mb-6">You don't have permission to access the admin panel</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Loading admin panel...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Image
                src="https://b4uesports.com/wp-content/uploads/2025/04/cropped-Black_and_Blue_Simple_Creative_Illustrative_Dragons_E-Sport_Logo_20240720_103229_0000-removebg-preview.png"
                alt="B4U Esports"
                width={32}
                height={32}
                className="sm:w-10 sm:h-10 rounded-lg"
              />
              <h1 className="text-lg sm:text-xl font-bold text-white">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="text-yellow-400 font-semibold text-sm sm:text-base">
                Pi: ${piPrice?.toFixed(4) || '...'}
              </div>
              <button
                onClick={() => router.push('/dashboard')}
                className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base px-2 py-1 rounded touch-manipulation"
              >
                User Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Tab Navigation */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-1 mb-6 sm:mb-8 border border-white/20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'transactions', label: 'Transactions' },
              { key: 'users', label: 'Users' },
              { key: 'analytics', label: 'Analytics' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-3 py-2 sm:px-4 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base touch-manipulation ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <h3 className="text-sm sm:text-base font-medium text-gray-300 mb-2">Total Users</h3>
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {isLoading ? '...' : stats?.totalUsers?.toLocaleString() || '0'}
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <h3 className="text-sm sm:text-base font-medium text-gray-300 mb-2">Total Transactions</h3>
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {isLoading ? '...' : stats?.totalTransactions?.toLocaleString() || '0'}
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <h3 className="text-sm sm:text-base font-medium text-gray-300 mb-2">Total Revenue (USD)</h3>
                <div className="text-2xl sm:text-3xl font-bold text-green-400">
                  ${isLoading ? '...' : stats?.totalRevenue?.toFixed(2) || '0.00'}
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <h3 className="text-sm sm:text-base font-medium text-gray-300 mb-2">Pi Volume</h3>
                <div className="text-xl sm:text-2xl font-bold text-yellow-400">
                  {isLoading ? '...' : `${stats?.totalPiVolume?.toFixed(2) || '0.00'} Pi`}
                </div>
              </div>
            </div>

            {/* Transaction Status Overview */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Transaction Status Overview</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-green-400">
                    {stats?.completedTransactions || 0}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-yellow-400">
                    {stats?.pendingTransactions || 0}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300">Pending</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-red-400">
                    {stats?.failedTransactions || 0}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300">Failed</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-blue-400">
                    ${stats?.averageTransactionValue?.toFixed(2) || '0.00'}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300">Avg. Value</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
              <h3 className="text-base sm:text-lg font-semibold text-white">All Transactions</h3>
              <button
                onClick={fetchAdminData}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 rounded-lg text-sm sm:text-base touch-manipulation active:scale-95"
              >
                Refresh
              </button>
            </div>
            
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-black/20 rounded-lg p-4 animate-pulse">
                    <div className="h-4 bg-gray-600 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">No transactions found</div>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="bg-black/20 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="text-white font-medium text-sm sm:text-base">
                          {transaction.package.name}
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </div>
                      <div className="text-gray-300 text-xs sm:text-sm">
                        {formatDate(transaction.createdAt.toString())}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 text-xs sm:text-sm mb-3">
                      <div>
                        <span className="text-gray-400">User ID:</span>
                        <div className="text-white font-medium truncate">{transaction.userId}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Game ID:</span>
                        <div className="text-white font-medium">{transaction.gameUserId}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Amount:</span>
                        <div className="text-white font-medium">{transaction.package.amount.toLocaleString()} {transaction.package.game === 'PUBG_MOBILE' ? 'UC' : 'Diamonds'}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Pi Paid:</span>
                        <div className="text-yellow-400 font-medium">{transaction.piAmount.toFixed(4)} Pi</div>
                      </div>
                      <div>
                        <span className="text-gray-400">USD Value:</span>
                        <div className="text-green-400 font-medium">${transaction.usdtAmount.toFixed(2)}</div>
                      </div>
                    </div>

                    {/* Admin Actions */}
                    <div className="flex flex-wrap gap-2">
                      {transaction.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => updateTransactionStatus(transaction.id, 'PROCESSING')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs touch-manipulation active:scale-95"
                          >
                            Mark Processing
                          </button>
                          <button
                            onClick={() => updateTransactionStatus(transaction.id, 'COMPLETED')}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs touch-manipulation active:scale-95"
                          >
                            Mark Completed
                          </button>
                          <button
                            onClick={() => updateTransactionStatus(transaction.id, 'FAILED')}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs touch-manipulation active:scale-95"
                          >
                            Mark Failed
                          </button>
                        </>
                      )}
                      {transaction.status === 'PROCESSING' && (
                        <button
                          onClick={() => updateTransactionStatus(transaction.id, 'COMPLETED')}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs touch-manipulation active:scale-95"
                        >
                          Mark Completed
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">User Management</h3>
            
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-black/20 rounded-lg p-4 animate-pulse">
                    <div className="h-4 bg-gray-600 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">No users found</div>
              </div>
            ) : (
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="bg-black/20 rounded-lg p-3 sm:p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
                      <div>
                        <span className="text-gray-400">Username:</span>
                        <div className="text-white font-medium">{user.piUsername}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Email:</span>
                        <div className="text-white font-medium truncate">{user.email || 'Not provided'}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Country:</span>
                        <div className="text-white font-medium">{user.country || 'Not provided'}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Joined:</span>
                        <div className="text-white font-medium">{formatDate(user.createdAt)}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                      <div>
                        <span className="text-gray-400">PUBG Profile:</span>
                        <div className="text-white">
                          {user.pubgProfile ? `${user.pubgProfile.ign} (${user.pubgProfile.uid})` : 'Not set'}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-400">MLBB Profile:</span>
                        <div className="text-white">
                          {user.mlbbProfile ? `${user.mlbbProfile.userId_game} (Zone: ${user.mlbbProfile.zoneId})` : 'Not set'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Revenue Analytics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-400">
                    ${stats?.totalRevenue?.toFixed(2) || '0.00'}
                  </div>
                  <div className="text-sm text-gray-300">Total Revenue (USD)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-400">
                    {stats?.totalPiVolume?.toFixed(2) || '0.00'} Pi
                  </div>
                  <div className="text-sm text-gray-300">Total Pi Volume</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-400">
                    ${stats?.averageTransactionValue?.toFixed(2) || '0.00'}
                  </div>
                  <div className="text-sm text-gray-300">Average Transaction</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Game Performance</h3>
              <div className="text-gray-300 text-sm">
                Detailed analytics coming soon...
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}