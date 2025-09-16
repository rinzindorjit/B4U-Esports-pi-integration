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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserWithProfiles | null>(null)
  const [piAuth, setPiAuth] = useState<PiAuthResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing authentication on mount
    checkExistingAuth()
  }, [])

  const checkExistingAuth = async () => {
    try {
      const token = localStorage.getItem('pi_access_token')
      const userData = localStorage.getItem('user_data')
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setPiAuth({ accessToken: token, user: { uid: parsedUser.piUserId, username: parsedUser.piUsername } })
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

  const login = async () => {
    try {
      setIsLoading(true)
      
      // Authenticate with Pi Network
      let authResult: PiAuthResult
      
      try {
        authResult = await piNetworkService.authenticate()
      } catch (error) {
        // Fall back to mock authentication for development
        console.warn('Pi Network not available, using mock authentication')
        authResult = await piNetworkService.mockAuthenticate()
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
          accessToken: authResult.accessToken
        })
      })

      if (!response.ok) {
        throw new Error('Failed to authenticate with server')
      }

      const { user: userData } = await response.json()
      setUser(userData)

      // Store authentication data
      localStorage.setItem('pi_access_token', authResult.accessToken)
      localStorage.setItem('user_data', JSON.stringify(userData))

    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setPiAuth(null)
    localStorage.removeItem('pi_access_token')
    localStorage.removeItem('user_data')
  }

  const updateProfile = (data: Partial<UserWithProfiles>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem('user_data', JSON.stringify(updatedUser))
    }
  }

  const value: AuthContextType = {
    user,
    piAuth,
    isLoading,
    isAuthenticated: !!user && !!piAuth,
    login,
    logout,
    updateProfile
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