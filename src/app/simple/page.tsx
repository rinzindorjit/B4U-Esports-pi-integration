'use client'
import { useState, useEffect } from 'react'

export default function SimplePage() {
  const [status, setStatus] = useState('Loading...')
  
  useEffect(() => {
    // Check if we can access window and localStorage
    try {
      if (typeof window !== 'undefined') {
        setStatus('Window object is available')
        
        // Try to access localStorage
        try {
          localStorage.setItem('test', 'test')
          localStorage.removeItem('test')
          setStatus('Window and localStorage are accessible')
        } catch (e) {
          setStatus('Window available but localStorage not accessible')
        }
      } else {
        setStatus('Window object is not available')
      }
    } catch (error) {
      setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center">
      <div className="text-center text-white backdrop-blur-sm bg-white/10 p-8 rounded-2xl border border-white/20">
        <h1 className="text-3xl font-bold mb-4">Simple Test Page</h1>
        <p className="text-gray-300 mb-4">Status: {status}</p>
        <p className="text-gray-400 text-sm">If you can see this, Next.js is working but there might be an issue with the authentication flow.</p>
      </div>
    </div>
  )
}