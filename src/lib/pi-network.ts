// Pi Network SDK Integration
// This module handles Pi Network authentication and payments

declare global {
  interface Window {
    Pi: {
      init: (config: PiConfig) => void
      authenticate: (scopes: string[], onIncompletePaymentFound?: (payment: any) => void) => Promise<PiAuthResult>
      createPayment: (paymentData: PiPaymentData, callbacks: PiPaymentCallbacks) => void
    }
  }
}

interface PiConfig {
  version: string
  sandbox?: boolean
}

interface PiAuthResult {
  accessToken: string
  user: {
    uid: string
    username: string
  }
}

interface PiPaymentData {
  amount: number
  memo: string
  metadata: {
    [key: string]: any
  }
}

interface PiPaymentCallbacks {
  onReadyForServerApproval: (paymentId: string) => void
  onReadyForServerCompletion: (paymentId: string, txid: string) => void
  onCancel: (paymentId: string) => void
  onError: (error: Error, payment?: any) => void
}

class PiNetworkService {
  private isInitialized = false
  private config: PiConfig = {
    version: "2.0",
    sandbox: process.env.NEXT_PUBLIC_PI_ENVIRONMENT === 'sandbox' // Use testnet for development
  }

  // Backend URL for Pi Network callbacks
  private backendUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    // Load Pi Network SDK
    await this.loadPiSDK()
    
    if (typeof window !== 'undefined' && window.Pi) {
      window.Pi.init(this.config)
      this.isInitialized = true
    } else {
      throw new Error('Pi Network SDK not available')
    }
  }

  private async loadPiSDK(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Pi SDK can only be loaded in browser environment'))
        return
      }

      // Check if Pi SDK is already loaded
      if (window.Pi) {
        resolve()
        return
      }

      // Load Pi SDK script
      const script = document.createElement('script')
      script.src = 'https://sdk.minepi.com/pi-sdk.js'
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load Pi SDK'))
      document.head.appendChild(script)
    })
  }

  async authenticate(): Promise<PiAuthResult> {
    // In production/Vercel environment, use mock authentication
    if (typeof window === 'undefined' || !window.location.hostname.includes('localhost')) {
      console.log('Production environment detected, using mock authentication')
      return this.mockAuthenticate()
    }

    if (!this.isInitialized) {
      try {
        await this.initialize()
      } catch (error) {
        console.warn('Pi SDK initialization failed, falling back to mock auth:', error)
        return this.mockAuthenticate()
      }
    }

    if (!window.Pi) {
      console.warn('Pi Network SDK not available, using mock authentication')
      return this.mockAuthenticate()
    }

    try {
      console.log('Attempting Pi Network authentication with scopes: username, payments')
      // Request authentication with required scopes
      const auth = await window.Pi.authenticate(
        ['username', 'payments'], 
        function onIncompletePaymentFound(payment: any) {
          console.log('Incomplete payment found:', payment)
          // Handle incomplete payments here
        }
      )

      console.log('Pi Network authentication successful:', auth)
      return auth
    } catch (error) {
      console.error('Pi authentication failed:', error)
      
      // More specific error handling
      if (error instanceof Error) {
        if (error.message.includes('cancelled')) {
          throw new Error('Authentication was cancelled by user')
        } else if (error.message.includes('network')) {
          throw new Error('Network error during authentication. Please check your connection.')
        } else {
          throw new Error(`Authentication failed: ${error.message}`)
        }
      }
      
      return this.mockAuthenticate()
    }
  }

  async createPayment(paymentData: PiPaymentData): Promise<string> {
    if (!this.isInitialized) {
      await this.initialize()
    }

    if (!window.Pi) {
      throw new Error('Pi Network SDK not initialized')
    }

    return new Promise((resolve, reject) => {
      const callbacks: PiPaymentCallbacks = {
        onReadyForServerApproval: (paymentId: string) => {
          console.log('Payment ready for server approval:', paymentId)
          this.handleServerApproval(paymentId)
        },
        onReadyForServerCompletion: (paymentId: string, txid: string) => {
          console.log('Payment ready for server completion:', paymentId, txid)
          this.handleServerCompletion(paymentId, txid)
          resolve(paymentId)
        },
        onCancel: (paymentId: string) => {
          console.log('Payment cancelled:', paymentId)
          reject(new Error('Payment was cancelled by user'))
        },
        onError: (error: Error, payment?: any) => {
          console.error('Payment error:', error, payment)
          reject(error)
        }
      }

      // Add additional metadata for better tracking and Pi Network compatibility
      const enhancedPaymentData = {
        ...paymentData,
        metadata: {
          ...paymentData.metadata,
          timestamp: Date.now(),
          platform: 'B4U-Esports',
          version: '1.0.0',
          // Pi Network required metadata for backend processing
          backendUrl: this.backendUrl,
          apiVersion: 'v1',
          environment: process.env.NEXT_PUBLIC_PI_ENVIRONMENT || 'development'
        }
      }

      console.log('Creating Pi payment with metadata:', enhancedPaymentData)

      window.Pi.createPayment(enhancedPaymentData, callbacks)
    })
  }

  private async handleServerApproval(paymentId: string): Promise<void> {
    try {
      console.log('Sending payment approval request for:', paymentId)
      const response = await fetch('/api/pi/approve-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paymentId })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Server approval failed:', response.status, errorText)
        throw new Error(`Server approval failed: ${response.status} - ${errorText}`)
      }
      
      const result = await response.json()
      console.log('Server approval successful:', result)
    } catch (error) {
      console.error('Server approval error:', error)
    }
  }

  private async handleServerCompletion(paymentId: string, txid: string): Promise<void> {
    try {
      console.log('Sending payment completion request for:', paymentId, txid)
      const response = await fetch('/api/pi/complete-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({ paymentId, txid })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Server completion failed:', response.status, errorText)
        throw new Error(`Server completion failed: ${response.status} - ${errorText}`)
      }
      
      const result = await response.json()
      console.log('Server completion successful:', result)
    } catch (error) {
      console.error('Server completion error:', error)
    }
  }

  // Mock functions for development (when Pi SDK is not available)
  async mockAuthenticate(): Promise<PiAuthResult> {
    console.log('Using mock Pi authentication')
    
    // Generate a consistent mock user instead of random ones
    const mockUser = { 
      uid: 'mock_user_12345', 
      username: 'demo_user' 
    }
    
    return {
      accessToken: `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user: mockUser
    }
  }

  async mockCreatePayment(paymentData: PiPaymentData): Promise<string> {
    console.log('Using mock Pi payment for development:', paymentData)
    
    // Simulate payment flow with delays
    const mockPaymentId = `mock_payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Simulate server approval
    setTimeout(() => {
      this.handleServerApproval(mockPaymentId)
    }, 1000)
    
    // Simulate server completion
    setTimeout(() => {
      const mockTxid = `mock_tx_${Date.now()}`
      this.handleServerCompletion(mockPaymentId, mockTxid)
    }, 3000)
    
    return mockPaymentId
  }
}

export const piNetworkService = new PiNetworkService()
export type { PiAuthResult, PiPaymentData }