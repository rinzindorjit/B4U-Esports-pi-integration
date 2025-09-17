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
  const [selectedGames, setSelectedGames] = useState<('PUBG_MOBILE' | 'MLBB')[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [profilePicture, setProfilePicture] = useState<string | null>(null)

  // Form data
  const [profileData, setProfileData] = useState<UserProfileData>({
    email: user?.email || '', // Use existing email if available
    contactNumber: user?.contactNumber || '',
    country: user?.country || 'BT', // Default to Bhutan
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

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfilePicture(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

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
    } else if (currentStep === 2 && selectedGames.length > 0) {
      // Move to the first selected game profile
      if (selectedGames.includes('PUBG_MOBILE')) {
        setCurrentStep(3) // PUBG profile step
      } else if (selectedGames.includes('MLBB')) {
        setCurrentStep(4) // MLBB profile step
      }
    } else if (currentStep === 3 && selectedGames.includes('MLBB')) {
      // If both games selected and coming from PUBG, go to MLBB
      setCurrentStep(4)
    }
  }

  const handleBack = () => {
    if (currentStep === 4 && selectedGames.includes('PUBG_MOBILE')) {
      // If both games selected and on MLBB step, go back to PUBG
      setCurrentStep(3)
    } else if (currentStep === 3 || currentStep === 4) {
      // From any game profile step, go back to game selection
      setCurrentStep(2)
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    let isValid = true
    
    // Validate selected game profiles
    if (selectedGames.includes('PUBG_MOBILE') && currentStep === 3) {
      isValid = validatePubg()
    } else if (selectedGames.includes('MLBB') && currentStep === 4) {
      isValid = validateMlbb()
    }

    if (!isValid) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/user/profile-static', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileData,
          pubgData: selectedGames.includes('PUBG_MOBILE') ? pubgData : null,
          mlbbData: selectedGames.includes('MLBB') ? mlbbData : null
        })
      })

      const result = await response.json()
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || result.message || 'Failed to update profile')
      }

      updateProfile(result.user)
      onComplete()
      onClose()

    } catch (error) {
      console.error('Profile update failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile. Please try again.'
      alert(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto mx-auto shadow-2xl border border-white/20">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {currentStep === 1 ? 'Basic Information' : 
               currentStep === 2 ? 'Game Selection' : 
               currentStep === 3 ? 'PUBG Mobile Profile' : 
               'MLBB Profile'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-red-500 text-2xl sm:text-3xl p-1 touch-manipulation transition-colors duration-300 hover:scale-110 transform">×</button>
          </div>

          {/* Progress */}
          <div className="mb-4 sm:mb-6">
            <div className="flex space-x-1 sm:space-x-2">
              {[1, 2, 3, 4].map((step) => {
                let isActive = step <= currentStep
                // Hide unused steps based on game selection
                if (step === 3 && !selectedGames.includes('PUBG_MOBILE')) isActive = false
                if (step === 4 && !selectedGames.includes('MLBB')) isActive = false
                
                return (
                  <div
                    key={step}
                    className={`flex-1 h-3 rounded-full transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    } ${
                      (step === 3 && !selectedGames.includes('PUBG_MOBILE')) || 
                      (step === 4 && !selectedGames.includes('MLBB')) 
                        ? 'opacity-30' : ''
                    }`}
                  />
                )
              })}
            </div>
            <div className="flex justify-between text-xs mt-2">
              <span className={`transition-colors duration-300 ${
                currentStep === 1 ? 'text-blue-600 font-semibold' : 'text-gray-500'
              }`}>
                Basic
              </span>
              <span className={`transition-colors duration-300 ${
                currentStep === 2 ? 'text-blue-600 font-semibold' : 'text-gray-500'
              }`}>
                Games
              </span>
              <span className={`transition-colors duration-300 ${
                currentStep === 3 && selectedGames.includes('PUBG_MOBILE') ? 'text-blue-600 font-semibold' : 
                currentStep === 3 && !selectedGames.includes('PUBG_MOBILE') ? 'text-gray-300' : 'text-gray-500'
              } ${!selectedGames.includes('PUBG_MOBILE') ? 'opacity-30' : ''}`}>
                PUBG
              </span>
              <span className={`transition-colors duration-300 ${
                currentStep === 4 && selectedGames.includes('MLBB') ? 'text-blue-600 font-semibold' : 
                currentStep === 4 && !selectedGames.includes('MLBB') ? 'text-gray-300' : 'text-gray-500'
              } ${!selectedGames.includes('MLBB') ? 'opacity-30' : ''}`}>
                MLBB
              </span>
            </div>
          </div>

          {/* Form Content */}
          <div className="mb-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                {/* Profile Picture Upload */}
                <div className="flex flex-col items-center mb-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center overflow-hidden">
                      {profilePicture ? (
                        <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                      ) : user?.piUsername ? (
                        <span className="text-white text-2xl font-bold">
                          {user.piUsername.charAt(0).toUpperCase()}
                        </span>
                      ) : (
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleProfilePictureChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Upload profile picture</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input
                    type="tel"
                    value={profileData.contactNumber}
                    onChange={(e) => setProfileData({...profileData, contactNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1234567890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <select
                    value={profileData.country}
                    onChange={(e) => setProfileData({...profileData, country: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.country ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  >
                    <option value="">Select your country</option>
                    <option value="BT">🇧🇹 Bhutan</option>
                    <option value="US">🇺🇸 United States</option>
                    <option value="GB">🇬🇧 United Kingdom</option>
                    <option value="IN">🇮🇳 India</option>
                    <option value="CA">🇨🇦 Canada</option>
                    <option value="AU">🇦🇺 Australia</option>
                    <option value="DE">🇩🇪 Germany</option>
                    <option value="FR">🇫🇷 France</option>
                    <option value="JP">🇯🇵 Japan</option>
                    <option value="KR">🇰🇷 South Korea</option>
                    {/* Add more countries as needed */}
                  </select>
                  {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Referral Code</label>
                  <input
                    type="text"
                    value={profileData.referralCode}
                    onChange={(e) => setProfileData({...profileData, referralCode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter referral code (if any)"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Select Your Games</h3>
                  <p className="text-gray-600 text-sm mb-6 text-center">
                    Choose the games you play to set up your profiles
                  </p>
                  
                  <div className="space-y-4">
                    <div 
                      onClick={() => setSelectedGames(
                        selectedGames.includes('PUBG_MOBILE') 
                          ? selectedGames.filter(g => g !== 'PUBG_MOBILE')
                          : [...selectedGames, 'PUBG_MOBILE']
                      )}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        selectedGames.includes('PUBG_MOBILE')
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                          selectedGames.includes('PUBG_MOBILE')
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedGames.includes('PUBG_MOBILE') && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div className="flex items-center">
                          <img
                            src="https://cdn.midasbuy.com/images/pubgm_app-icon_512x512%281%29.e9f7efc0.png"
                            alt="PUBG Mobile"
                            className="w-10 h-10 rounded-lg mr-3"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">PUBG Mobile</h4>
                            <p className="text-sm text-gray-500">Unknown Cash (UC)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div 
                      onClick={() => setSelectedGames(
                        selectedGames.includes('MLBB') 
                          ? selectedGames.filter(g => g !== 'MLBB')
                          : [...selectedGames, 'MLBB']
                      )}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        selectedGames.includes('MLBB')
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                          selectedGames.includes('MLBB')
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedGames.includes('MLBB') && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3">
                            <span className="text-white font-bold text-xs">MLBB</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Mobile Legends</h4>
                            <p className="text-sm text-gray-500">Diamonds</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedGames.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 text-sm">
                      You've selected {selectedGames.length} game{selectedGames.length > 1 ? 's' : ''}. 
                      You'll set up profiles for each selected game in the next steps.
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && selectedGames.includes('PUBG_MOBILE') && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <img
                    src="https://cdn.midasbuy.com/images/pubgm_app-icon_512x512%281%29.e9f7efc0.png"
                    alt="PUBG Mobile"
                    className="w-16 h-16 rounded-xl mx-auto mb-3"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">PUBG Mobile Profile</h3>
                  <p className="text-gray-600 text-sm">Enter your PUBG Mobile account details</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">In-Game Name (IGN) *</label>
                  <input
                    type="text"
                    value={pubgData.ign}
                    onChange={(e) => setPubgData({...pubgData, ign: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.pubgIgn ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Your PUBG Mobile in-game name"
                  />
                  {errors.pubgIgn && <p className="text-red-500 text-xs mt-1">{errors.pubgIgn}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User ID (UID) *</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={pubgData.uid}
                    onChange={(e) => setPubgData({...pubgData, uid: e.target.value.replace(/[^0-9]/g, '')})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.pubgUid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Your PUBG Mobile UID"
                  />
                  {errors.pubgUid && <p className="text-red-500 text-xs mt-1">{errors.pubgUid}</p>}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-xs">
                    <strong>Note:</strong> Your UID can be found in the settings menu of PUBG Mobile under "Account".
                  </p>
                </div>
              </div>
            )}

            {currentStep === 4 && selectedGames.includes('MLBB') && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">MLBB</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Mobile Legends Profile</h3>
                  <p className="text-gray-600 text-sm">Enter your Mobile Legends account details</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User ID *</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={mlbbData.userId_game}
                    onChange={(e) => setMlbbData({...mlbbData, userId_game: e.target.value.replace(/[^0-9]/g, '')})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.mlbbUserId ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Your Mobile Legends User ID"
                  />
                  {errors.mlbbUserId && <p className="text-red-500 text-xs mt-1">{errors.mlbbUserId}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zone ID *</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={mlbbData.zoneId}
                    onChange={(e) => setMlbbData({...mlbbData, zoneId: e.target.value.replace(/[^0-9]/g, '')})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.mlbbZoneId ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    placeholder="Your Mobile Legends Zone ID"
                  />
                  {errors.mlbbZoneId && <p className="text-red-500 text-xs mt-1">{errors.mlbbZoneId}</p>}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-xs">
                    <strong>Note:</strong> Both User ID and Zone ID can be found in the settings menu of Mobile Legends.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              Back
            </button>

            {currentStep < 4 && (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                Next
              </button>
            )}

            {((currentStep === 3 && !selectedGames.includes('MLBB')) || 
              (currentStep === 4 && selectedGames.includes('MLBB'))) && (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  isLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
                }`}
              >
                {isLoading ? 'Saving...' : 'Save Profile'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}