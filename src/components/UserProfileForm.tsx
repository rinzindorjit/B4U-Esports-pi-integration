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

  // Form data
  const [profileData, setProfileData] = useState<UserProfileData>({
    email: '', // Leave email blank for users to fill
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
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileData,
          pubgData: selectedGames.includes('PUBG_MOBILE') ? pubgData : null,
          mlbbData: selectedGames.includes('MLBB') ? mlbbData : null
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
      <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto mx-auto shadow-2xl border border-white/20">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Complete Your Profile</h2>
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
                currentStep >= 1 ? 'text-blue-600 font-semibold' : 'text-gray-500'
              }`}>Basic Info</span>
              <span className={`transition-colors duration-300 ${
                currentStep >= 2 ? 'text-purple-600 font-semibold' : 'text-gray-500'
              }`}>Select Games</span>
              <span className={`transition-colors duration-300 ${
                currentStep >= 3 && selectedGames.includes('PUBG_MOBILE') ? 'text-orange-600 font-semibold' : 'text-gray-500'
              } ${!selectedGames.includes('PUBG_MOBILE') ? 'opacity-50' : ''}`}>PUBG Profile</span>
              <span className={`transition-colors duration-300 ${
                currentStep >= 4 && selectedGames.includes('MLBB') ? 'text-pink-600 font-semibold' : 'text-gray-500'
              } ${!selectedGames.includes('MLBB') ? 'opacity-50' : ''}`}>MLBB Profile</span>
            </div>
          </div>

          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="w-full px-3 py-2.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base touch-manipulation bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300"
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
                  className="w-full px-3 py-2.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base touch-manipulation bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 transition-all duration-300"
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
                  className="w-full px-3 py-2.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base touch-manipulation bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300"
                >
                  <option value="">Select Country</option>
                  <option value="BT">🇧🇹 Bhutan</option>
                  <option value="AF">🇦🇫 Afghanistan</option>
                  <option value="AL">🇦🇱 Albania</option>
                  <option value="DZ">🇩🇿 Algeria</option>
                  <option value="AS">🇦🇸 American Samoa</option>
                  <option value="AD">🇦🇩 Andorra</option>
                  <option value="AO">🇦🇴 Angola</option>
                  <option value="AI">🇦🇮 Anguilla</option>
                  <option value="AQ">🇦🇶 Antarctica</option>
                  <option value="AG">🇦🇬 Antigua and Barbuda</option>
                  <option value="AR">🇦🇷 Argentina</option>
                  <option value="AM">🇦🇲 Armenia</option>
                  <option value="AW">🇦🇼 Aruba</option>
                  <option value="AU">🇦🇺 Australia</option>
                  <option value="AT">🇦🇹 Austria</option>
                  <option value="AZ">🇦🇿 Azerbaijan</option>
                  <option value="BS">🇧🇸 Bahamas</option>
                  <option value="BH">🇧🇭 Bahrain</option>
                  <option value="BD">🇧🇩 Bangladesh</option>
                  <option value="BB">🇧🇧 Barbados</option>
                  <option value="BY">🇧🇾 Belarus</option>
                  <option value="BE">🇧🇪 Belgium</option>
                  <option value="BZ">🇧🇿 Belize</option>
                  <option value="BJ">🇧🇯 Benin</option>
                  <option value="BM">🇧🇲 Bermuda</option>
                  <option value="BO">🇧🇴 Bolivia</option>
                  <option value="BA">🇧🇦 Bosnia and Herzegovina</option>
                  <option value="BW">🇧🇼 Botswana</option>
                  <option value="BR">🇧🇷 Brazil</option>
                  <option value="BN">🇧🇳 Brunei</option>
                  <option value="BG">🇧🇬 Bulgaria</option>
                  <option value="BF">🇧🇫 Burkina Faso</option>
                  <option value="BI">🇧🇮 Burundi</option>
                  <option value="CV">🇨🇻 Cape Verde</option>
                  <option value="KH">🇰🇭 Cambodia</option>
                  <option value="CM">🇨🇲 Cameroon</option>
                  <option value="CA">🇨🇦 Canada</option>
                  <option value="KY">🇰🇾 Cayman Islands</option>
                  <option value="CF">🇨🇫 Central African Republic</option>
                  <option value="TD">🇹🇩 Chad</option>
                  <option value="CL">🇨🇱 Chile</option>
                  <option value="CN">🇨🇳 China</option>
                  <option value="CO">🇨🇴 Colombia</option>
                  <option value="KM">🇰🇲 Comoros</option>
                  <option value="CG">🇨🇬 Congo</option>
                  <option value="CD">🇨🇩 Congo (Democratic Republic)</option>
                  <option value="CK">🇨🇰 Cook Islands</option>
                  <option value="CR">🇨🇷 Costa Rica</option>
                  <option value="CI">🇨🇮 Côte d'Ivoire</option>
                  <option value="HR">🇭🇷 Croatia</option>
                  <option value="CU">🇨🇺 Cuba</option>
                  <option value="CW">🇨🇼 Curaçao</option>
                  <option value="CY">🇨🇾 Cyprus</option>
                  <option value="CZ">🇨🇿 Czech Republic</option>
                  <option value="DK">🇩🇰 Denmark</option>
                  <option value="DJ">🇩🇯 Djibouti</option>
                  <option value="DM">🇩🇲 Dominica</option>
                  <option value="DO">🇩🇴 Dominican Republic</option>
                  <option value="EC">🇪🇨 Ecuador</option>
                  <option value="EG">🇪🇬 Egypt</option>
                  <option value="SV">🇸🇻 El Salvador</option>
                  <option value="GQ">🇬🇶 Equatorial Guinea</option>
                  <option value="ER">🇪🇷 Eritrea</option>
                  <option value="EE">🇪🇪 Estonia</option>
                  <option value="SZ">🇸🇿 Eswatini</option>
                  <option value="ET">🇪🇹 Ethiopia</option>
                  <option value="FK">🇫🇰 Falkland Islands</option>
                  <option value="FO">🇫🇴 Faroe Islands</option>
                  <option value="FJ">🇫🇯 Fiji</option>
                  <option value="FI">🇫🇮 Finland</option>
                  <option value="FR">🇫🇷 France</option>
                  <option value="GF">🇬🇫 French Guiana</option>
                  <option value="PF">🇵🇫 French Polynesia</option>
                  <option value="GA">🇬🇦 Gabon</option>
                  <option value="GM">🇬🇲 Gambia</option>
                  <option value="GE">🇬🇪 Georgia</option>
                  <option value="DE">🇩🇪 Germany</option>
                  <option value="GH">🇬🇭 Ghana</option>
                  <option value="GI">🇬🇮 Gibraltar</option>
                  <option value="GR">🇬🇷 Greece</option>
                  <option value="GL">🇬🇱 Greenland</option>
                  <option value="GD">🇬🇩 Grenada</option>
                  <option value="GP">🇬🇵 Guadeloupe</option>
                  <option value="GU">🇬🇺 Guam</option>
                  <option value="GT">🇬🇹 Guatemala</option>
                  <option value="GG">🇬🇬 Guernsey</option>
                  <option value="GN">🇬🇳 Guinea</option>
                  <option value="GW">🇬🇼 Guinea-Bissau</option>
                  <option value="GY">🇬🇾 Guyana</option>
                  <option value="HT">🇭🇹 Haiti</option>
                  <option value="HN">🇭🇳 Honduras</option>
                  <option value="HK">🇭🇰 Hong Kong</option>
                  <option value="HU">🇭🇺 Hungary</option>
                  <option value="IS">🇮🇸 Iceland</option>
                  <option value="IN">🇮🇳 India</option>
                  <option value="ID">🇮🇩 Indonesia</option>
                  <option value="IR">🇮🇷 Iran</option>
                  <option value="IQ">🇮🇶 Iraq</option>
                  <option value="IE">🇮🇪 Ireland</option>
                  <option value="IM">🇮🇲 Isle of Man</option>
                  <option value="IL">🇮🇱 Israel</option>
                  <option value="IT">🇮🇹 Italy</option>
                  <option value="JM">🇯🇲 Jamaica</option>
                  <option value="JP">🇯🇵 Japan</option>
                  <option value="JE">🇯🇪 Jersey</option>
                  <option value="JO">🇯🇴 Jordan</option>
                  <option value="KZ">🇰🇿 Kazakhstan</option>
                  <option value="KE">🇰🇪 Kenya</option>
                  <option value="KI">🇰🇮 Kiribati</option>
                  <option value="KP">🇰🇵 Korea (North)</option>
                  <option value="KR">🇰🇷 Korea (South)</option>
                  <option value="KW">🇰🇼 Kuwait</option>
                  <option value="KG">🇰🇬 Kyrgyzstan</option>
                  <option value="LA">🇱🇦 Laos</option>
                  <option value="LV">🇱🇻 Latvia</option>
                  <option value="LB">🇱🇧 Lebanon</option>
                  <option value="LS">🇱🇸 Lesotho</option>
                  <option value="LR">🇱🇷 Liberia</option>
                  <option value="LY">🇱🇾 Libya</option>
                  <option value="LI">🇱🇮 Liechtenstein</option>
                  <option value="LT">🇱🇹 Lithuania</option>
                  <option value="LU">🇱🇺 Luxembourg</option>
                  <option value="MO">🇲🇴 Macao</option>
                  <option value="MG">🇲🇬 Madagascar</option>
                  <option value="MW">🇲🇼 Malawi</option>
                  <option value="MY">🇲🇾 Malaysia</option>
                  <option value="MV">🇲🇻 Maldives</option>
                  <option value="ML">🇲🇱 Mali</option>
                  <option value="MT">🇲🇹 Malta</option>
                  <option value="MH">🇲🇭 Marshall Islands</option>
                  <option value="MQ">🇲🇶 Martinique</option>
                  <option value="MR">🇲🇷 Mauritania</option>
                  <option value="MU">🇲🇺 Mauritius</option>
                  <option value="YT">🇾🇹 Mayotte</option>
                  <option value="MX">🇲🇽 Mexico</option>
                  <option value="FM">🇫🇲 Micronesia</option>
                  <option value="MD">🇲🇩 Moldova</option>
                  <option value="MC">🇲🇨 Monaco</option>
                  <option value="MN">🇲🇳 Mongolia</option>
                  <option value="ME">🇲🇪 Montenegro</option>
                  <option value="MS">🇲🇸 Montserrat</option>
                  <option value="MA">🇲🇦 Morocco</option>
                  <option value="MZ">🇲🇿 Mozambique</option>
                  <option value="MM">🇲🇲 Myanmar</option>
                  <option value="NA">🇳🇦 Namibia</option>
                  <option value="NR">🇳🇷 Nauru</option>
                  <option value="NP">🇳🇵 Nepal</option>
                  <option value="NL">🇳🇱 Netherlands</option>
                  <option value="NC">🇳🇨 New Caledonia</option>
                  <option value="NZ">🇳🇿 New Zealand</option>
                  <option value="NI">🇳🇮 Nicaragua</option>
                  <option value="NE">🇳🇪 Niger</option>
                  <option value="NG">🇳🇬 Nigeria</option>
                  <option value="NU">🇳🇺 Niue</option>
                  <option value="NF">🇳🇫 Norfolk Island</option>
                  <option value="MK">🇲🇰 North Macedonia</option>
                  <option value="MP">🇲🇵 Northern Mariana Islands</option>
                  <option value="NO">🇳🇴 Norway</option>
                  <option value="OM">🇴🇲 Oman</option>
                  <option value="PK">🇵🇰 Pakistan</option>
                  <option value="PW">🇵🇼 Palau</option>
                  <option value="PS">🇵🇸 Palestine</option>
                  <option value="PA">🇵🇦 Panama</option>
                  <option value="PG">🇵🇬 Papua New Guinea</option>
                  <option value="PY">🇵🇾 Paraguay</option>
                  <option value="PE">🇵🇪 Peru</option>
                  <option value="PH">🇵🇭 Philippines</option>
                  <option value="PN">🇵🇳 Pitcairn</option>
                  <option value="PL">🇵🇱 Poland</option>
                  <option value="PT">🇵🇹 Portugal</option>
                  <option value="PR">🇵🇷 Puerto Rico</option>
                  <option value="QA">🇶🇦 Qatar</option>
                  <option value="RE">🇷🇪 Réunion</option>
                  <option value="RO">🇷🇴 Romania</option>
                  <option value="RU">🇷🇺 Russia</option>
                  <option value="RW">🇷🇼 Rwanda</option>
                  <option value="BL">🇧🇱 Saint Barthélemy</option>
                  <option value="SH">🇸🇭 Saint Helena</option>
                  <option value="KN">🇰🇳 Saint Kitts and Nevis</option>
                  <option value="LC">🇱🇨 Saint Lucia</option>
                  <option value="MF">🇲🇫 Saint Martin</option>
                  <option value="PM">🇵🇲 Saint Pierre and Miquelon</option>
                  <option value="VC">🇻🇨 Saint Vincent and the Grenadines</option>
                  <option value="WS">🇼🇸 Samoa</option>
                  <option value="SM">🇸🇲 San Marino</option>
                  <option value="ST">🇸🇹 São Tomé and Príncipe</option>
                  <option value="SA">🇸🇦 Saudi Arabia</option>
                  <option value="SN">🇸🇳 Senegal</option>
                  <option value="RS">🇷🇸 Serbia</option>
                  <option value="SC">🇸🇨 Seychelles</option>
                  <option value="SL">🇸🇱 Sierra Leone</option>
                  <option value="SG">🇸🇬 Singapore</option>
                  <option value="SX">🇸🇽 Sint Maarten</option>
                  <option value="SK">🇸🇰 Slovakia</option>
                  <option value="SI">🇸🇮 Slovenia</option>
                  <option value="SB">🇸🇧 Solomon Islands</option>
                  <option value="SO">🇸🇴 Somalia</option>
                  <option value="ZA">🇿🇦 South Africa</option>
                  <option value="GS">🇬🇸 South Georgia and the South Sandwich Islands</option>
                  <option value="SS">🇸🇸 South Sudan</option>
                  <option value="ES">🇪🇸 Spain</option>
                  <option value="LK">🇱🇰 Sri Lanka</option>
                  <option value="SD">🇸🇩 Sudan</option>
                  <option value="SR">🇸🇷 Suriname</option>
                  <option value="SJ">🇸🇯 Svalbard and Jan Mayen</option>
                  <option value="SE">🇸🇪 Sweden</option>
                  <option value="CH">🇨🇭 Switzerland</option>
                  <option value="SY">🇸🇾 Syria</option>
                  <option value="TW">🇹🇼 Taiwan</option>
                  <option value="TJ">🇹🇯 Tajikistan</option>
                  <option value="TZ">🇹🇿 Tanzania</option>
                  <option value="TH">🇹🇭 Thailand</option>
                  <option value="TL">🇹🇱 Timor-Leste</option>
                  <option value="TG">🇹🇬 Togo</option>
                  <option value="TK">🇹🇰 Tokelau</option>
                  <option value="TO">🇹🇴 Tonga</option>
                  <option value="TT">🇹🇹 Trinidad and Tobago</option>
                  <option value="TN">🇹🇳 Tunisia</option>
                  <option value="TR">🇹🇷 Turkey</option>
                  <option value="TM">🇹🇲 Turkmenistan</option>
                  <option value="TC">🇹🇨 Turks and Caicos Islands</option>
                  <option value="TV">🇹🇻 Tuvalu</option>
                  <option value="UG">🇺🇬 Uganda</option>
                  <option value="UA">🇺🇦 Ukraine</option>
                  <option value="AE">🇦🇪 United Arab Emirates</option>
                  <option value="GB">🇬🇧 United Kingdom</option>
                  <option value="US">🇺🇸 United States</option>
                  <option value="UM">🇺🇲 United States Minor Outlying Islands</option>
                  <option value="UY">🇺🇾 Uruguay</option>
                  <option value="UZ">🇺🇿 Uzbekistan</option>
                  <option value="VU">🇻🇺 Vanuatu</option>
                  <option value="VA">🇻🇦 Vatican City</option>
                  <option value="VE">🇻🇪 Venezuela</option>
                  <option value="VN">🇻🇳 Vietnam</option>
                  <option value="VG">🇻🇬 Virgin Islands (British)</option>
                  <option value="VI">🇻🇮 Virgin Islands (U.S.)</option>
                  <option value="WF">🇼🇫 Wallis and Futuna</option>
                  <option value="EH">🇪🇭 Western Sahara</option>
                  <option value="YE">🇾🇪 Yemen</option>
                  <option value="ZM">🇿🇲 Zambia</option>
                  <option value="ZW">🇿🇼 Zimbabwe</option>
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

          {/* Step 2: Game Selection */}
          {currentStep === 2 && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Choose Your Games</h3>
              <p className="text-sm text-gray-600 mb-4">
                Select the games you play to complete your profile for those specific packages. You can choose one or both!
              </p>
              
              <div className="space-y-3">
                {/* PUBG Mobile Option */}
                <div 
                  onClick={() => {
                    if (selectedGames.includes('PUBG_MOBILE')) {
                      setSelectedGames(selectedGames.filter(game => game !== 'PUBG_MOBILE'))
                    } else {
                      setSelectedGames([...selectedGames, 'PUBG_MOBILE'])
                    }
                  }}
                  className={`cursor-pointer border-2 rounded-xl p-4 transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                    selectedGames.includes('PUBG_MOBILE') 
                      ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 shadow-lg scale-105' 
                      : 'border-gray-200 hover:border-orange-300 bg-white hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      selectedGames.includes('PUBG_MOBILE') 
                        ? 'border-orange-500 bg-gradient-to-r from-orange-500 to-red-500 shadow-lg' 
                        : 'border-gray-300 hover:border-orange-400'
                    }`}>
                      {selectedGames.includes('PUBG_MOBILE') && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <img
                      src="https://cdn.midasbuy.com/images/apps/pubgm/1599546030876PIvqwGaa.png"
                      alt="PUBG Mobile"
                      className="w-12 h-12 rounded-lg object-contain bg-transparent"
                    />
                    <div className="flex-1">
                      <h4 className={`font-semibold transition-colors duration-300 ${
                        selectedGames.includes('PUBG_MOBILE') 
                          ? 'bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent' 
                          : 'text-gray-900'
                      }`}>PUBG Mobile</h4>
                      <p className="text-sm text-gray-600">Purchase UC for battle royale gaming</p>
                      {selectedGames.includes('PUBG_MOBILE') && (
                        <p className="text-xs text-orange-600 font-medium mt-1">✓ Selected for profile completion</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile Legends Option */}
                <div 
                  onClick={() => {
                    if (selectedGames.includes('MLBB')) {
                      setSelectedGames(selectedGames.filter(game => game !== 'MLBB'))
                    } else {
                      setSelectedGames([...selectedGames, 'MLBB'])
                    }
                  }}
                  className={`cursor-pointer border-2 rounded-xl p-4 transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                    selectedGames.includes('MLBB') 
                      ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg scale-105' 
                      : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      selectedGames.includes('MLBB') 
                        ? 'border-purple-500 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg' 
                        : 'border-gray-300 hover:border-purple-400'
                    }`}>
                      {selectedGames.includes('MLBB') && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <img
                      src="https://b4uesports.com/wp-content/uploads/2025/04/1000077486.png"
                      alt="Mobile Legends"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className={`font-semibold transition-colors duration-300 ${
                        selectedGames.includes('MLBB') 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent' 
                          : 'text-gray-900'
                      }`}>Mobile Legends: Bang Bang</h4>
                      <p className="text-sm text-gray-600">Purchase Diamonds for MLBB excellence</p>
                      {selectedGames.includes('MLBB') && (
                        <p className="text-xs text-purple-600 font-medium mt-1">✓ Selected for profile completion</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedGames.length === 0 && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg p-3 mt-4">
                  <p className="text-red-600 text-sm text-center font-medium">🎮 Please select at least one game to continue your gaming journey!</p>
                </div>
              )}
              
              {selectedGames.length > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-3 mt-4">
                  <p className="text-green-700 text-sm text-center font-medium">
                    🎉 Great! You've selected {selectedGames.length} game{selectedGames.length > 1 ? 's' : ''}. 
                    {selectedGames.length === 1 ? 'Ready to proceed!' : 'You\'ll complete profiles for both games.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: PUBG Profile */}
          {currentStep === 3 && selectedGames.includes('PUBG_MOBILE') && (
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">PUBG Mobile Profile</h3>
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
                  className="w-full px-3 py-2.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base touch-manipulation bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-all duration-300"
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
                  className="w-full px-3 py-2.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base touch-manipulation bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-all duration-300"
                  placeholder="123456789"
                />
                {errors.pubgUid && <p className="text-red-500 text-sm mt-1">{errors.pubgUid}</p>}
                <p className="text-xs text-gray-500 mt-1">
                  Find your UID in PUBG Mobile settings
                </p>
              </div>
            </div>
          )}

          {/* Step 4: MLBB Profile */}
          {currentStep === 4 && selectedGames.includes('MLBB') && (
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Mobile Legends Profile</h3>
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
                  className="w-full px-3 py-2.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base touch-manipulation bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 transition-all duration-300"
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
                  className="w-full px-3 py-2.5 sm:py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base touch-manipulation bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 transition-all duration-300"
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
                className="flex-1 px-3 py-2.5 sm:px-4 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm sm:text-base touch-manipulation active:scale-95 transition-all duration-300"
              >
                Back
              </button>
            )}
            
            {/* Next button logic */}
            {currentStep === 1 && (
              <button
                onClick={handleNext}
                className="flex-1 px-3 py-2.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base touch-manipulation active:scale-95 transition-all duration-300"
              >
                Next
              </button>
            )}
            
            {/* Game selection step */}
            {currentStep === 2 && (
              <button
                onClick={handleNext}
                disabled={selectedGames.length === 0}
                className="flex-1 px-3 py-2.5 sm:px-4 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base touch-manipulation active:scale-95 transition-all duration-300"
              >
                Continue
              </button>
            )}
            
            {/* PUBG Profile step */}
            {currentStep === 3 && selectedGames.includes('PUBG_MOBILE') && (
              selectedGames.includes('MLBB') ? (
                <button
                  onClick={handleNext}
                  className="flex-1 px-3 py-2.5 sm:px-4 sm:py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm sm:text-base touch-manipulation active:scale-95 transition-all duration-300"
                >
                  Next: MLBB Profile
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 px-3 py-2.5 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm sm:text-base touch-manipulation active:scale-95 transition-all duration-300"
                >
                  {isLoading ? 'Saving...' : 'Complete Profile'}
                </button>
              )
            )}
            
            {/* MLBB Profile step - final step */}
            {currentStep === 4 && selectedGames.includes('MLBB') && (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 px-3 py-2.5 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm sm:text-base touch-manipulation active:scale-95 transition-all duration-300"
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