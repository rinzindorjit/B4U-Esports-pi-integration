'use client'
import dynamic from 'next/dynamic'
import { useAuth } from '../../hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

// Dynamically import the AdminDashboard with no SSR
const AdminDashboard = dynamic(() => import('../../components/AdminDashboard'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Loading admin panel...</h2>
      </div>
    </div>
  )
})

export default function AdminPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // Simple admin check - in production this should be more robust
  const isAdmin = user?.piWalletAddress === 'GBP7PG27L3U4IQWFQGXNCHCGPJH3GVV72EEO4Q7RHFASMVR4TIA6J5F2' || 
                  user?.email === 'admin@b4uesports.com'

  useEffect(() => {
    // Redirect if not authenticated and not loading
    if (!isLoading && !user) {
      router.push('/dashboard')
      return
    }
    
    if (!isLoading && !isAdmin && user) {
      router.push('/dashboard')
      return
    }
  }, [user, isAdmin, router, isLoading])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Loading admin panel...</h2>
        </div>
      </div>
    )
  }

  // Show access denied if not admin
  if (!isAdmin && user) {
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

  return <AdminDashboard />
}