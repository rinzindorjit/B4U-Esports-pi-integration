'use client'
import { useState, useEffect } from 'react'
import { piNetworkService } from '../../lib/pi-network'

export default function PiNetworkTest() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [authResult, setAuthResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if Pi Network SDK is available
    if (typeof window !== 'undefined' && window.Pi) {
      setIsInitialized(true)
    }
  }, [])

  const handleInitialize = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await piNetworkService.initialize()
      setIsInitialized(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize Pi Network SDK')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAuthenticate = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await piNetworkService.authenticate()
      setAuthResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to authenticate with Pi Network')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMockPayment = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const mockPaymentData = {
        amount: 1.5,
        memo: 'Test payment',
        metadata: {
          test: true,
          timestamp: Date.now(),
          backendUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        }
      }
      
      const paymentId = await piNetworkService.mockCreatePayment(mockPaymentData)
      console.log('Mock payment created:', paymentId)
      alert(`Mock payment created successfully!\nPayment ID: ${paymentId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create mock payment')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Pi Network Integration Test</h1>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Integration Status</h2>
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${isInitialized ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-gray-600">
                {isInitialized ? 'Pi Network SDK Initialized' : 'Pi Network SDK Not Initialized'}
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-sm font-medium text-red-800 mb-2">Error</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={handleInitialize}
              disabled={isInitialized || isLoading}
              className={`px-4 py-2 rounded-md font-medium ${
                isInitialized || isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Initializing...' : 'Initialize SDK'}
            </button>

            <button
              onClick={handleAuthenticate}
              disabled={!isInitialized || isLoading}
              className={`px-4 py-2 rounded-md font-medium ${
                !isInitialized || isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isLoading ? 'Authenticating...' : 'Authenticate'}
            </button>

            <button
              onClick={handleMockPayment}
              disabled={isLoading}
              className={`px-4 py-2 rounded-md font-medium ${
                isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {isLoading ? 'Creating...' : 'Test Mock Payment'}
            </button>
          </div>

          {authResult && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-sm font-medium text-green-800 mb-2">Authentication Result</h3>
              <pre className="text-xs text-green-700 bg-green-100 p-2 rounded overflow-x-auto">
                {JSON.stringify(authResult, null, 2)}
              </pre>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-800 mb-2">Testing Instructions</h3>
            <ul className="text-xs text-gray-600 list-disc pl-5 space-y-1">
              <li>Click "Initialize SDK" to load the Pi Network SDK</li>
              <li>Click "Authenticate" to test Pi Network authentication</li>
              <li>Click "Test Mock Payment" to simulate a payment flow</li>
              <li>Check browser console for detailed logs</li>
              <li>In production, real Pi Network payments will be used instead of mock payments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}