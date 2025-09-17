'use client'
import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { piNetworkService, PiAuthResult } from '../lib/pi-network'
import { UserWithProfiles } from '../types'

interface AuthContextType {
  user: UserWithProfiles | null
  piAuth: PiAuthResult | null
  isLoading: boolean
  isAuthenticated: boolean
  login: () => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<UserWithProfiles>) => void
  refreshUserData: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserWithProfiles | null>(null)
  const [piAuth, setPiAuth] = useState<PiAuthResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Check for existing authentication on mount
    checkExistingAuth()
  }, [])

  const checkExistingAuth = async () => {
    // Only run on client-side
    if (typeof window === 'undefined') {
      setIsLoading(false)
      return
    }
    
    try {
      const token = localStorage.getItem('pi_access_token')
      const userData = localStorage.getItem('user_data')
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setPiAuth({ accessToken: token, user: { uid: parsedUser.piUserId, username: parsedUser.piUsername, walletAddress: parsedUser.piWalletAddress } })
        
        // Fetch updated user profile from static API
        try {
          await refreshUserData()
        } catch (error) {
          console.error('Error fetching updated profile:', error)
        }
      }
    } catch (error) {
      console.error('Error checking existing auth:', error)
      // Clear corrupted data
      localStorage.removeItem('pi_access_token')
      localStorage.removeItem('user_data')
    } finally {
      setIsLoading(false)
    }
  }

  const refreshUserData = async () => {
    // Only run on client-side
    if (typeof window === 'undefined') return
    
    try {
      const response = await fetch('/api/user/profile-static')
      if (response.ok) {
        const result = await response.json()
        if (result.success && result.user) {
          setUser(result.user)
          localStorage.setItem('user_data', JSON.stringify(result.user))
        }
      }
    } catch (error) {
      console.error('Error refreshing user data:', error)
    }
  }

  const login = async () => {
    // Only run on client-side
    if (typeof window === 'undefined') return
    
    try {
      setIsLoading(true)
      
      // Authenticate with Pi Network
      let authResult: PiAuthResult
      
      try {
        authResult = await piNetworkService.authenticate()
        console.log('Pi Network authentication successful')
      } catch (error) {
        // Handle specific authentication errors
        console.error('Pi Network authentication error:', error)
        const errorMessage = error instanceof Error ? error.message : 'Unknown authentication error'
        
        // Show user-friendly error message
        if (errorMessage.includes('cancelled')) {
          throw new Error('Authentication was cancelled. Please try again and complete the authentication process.')
        } else if (errorMessage.includes('Network') || errorMessage.includes('network')) {
          throw new Error('Network connection issue. Please check your internet connection and try again.')
        } else {
          // Fall back to mock authentication for development/production without Pi SDK
          console.warn('Pi Network not available, using mock authentication:', error)
          authResult = await piNetworkService.mockAuthenticate()
        }
      }

      setPiAuth(authResult)

      // Create or get user from our database
      const response = await fetch('/api/auth/pi-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          piUserId: authResult.user.uid,
          piUsername: authResult.user.username,
          piWalletAddress: authResult.user.walletAddress, // Include wallet address
          accessToken: authResult.accessToken
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Server authentication failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        })
        throw new Error(`Server authentication failed: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      if (!result.success) {
        throw new Error(result.error || 'Authentication failed')
      }

      const { user: userData } = result
      setUser(userData)

      // Store authentication data
      localStorage.setItem('pi_access_token', authResult.accessToken)
      localStorage.setItem('user_data', JSON.stringify(userData))

      console.log('Authentication successful for user:', userData.piUsername)

    } catch (error) {
      console.error('Login failed:', error)
      // Clear any partial authentication state
      setPiAuth(null)
      setUser(null)
      localStorage.removeItem('pi_access_token')
      localStorage.removeItem('user_data')
      
      // Re-throw error for UI to handle
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setPiAuth(null)
    // Only run on client-side
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pi_access_token')
      localStorage.removeItem('user_data')
      // Redirect to home page
      window.location.href = '/'
    }
  }

  const updateProfile = (data: Partial<UserWithProfiles>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      // Only run on client-side
      if (typeof window !== 'undefined') {
        localStorage.setItem('user_data', JSON.stringify(updatedUser))
      }
    }
  }

  const value: AuthContextType = {
    user,
    piAuth,
    isLoading,
    isAuthenticated: !!user && !!piAuth,
    login,
    logout,
    updateProfile,
    refreshUserData
  }

  // Don't render children until we know if we're on the client
  if (!isClient) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}