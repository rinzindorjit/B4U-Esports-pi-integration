'use client'
import { useState, useEffect } from 'react'
import { TransactionWithPackage } from '../types'

interface TransactionStatusProps {
  transactionId: string
  onStatusChange?: (status: string) => void
}

export default function TransactionStatus({ transactionId, onStatusChange }: TransactionStatusProps) {
  const [transaction, setTransaction] = useState<TransactionWithPackage | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout

    const fetchTransactionStatus = async () => {
      try {
        const response = await fetch(`/api/transactions/${transactionId}`)
        if (response.ok) {
          const result = await response.json()
          setTransaction(result.data)
          
          if (onStatusChange) {
            onStatusChange(result.data.status)
          }
          
          // Stop polling if transaction is completed or failed
          if (['COMPLETED', 'FAILED', 'CANCELLED'].includes(result.data.status)) {
            if (interval) clearInterval(interval)
          }
        }
      } catch (error) {
        console.error('Failed to fetch transaction status:', error)
      } finally {
        setIsLoading(false)
      }
    }

    // Initial fetch
    fetchTransactionStatus()

    // Poll every 3 seconds for status updates
    interval = setInterval(fetchTransactionStatus, 3000)

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [transactionId, onStatusChange])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return '⏳'
      case 'PROCESSING':
        return '🔄'
      case 'COMPLETED':
        return '✅'
      case 'FAILED':
        return '❌'
      case 'CANCELLED':
        return '🚫'
      default:
        return '❓'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600'
      case 'PENDING':
        return 'text-yellow-600'
      case 'PROCESSING':
        return 'text-blue-600'
      case 'FAILED':
        return 'text-red-600'
      case 'CANCELLED':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Waiting for payment confirmation...'
      case 'PROCESSING':
        return 'Processing payment and delivering currency...'
      case 'COMPLETED':
        return 'Payment completed! Currency has been delivered.'
      case 'FAILED':
        return 'Payment failed. Please try again.'
      case 'CANCELLED':
        return 'Payment was cancelled.'
      default:
        return 'Unknown status'
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
        <span className="text-gray-600">Loading transaction status...</span>
      </div>
    )
  }

  if (!transaction) {
    return (
      <div className="text-red-600">
        Transaction not found
      </div>
    )
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center space-x-3 mb-2">
        <span className="text-2xl">{getStatusIcon(transaction.status)}</span>
        <div>
          <div className={`font-semibold ${getStatusColor(transaction.status)}`}>
            {transaction.status}
          </div>
          <div className="text-sm text-gray-600">
            {getStatusMessage(transaction.status)}
          </div>
        </div>
      </div>
      
      <div className="border-t pt-2 mt-2 text-sm text-gray-600">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="font-medium">Package:</span> {transaction.package.name}
          </div>
          <div>
            <span className="font-medium">Amount:</span> {transaction.piAmount.toFixed(4)} Pi
          </div>
          <div>
            <span className="font-medium">Game ID:</span> {transaction.gameUserId}
          </div>
          <div>
            <span className="font-medium">Created:</span> {new Date(transaction.createdAt).toLocaleTimeString()}
          </div>
        </div>
        
        {transaction.piTransactionId && (
          <div className="mt-2">
            <span className="font-medium">Pi Transaction ID:</span> 
            <span className="font-mono text-xs ml-1">{transaction.piTransactionId}</span>
          </div>
        )}
        
        {transaction.errorMessage && (
          <div className="mt-2 text-red-600">
            <span className="font-medium">Error:</span> {transaction.errorMessage}
          </div>
        )}
      </div>
    </div>
  )
}