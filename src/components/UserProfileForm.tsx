'use client'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { UserProfileData, PubgProfileData, MlbbProfileData } from '../types'

interface UserProfileFormProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export default function UserProfileForm({ isOpen, onClose, onComplete }: UserProfileFormProps) {
  const { user, updateProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Form data
  const [profileData, setProfileData] = useState<UserProfileData>({
    email: user?.email || '',
    contactNumber: user?.contactNumber || '',
    country: user?.country || '',
    language: user?.language || 'en',
    referralCode: user?.referralCode || ''
  })

  const [pubgData, setPubgData] = useState<PubgProfileData>({
    ign: user?.pubgProfile?.ign || '',
    uid: user?.pubgProfile?.uid || ''
  })

  const [mlbbData, setMlbbData] = useState<MlbbProfileData>({
    userId_game: user?.mlbbProfile?.userId_game || '',
    zoneId: user?.mlbbProfile?.zoneId || ''
  })

  if (!isOpen) return null

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    
    if (!profileData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!profileData.country) {
      newErrors.country = 'Country is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePubg = () => {
    const newErrors: Record<string, string> = {}
    
    if (!pubgData.ign.trim()) {
      newErrors.pubgIgn = 'IGN (In-Game Name) is required'
    }
    
    if (!pubgData.uid.trim()) {
      newErrors.pubgUid = 'UID is required'
    } else if (!/^\d+$/.test(pubgData.uid)) {
      newErrors.pubgUid = 'UID must contain only numbers'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateMlbb = () => {
    const newErrors: Record<string, string> = {}
    
    if (!mlbbData.userId_game.trim()) {
      newErrors.mlbbUserId = 'User ID is required'
    } else if (!/^\d+$/.test(mlbbData.userId_game)) {
      newErrors.mlbbUserId = 'User ID must contain only numbers'
    }
    
    if (!mlbbData.zoneId.trim()) {
      newErrors.mlbbZoneId = 'Zone ID is required'
    } else if (!/^\d+$/.test(mlbbData.zoneId)) {
      newErrors.mlbbZoneId = 'Zone ID must contain only numbers'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    } else if (currentStep === 2) {
      setCurrentStep(3)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    let isValid = true
    
    if (currentStep === 2) {
      isValid = validatePubg()
    } else if (currentStep === 3) {
      isValid = validateMlbb()
    }

    if (!isValid) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileData,
          pubgData: currentStep >= 2 ? pubgData : null,
          mlbbData: currentStep >= 3 ? mlbbData : null
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      const result = await response.json()
      updateProfile(result.user)
      onComplete()
      onClose()

    } catch (error) {
      console.error('Profile update failed:', error)
      alert('Failed to update profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto mx-auto">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Complete Your Profile</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl sm:text-3xl p-1 touch-manipulation">×</button>
          </div>

          {/* Progress */}
          <div className="mb-4 sm:mb-6">
            <div className="flex space-x-1 sm:space-x-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`flex-1 h-2 rounded ${
                    step <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Basic Info</span>
              <span>PUBG Profile</span>
              <span>MLBB Profile</span>
            </div>
          </div>

          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="w-full px-3 py-2.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base touch-manipulation"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={profileData.contactNumber}
                  onChange={(e) => setProfileData({...profileData, contactNumber: e.target.value})}
                  className="w-full px-3 py-2.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base touch-manipulation"
                  placeholder="+1234567890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <select
                  value={profileData.country}
                  onChange={(e) => setProfileData({...profileData, country: e.target.value})}
                  className="w-full px-3 py-2.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base touch-manipulation"
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                  <option value="KR">South Korea</option>
                  <option value="CN">China</option>
                  <option value="IN">India</option>
                  <option value="BR">Brazil</option>
                  <option value="MX">Mexico</option>
                  <option value="AU">Australia</option>
                  <option value="PH">Philippines</option>
                  <option value="TH">Thailand</option>
                  <option value="VN">Vietnam</option>
                  <option value="ID">Indonesia</option>
                  <option value="MY">Malaysia</option>
                  <option value="SG">Singapore</option>
                </select>
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Referral Code (Optional)
                </label>
                <input
                  type="text"
                  value={profileData.referralCode}
                  onChange={(e) => setProfileData({...profileData, referralCode: e.target.value})}
                  className="w-full px-3 py-2.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base touch-manipulation"
                  placeholder="Enter referral code"
                />
              </div>
            </div>
          )}

          {/* Step 2: PUBG Profile */}
          {currentStep === 2 && (
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">PUBG Mobile Profile</h3>
              <p className="text-sm text-gray-600 mb-3 sm:mb-4">
                Add your PUBG Mobile details to purchase UC packages
              </p>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  IGN (In-Game Name) *
                </label>
                <input
                  type="text"
                  value={pubgData.ign}
                  onChange={(e) => setPubgData({...pubgData, ign: e.target.value})}
                  className="w-full px-3 py-2.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base touch-manipulation"
                  placeholder="Your PUBG Mobile username"
                />
                {errors.pubgIgn && <p className="text-red-500 text-sm mt-1">{errors.pubgIgn}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  UID (User ID) *
                </label>
                <input
                  type="text"
                  value={pubgData.uid}
                  onChange={(e) => setPubgData({...pubgData, uid: e.target.value.replace(/\D/g, '')})}
                  className="w-full px-3 py-2.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base touch-manipulation"
                  placeholder="123456789"
                />
                {errors.pubgUid && <p className="text-red-500 text-sm mt-1">{errors.pubgUid}</p>}
                <p className="text-xs text-gray-500 mt-1">
                  Find your UID in PUBG Mobile settings
                </p>
              </div>
            </div>
          )}

          {/* Step 3: MLBB Profile */}
          {currentStep === 3 && (
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">Mobile Legends Profile</h3>
              <p className="text-sm text-gray-600 mb-3 sm:mb-4">
                Add your Mobile Legends details to purchase Diamond packages
              </p>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User ID *
                </label>
                <input
                  type="text"
                  value={mlbbData.userId_game}
                  onChange={(e) => setMlbbData({...mlbbData, userId_game: e.target.value.replace(/\D/g, '')})}
                  className="w-full px-3 py-2.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base touch-manipulation"
                  placeholder="123456789"
                />
                {errors.mlbbUserId && <p className="text-red-500 text-sm mt-1">{errors.mlbbUserId}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zone ID *
                </label>
                <input
                  type="text"
                  value={mlbbData.zoneId}
                  onChange={(e) => setMlbbData({...mlbbData, zoneId: e.target.value.replace(/\D/g, '')})}
                  className="w-full px-3 py-2.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base touch-manipulation"
                  placeholder="1234"
                />
                {errors.mlbbZoneId && <p className="text-red-500 text-sm mt-1">{errors.mlbbZoneId}</p>}
                <p className="text-xs text-gray-500 mt-1">
                  Find User ID and Zone ID in Mobile Legends profile
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2 sm:space-x-3 mt-4 sm:mt-6">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="flex-1 px-3 py-2.5 sm:px-4 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm sm:text-base touch-manipulation active:scale-95"
              >
                Back
              </button>
            )}
            
            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="flex-1 px-3 py-2.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base touch-manipulation active:scale-95"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 px-3 py-2.5 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm sm:text-base touch-manipulation active:scale-95"
              >
                {isLoading ? 'Saving...' : 'Complete Profile'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}