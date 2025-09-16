'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { usePiPrice } from '../hooks/usePiPrice'
import { TransactionWithPackage, Package } from '../types'
import Image from 'next/image'
import UserProfileForm from './UserProfileForm'
import PurchaseModal from './PurchaseModal'

// Mock packages data for showcase
const FEATURED_PACKAGES: Package[] = [
  {
    id: '1',
    name: '60 UC',
    description: 'Perfect for battle pass or small purchases',
    amount: 60,
    usdtPrice: 0.99,
    game: 'PUBG_MOBILE',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2', 
    name: '300 UC',
    description: 'Great value for skins and upgrades',
    amount: 300,
    usdtPrice: 4.99,
    game: 'PUBG_MOBILE',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: '86 Diamonds',
    description: 'Essential diamonds for heroes and skins',
    amount: 86,
    usdtPrice: 1.99,
    game: 'MLBB',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: '172 Diamonds', 
    description: 'Popular choice for premium items',
    amount: 172,
    usdtPrice: 3.99,
    game: 'MLBB',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export default function UserDashboard() {
  const { user, logout } = useAuth()
  const { price: piPrice } = usePiPrice()
  const [transactions, setTransactions] = useState<TransactionWithPackage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showProfileForm, setShowProfileForm] = useState(false)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [selectedGame, setSelectedGame] = useState<'PUBG_MOBILE' | 'MLBB' | null>(null)
  const [showAllProducts, setShowAllProducts] = useState(false)

  useEffect(() => {
    if (user) {
      fetchTransactions()
    }
  }, [user])

  const fetchTransactions = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/transactions/user')
      if (response.ok) {
        const result = await response.json()
        setTransactions(result.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
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

  const truncateAddress = (address: string) => {
    if (!address) return 'Not available'
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const calculatePiPrice = (usdPrice: number) => {
    return piPrice ? (usdPrice / piPrice) : 0
  }

  const handleProductClick = (pkg: Package) => {
    setSelectedPackage(pkg)
    setShowPurchaseModal(true)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center text-white backdrop-blur-sm bg-white/10 p-8 rounded-2xl border border-white/20">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to B4U Esports
          </h2>
          <p className="text-gray-300 mb-6">Please sign in with Pi Network to access your gaming dashboard</p>
          <div className="text-sm text-gray-400">
            Experience the future of gaming payments with Pi Network
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative bg-black/30 backdrop-blur-xl border-b border-white/20">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <p className="text-gray-400 text-xs">Gaming Hub</p>
                </div>
              </div>
              
              {/* Navigation Pills */}
              <div className="hidden md:flex items-center space-x-2 ml-6">
                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium border border-white/20 hover:border-white/40">
                  Store
                </button>
                <button className="text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium hover:bg-white/10">
                  History
                </button>
                <button className="text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium hover:bg-white/10">
                  Profile
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* User Avatar & Info */}
              <div className="hidden sm:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-white font-medium text-sm">{user.piUsername}</p>
                  <p className="text-gray-400 text-xs">{truncateAddress(user.piWalletAddress)}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20">
                  <span className="text-white text-sm font-bold">{user.piUsername.charAt(0).toUpperCase()}</span>
                </div>
              </div>
              
              {/* Sign Out Button */}
              <button
                onClick={logout}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 transition-all duration-300 p-2 sm:px-3 sm:py-2 rounded-lg border border-red-500/30 backdrop-blur-sm touch-manipulation flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:block text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-6 sm:py-8">
        {/* Hero Welcome Section */}
        <div className="relative mb-8 sm:mb-12">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-6 lg:space-y-0">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl font-bold">{user.piUsername.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
                      <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
                        {getTimeBasedGreeting()}
                      </span>
                      , <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-yellow-400 hover:via-orange-400 hover:to-red-400 transition-all duration-500">
                        {user.piUsername}
                      </span>
                      <span className="text-yellow-400 animate-bounce inline-block ml-2">!</span>
                    </h2>
                    <p className="text-gray-300 text-base sm:text-lg">
                      <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-semibold">
                        Ready to power up your gaming experience?
                      </span>
                      <span className="ml-2 text-yellow-400 animate-pulse">✨</span>
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Wallet Address</p>
                        <p className="text-white font-semibold">{truncateAddress(user.piWalletAddress)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Pi Network Price</p>
                        <p className="text-green-400 font-semibold">${piPrice?.toFixed(4) || 'Loading...'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testnet Notice - Improved */}
                <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-orange-200 font-semibold text-sm sm:text-base mb-1">Testnet Environment</h4>
                      <p className="text-orange-100 text-xs sm:text-sm leading-relaxed">
                        You're in a safe testing environment. Your mainnet Pi coins are protected - explore all features risk-free!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:ml-8">
                <div className="bg-black/40 rounded-2xl p-6 border border-white/20 backdrop-blur-sm">
                  <h3 className="text-white font-semibold mb-4 text-center">Profile Completion</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Basic Info</span>
                      <div className={`w-3 h-3 rounded-full ${user.email && user.country ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">PUBG Profile</span>
                      <div className={`w-3 h-3 rounded-full ${user.pubgProfile ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">MLBB Profile</span>
                      <div className={`w-3 h-3 rounded-full ${user.mlbbProfile ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    </div>
                    {(!user.email || !user.country || !user.pubgProfile || !user.mlbbProfile) && (
                      <button
                        onClick={() => setShowProfileForm(true)}
                        className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 px-4 rounded-lg transition-all duration-300 text-sm font-medium touch-manipulation"
                      >
                        Complete Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products Showcase */}
        <div className="mb-8 sm:mb-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Featured Gaming Products
            </h3>
            <p className="text-gray-300 text-lg">Power up your gameplay with instant top-ups</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {/* PUBG Mobile Section */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <img
                      src="https://cdn.midasbuy.com/images/apps/pubgm/1599546030876PIvqwGaa.png"
                      alt="PUBG Mobile"
                      className="w-12 h-12 rounded-xl object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white">PUBG Mobile UC</h4>
                    <p className="text-gray-300">Unknown Cash for battle royale</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {FEATURED_PACKAGES.filter(pkg => pkg.game === 'PUBG_MOBILE').map((pkg) => (
                    <div key={pkg.id} className="bg-black/30 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all cursor-pointer group/card"
                         onClick={() => handleProductClick(pkg)}>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">{pkg.amount}</div>
                        <div className="text-yellow-400 text-sm mb-2">UC</div>
                        <div className="text-gray-300 text-xs mb-3">{pkg.description}</div>
                        <div className="space-y-1">
                          <div className="text-green-400 font-semibold">${pkg.usdtPrice}</div>
                          <div className="text-yellow-300 text-xs">{calculatePiPrice(pkg.usdtPrice).toFixed(4)} Pi</div>
                        </div>
                        <button className="w-full mt-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 px-4 rounded-lg transition-all duration-300 text-sm font-medium opacity-0 group-hover/card:opacity-100 transform translate-y-2 group-hover/card:translate-y-0">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => setSelectedGame('PUBG_MOBILE')}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-6 rounded-xl transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  View All PUBG Packages
                </button>
              </div>
            </div>

            {/* Mobile Legends Section */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Image
                      src="https://b4uesports.com/wp-content/uploads/2025/04/1000077486.png"
                      alt="Mobile Legends"
                      width={48}
                      height={48}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white">Mobile Legends</h4>
                    <p className="text-gray-300">Diamonds for MOBA legends</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {FEATURED_PACKAGES.filter(pkg => pkg.game === 'MLBB').map((pkg) => (
                    <div key={pkg.id} className="bg-black/30 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all cursor-pointer group/card"
                         onClick={() => handleProductClick(pkg)}>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">{pkg.amount}</div>
                        <div className="text-pink-400 text-sm mb-2">Diamonds</div>
                        <div className="text-gray-300 text-xs mb-3">{pkg.description}</div>
                        <div className="space-y-1">
                          <div className="text-green-400 font-semibold">${pkg.usdtPrice}</div>
                          <div className="text-yellow-300 text-xs">{calculatePiPrice(pkg.usdtPrice).toFixed(4)} Pi</div>
                        </div>
                        <button className="w-full mt-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 px-4 rounded-lg transition-all duration-300 text-sm font-medium opacity-0 group-hover/card:opacity-100 transform translate-y-2 group-hover/card:translate-y-0">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => setSelectedGame('MLBB')}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-6 rounded-xl transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  View All MLBB Packages
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
              <div className="text-2xl font-bold text-white mb-1">24/7</div>
              <div className="text-gray-300 text-sm">Instant Delivery</div>
            </div>
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
              <div className="text-2xl font-bold text-white mb-1">100%</div>
              <div className="text-gray-300 text-sm">Secure Payments</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
              <div className="text-2xl font-bold text-white mb-1">1M+</div>
              <div className="text-gray-300 text-sm">Happy Gamers</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
              <div className="text-2xl font-bold text-white mb-1">5★</div>
              <div className="text-gray-300 text-sm">Customer Rating</div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Transaction History
            </h3>
            <button
              onClick={fetchTransactions}
              className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-black/20 rounded-2xl p-6 animate-pulse border border-white/10">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-600 rounded-xl"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-600 rounded w-1/3"></div>
                      <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                    </div>
                    <div className="w-20 h-6 bg-gray-600 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">No transactions yet</h4>
              <p className="text-gray-400 mb-6">
                Your purchase history will appear here once you make your first transaction.
              </p>
              <button
                onClick={() => setShowAllProducts(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 px-6 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Make Your First Purchase
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="bg-black/20 rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-black/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        transaction.package.game === 'PUBG_MOBILE' 
                          ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                          : 'bg-gradient-to-r from-purple-500 to-pink-500'
                      }`}>
                        {transaction.package.game === 'PUBG_MOBILE' ? (
                          <span className="text-white font-bold text-xs">UC</span>
                        ) : (
                          <span className="text-white font-bold text-xs">💎</span>
                        )}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-base sm:text-lg">
                          {transaction.package.name}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {formatDate(transaction.createdAt.toString())}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <span className="text-gray-400 block mb-1">Amount:</span>
                      <div className="text-white font-semibold">
                        {transaction.package.amount.toLocaleString()} {transaction.package.game === 'PUBG_MOBILE' ? 'UC' : 'Diamonds'}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <span className="text-gray-400 block mb-1">Pi Paid:</span>
                      <div className="text-yellow-400 font-semibold">{transaction.piAmount.toFixed(4)} Pi</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <span className="text-gray-400 block mb-1">USD Value:</span>
                      <div className="text-green-400 font-semibold">${transaction.usdtAmount.toFixed(2)}</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <span className="text-gray-400 block mb-1">Game ID:</span>
                      <div className="text-white font-semibold truncate">{transaction.gameUserId}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <UserProfileForm
        isOpen={showProfileForm}
        onClose={() => setShowProfileForm(false)}
        onComplete={() => setShowProfileForm(false)}
      />
      
      <PurchaseModal
        isOpen={showPurchaseModal}
        package={selectedPackage}
        onClose={() => setShowPurchaseModal(false)}
        onPurchaseComplete={() => {
          setShowPurchaseModal(false)
          fetchTransactions()
        }}
      />
    </div>
  )
}