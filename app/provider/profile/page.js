'use client'
import { useState, useCallback, useRef } from 'react'
import { Camera, Upload, X, Plus, User, Mail, Phone, Globe, MapPin, Tag, FileText, Star, Shield } from 'lucide-react'

const CATEGORIES = [
  'Web Development', 'Mobile Development', 'Design & Graphics', 'Content Writing',
  'Digital Marketing', 'Photography', 'Video Editing', 'Consulting', 'Education & Training',
  'Translation', 'Virtual Assistant', 'Data Entry', 'Accounting', 'Legal Services',
  'Health & Wellness', 'Repair Services', 'Food & Catering', 'Beauty & Grooming',
  'Fitness & Sports', 'Event Planning', 'Transportation', 'Cleaning Services', 'Other'
]

const LOCATIONS = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat',
  'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 
  'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana',
  'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar',
  'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad',
  'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur',
  'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Hubli-Dharwad'
]

const PROVIDER_TYPES = [
  { value: 'individual', label: 'Individual/Freelancer' },
  { value: 'business', label: 'Business/Company' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'startup', label: 'Startup' }
]

export default function ProfilePage() {
  const profileImageRef = useRef(null)
  const portfolioImageRef = useRef(null)
  const aadharFrontRef = useRef(null)
  const aadharBackRef = useRef(null)
  const panCardRef = useRef(null)

  const [profile, setProfile] = useState({
    // Basic Information
    name: '',
    tagline: '',
    description: '',
    category: '',
    type: 'individual',
    
    // Contact Information
    email: '',
    phone: '',
    website: '',
    address: '',
    
    // Media
    profileImage: null,
    portfolioImage: null,
    
    // Service Details
    serviceAreas: [],
    teamSize: '',
    experience: '',
    
    // Verification Documents (Mandatory)
    aadharFront: null,
    aadharBack: null,
    aadharNumber: '',
    panCard: null,
    panNumber: '',
    
    // Optional Legal
    gstNumber: '',
    
    // Features & Services
    features: [''],
    socialMedia: {
      facebook: '',
      instagram: '',
      linkedin: '',
      twitter: '',
      portfolio: ''
    }
  })

  const [currentSection, setCurrentSection] = useState('basic')
  const [errors, setErrors] = useState({})

  const handleInputChange = useCallback((field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }, [errors])

  const handleNestedChange = useCallback((parent, field, value) => {
    setProfile(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }))
  }, [])

  const handleServiceAreaToggle = useCallback((location) => {
    setProfile(prev => ({
      ...prev,
      serviceAreas: prev.serviceAreas.includes(location)
        ? prev.serviceAreas.filter(area => area !== location)
        : [...prev.serviceAreas, location]
    }))
  }, [])

  const handleFileUpload = useCallback((field, file) => {
    if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        handleInputChange(field, e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }, [handleInputChange])

  const addFeature = useCallback(() => {
    setProfile(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }, [])

  const updateFeature = useCallback((index, value) => {
    setProfile(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }))
  }, [])

  const removeFeature = useCallback((index) => {
    if (profile.features.length > 1) {
      setProfile(prev => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index)
      }))
    }
  }, [profile.features.length])

  const validateForm = () => {
    const newErrors = {}
    
    // Mandatory fields
    if (!profile.name.trim()) newErrors.name = 'Name is required'
    if (!profile.email.trim()) newErrors.email = 'Email is required'
    if (!profile.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!profile.category) newErrors.category = 'Category is required'
    if (!profile.address.trim()) newErrors.address = 'Address is required'
    
    // Mandatory verification documents
    if (!profile.aadharFront) newErrors.aadharFront = 'Aadhar front image is required'
    if (!profile.aadharBack) newErrors.aadharBack = 'Aadhar back image is required'
    if (!profile.aadharNumber.trim()) newErrors.aadharNumber = 'Aadhar number is required'
    if (!profile.panCard) newErrors.panCard = 'PAN card image is required'
    if (!profile.panNumber.trim()) newErrors.panNumber = 'PAN number is required'
    
    // Validation patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (profile.email && !emailRegex.test(profile.email)) {
      newErrors.email = 'Invalid email format'
    }

    const aadharRegex = /^\d{12}$/
    if (profile.aadharNumber && !aadharRegex.test(profile.aadharNumber.replace(/\s/g, ''))) {
      newErrors.aadharNumber = 'Aadhar number must be 12 digits'
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    if (profile.panNumber && !panRegex.test(profile.panNumber.toUpperCase())) {
      newErrors.panNumber = 'Invalid PAN format (e.g., ABCDE1234F)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Profile Submitted:', profile)
      alert('Profile saved successfully!')
    }
  }

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'service', label: 'Service Details', icon: Tag },
    { id: 'verification', label: 'Verification', icon: Shield },
    { id: 'portfolio', label: 'Portfolio', icon: Star }
  ]

  const renderFileUpload = (field, label, accept = "image/*", ref, required = false) => (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors ${
        errors[field] ? 'border-red-300 bg-red-50' : 'border-gray-300'
      }`}>
        {profile[field] ? (
          <div className="relative">
            {field.includes('aadhar') || field === 'panCard' ? (
              <div className="bg-gray-100 p-4 rounded-lg">
                <FileText className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Document uploaded</p>
              </div>
            ) : (
              <img 
                src={profile[field]} 
                alt={label}
                className={`mx-auto rounded-lg ${field === 'profileImage' ? 'w-24 h-24 object-cover' : 'w-full h-32 object-cover'}`}
              />
            )}
            <button
              type="button"
              onClick={() => handleInputChange(field, null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="w-8 h-8 text-gray-400 mx-auto" />
            <p className="text-sm text-gray-600">Click to upload {label.toLowerCase()}</p>
            <p className="text-xs text-gray-400">
              {field.includes('aadhar') || field === 'panCard' ? 'JPG, PNG, PDF up to 5MB' : 'PNG, JPG up to 5MB'}
            </p>
          </div>
        )}
        <input
          ref={ref}
          type="file"
          accept={accept}
          onChange={(e) => handleFileUpload(field, e.target.files[0])}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
      {errors[field] && <p className="text-sm text-red-500">{errors[field]}</p>}
    </div>
  )

  const renderInput = (field, label, type = 'text', required = false, placeholder = '') => (
    <div className="space-y-1">
      <label className="block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={profile[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          errors[field] ? 'border-red-500' : 'border-gray-300'
        }`}
        required={required}
      />
      {errors[field] && <p className="text-sm text-red-500">{errors[field]}</p>}
    </div>
  )

  const renderSection = () => {
    switch (currentSection) {
      case 'basic':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderInput('name', 'Full Name / Business Name', 'text', true, 'Enter your name or business name')}
              {renderInput('tagline', 'Professional Tagline', 'text', false, 'Brief description of what you do')}
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700">
                About / Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={profile.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your skills, experience, and services in detail..."
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Service Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={profile.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">Provider Type</label>
                <select
                  value={profile.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {PROVIDER_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {renderInput('experience', 'Years of Experience', 'number', false, '2')}
            </div>

            {/* Profile Image */}
            <div className="max-w-md">
              {renderFileUpload('profileImage', 'Profile Picture', 'image/*', profileImageRef, false)}
              <p className="text-xs text-gray-500 mt-1">Recommended: Square format, 200x200px minimum</p>
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderInput('email', 'Email Address', 'email', true, 'your@email.com')}
              {renderInput('phone', 'Phone Number', 'tel', true, '+91 9876543210')}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderInput('website', 'Website / Portfolio URL', 'url', false, 'https://yourwebsite.com')}
              {renderInput('teamSize', 'Team Size', 'text', false, 'Solo / 2-5 members')}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                value={profile.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter complete address with pincode"
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Social Media & Portfolio Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="url"
                  value={profile.socialMedia.portfolio}
                  onChange={(e) => handleNestedChange('socialMedia', 'portfolio', e.target.value)}
                  placeholder="Portfolio Website URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <input
                  type="url"
                  value={profile.socialMedia.linkedin}
                  onChange={(e) => handleNestedChange('socialMedia', 'linkedin', e.target.value)}
                  placeholder="LinkedIn Profile URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <input
                  type="url"
                  value={profile.socialMedia.instagram}
                  onChange={(e) => handleNestedChange('socialMedia', 'instagram', e.target.value)}
                  placeholder="Instagram URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <input
                  type="url"
                  value={profile.socialMedia.facebook}
                  onChange={(e) => handleNestedChange('socialMedia', 'facebook', e.target.value)}
                  placeholder="Facebook URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>
        )

      case 'service':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Service Areas</h3>
              <p className="text-sm text-gray-600">Select all locations where you provide services</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-64 overflow-y-auto border rounded-lg p-4">
                {LOCATIONS.map(location => (
                  <label key={location} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={profile.serviceAreas.includes(location)}
                      onChange={() => handleServiceAreaToggle(location)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{location}</span>
                  </label>
                ))}
              </div>
              
              {profile.serviceAreas.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700">Selected Areas ({profile.serviceAreas.length}):</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.serviceAreas.map(area => (
                      <span
                        key={area}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {area}
                        <button
                          type="button"
                          onClick={() => handleServiceAreaToggle(area)}
                          className="ml-1 hover:text-blue-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-700">GST Number (Optional)</label>
              <input
                type="text"
                value={profile.gstNumber}
                onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                placeholder="22AAAAA0000A1Z5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <p className="text-xs text-gray-500">Only required if you have GST registration</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Key Services & Skills
              </label>
              <div className="space-y-3">
                {profile.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder={`Service/Skill ${index + 1}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                    {profile.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Service/Skill</span>
                </button>
              </div>
            </div>
          </div>
        )

      case 'verification':
        return (
          <div className="space-y-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Identity Verification Required</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    All documents are mandatory for account verification. Your information is secure and will be used only for verification purposes.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {renderInput('aadharNumber', 'Aadhar Number', 'text', true, 'XXXX XXXX XXXX')}
                {renderFileUpload('aadharFront', 'Aadhar Card (Front)', 'image/*,application/pdf', aadharFrontRef, true)}
              </div>
              <div className="space-y-4">
                <div className="h-8"></div> {/* Spacer for alignment */}
                {renderFileUpload('aadharBack', 'Aadhar Card (Back)', 'image/*,application/pdf', aadharBackRef, true)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {renderInput('panNumber', 'PAN Number', 'text', true, 'ABCDE1234F')}
              </div>
              <div className="space-y-4">
                {renderFileUpload('panCard', 'PAN Card', 'image/*,application/pdf', panCardRef, true)}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800">Document Guidelines</h4>
                  <ul className="text-sm text-blue-700 mt-1 space-y-1">
                    <li>• Upload clear, high-quality images</li>
                    <li>• All text should be clearly readable</li>
                    <li>• Accepted formats: JPG, PNG, PDF</li>
                    <li>• Maximum file size: 5MB per document</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )

      case 'portfolio':
        return (
          <div className="space-y-8">
            <div>
              {renderFileUpload('portfolioImage', 'Portfolio/Work Sample Image', 'image/*', portfolioImageRef, false)}
              <p className="text-xs text-gray-500 mt-1">Upload an image showcasing your best work (optional but recommended)</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-800">Profile Complete!</h3>
                <p className="text-green-700">
                  Your profile is ready to be submitted. Make sure all information is accurate as it will be reviewed for verification.
                </p>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
  <div className="min-h-screen ">
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your Profile</h1>
        <p className="text-lg text-gray-600">Set up your professional profile to start offering services</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-8 p-1">
        <div className="flex flex-wrap justify-center space-x-1">
          {sections.map((section) => {
            const IconComponent = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                type="button"
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  currentSection === section.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="hidden sm:inline">{section.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          console.log("Submitting profile...")
          // TODO: handle submit logic
        }}
      >
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {renderSection()}

          {/* Navigation & Submit */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200 mt-8">
            {/* Progress dots */}
            <div className="flex space-x-3">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setCurrentSection(section.id)}
                  disabled={index > sections.findIndex(s => s.id === currentSection) + 1}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    section.id === currentSection
                      ? 'bg-blue-600'
                      : sections.findIndex(s => s.id === section.id) < sections.findIndex(s => s.id === currentSection)
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next / Submit */}
            <div className="flex space-x-4">
              {currentSection !== 'basic' && (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = sections.findIndex(s => s.id === currentSection)
                    setCurrentSection(sections[currentIndex - 1].id)
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Previous
                </button>
              )}

              {currentSection !== 'portfolio' ? (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = sections.findIndex(s => s.id === currentSection)
                    setCurrentSection(sections[currentIndex + 1].id)
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
)
}