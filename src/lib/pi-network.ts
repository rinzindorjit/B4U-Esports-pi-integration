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
    sandbox: true // Use testnet for development
  }

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
    if (!this.isInitialized) {
      await this.initialize()
    }

    if (!window.Pi) {
      throw new Error('Pi Network SDK not initialized')
    }

    try {
      // Request authentication with required scopes
      const auth = await window.Pi.authenticate(
        ['username', 'payments'], 
        function onIncompletePaymentFound(payment: any) {
          console.log('Incomplete payment found:', payment)
          // Handle incomplete payments here
        }
      )

      return auth
    } catch (error) {
      console.error('Pi authentication failed:', error)
      throw new Error('Failed to authenticate with Pi Network')
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

      // Add additional metadata for better tracking
      const enhancedPaymentData = {
        ...paymentData,
        metadata: {
          ...paymentData.metadata,
          timestamp: Date.now(),
          platform: 'B4U-Esports',
          version: '1.0.0'
        }
      }

      window.Pi.createPayment(enhancedPaymentData, callbacks)
    })
  }

  private async handleServerApproval(paymentId: string): Promise<void> {
    try {
      const response = await fetch('/api/pi/approve-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paymentId })
      })

      if (!response.ok) {
        throw new Error('Server approval failed')
      }
    } catch (error) {
      console.error('Server approval error:', error)
    }
  }

  private async handleServerCompletion(paymentId: string, txid: string): Promise<void> {
    try {
      const response = await fetch('/api/pi/complete-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paymentId, txid })
      })

      if (!response.ok) {
        throw new Error('Server completion failed')
      }
    } catch (error) {
      console.error('Server completion error:', error)
    }
  }

  // Mock functions for development (when Pi SDK is not available)
  async mockAuthenticate(): Promise<PiAuthResult> {
    console.log('Using mock Pi authentication for development')
    return {
      accessToken: 'mock_access_token',
      user: {
        uid: 'mock_user_id',
        username: 'testuser'
      }
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