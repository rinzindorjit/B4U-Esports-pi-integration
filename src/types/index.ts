// Type definitions for the B4U Esports application

// Enums
export type GameType = 'PUBG_MOBILE' | 'MLBB'
export type TransactionStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'REFUNDED'
export type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR'

// Core types
export interface User {
  id: string
  piUserId: string
  piUsername: string
  piWalletAddress: string
  email: string
  contactNumber?: string
  country?: string
  language: string
  referralCode?: string
  isActive: boolean
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Package {
  id: string
  name: string
  game: GameType
  description?: string
  amount: number
  usdtPrice: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Transaction {
  id: string
  userId: string
  packageId: string
  piAmount: number
  usdtAmount: number
  piPriceSnapshot: number
  status: TransactionStatus
  piTransactionId?: string
  gameUserId: string
  gameZoneId?: string
  errorMessage?: string
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
}

export interface PubgProfile {
  id: string
  userId: string
  ign: string
  uid: string
  createdAt: Date
  updatedAt: Date
}

export interface MlbbProfile {
  id: string
  userId: string
  userId_game: string
  zoneId: string
  createdAt: Date
  updatedAt: Date
}

// Extended user type with profiles
export type UserWithProfiles = User & {
  pubgProfile?: PubgProfile | null
  mlbbProfile?: MlbbProfile | null
  transactions?: Transaction[]
}
export type TransactionWithPackage = Transaction & {
  package: Package
  user: User
}

// Pi Network user data
export interface PiUser {
  uid: string
  username: string
  walletAddress: string
}

// Pi Network payment data
export interface PiPayment {
  amount: number
  memo: string
  metadata: {
    userId: string
    packageId: string
    gameUserId: string
    gameZoneId?: string
  }
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Pi price data
export interface PiPriceData {
  'pi-network': {
    usd: number
  }
}

// Form data types
export interface UserProfileData {
  email: string
  contactNumber?: string
  country?: string
  language: string
  referralCode?: string
}

export interface PubgProfileData {
  ign: string
  uid: string
}

export interface MlbbProfileData {
  userId_game: string
  zoneId: string
}

// Purchase data
export interface PurchaseData {
  packageId: string
  gameUserId: string
  gameZoneId?: string
}