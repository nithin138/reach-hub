'use client'
import { useState } from 'react'

export default function BusinessProfilePage() {
  const [profile, setProfile] = useState({
    businessName: '',
    logo: null,
    banner: null,
    tagline: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    category: '',
    type: 'vendor',
    description: '',
    operationalHours: '',
    serviceArea: '',
    gstNumber: '',
    license: null,
    features: [''],
  })

  const handleChange = (field, value) => setProfile({ ...profile, [field]: value })

  const addFeature = () => setProfile({ ...profile, features: [...profile.features, ''] })
  const updateFeature = (index, value) => {
    const newFeatures = [...profile.features]
    newFeatures[index] = value
    setProfile({ ...profile, features: newFeatures })
  }
  const removeFeature = (index) => setProfile({ ...profile, features: profile.features.filter((_, i) => i !== index) })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Profile Submitted:', profile)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Business Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Basic Info */}
        <div>
          <label className="block font-medium">Business Name</label>
          <input type="text" value={profile.businessName} onChange={(e) => handleChange('businessName', e.target.value)} className="w-full border p-2 rounded" required />
        </div>

        <div>
          <label className="block font-medium">Tagline</label>
          <input type="text" value={profile.tagline} onChange={(e) => handleChange('tagline', e.target.value)} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Business Type</label>
          <select value={profile.type} onChange={(e) => handleChange('type', e.target.value)} className="w-full border p-2 rounded">
            <option value="vendor">Vendor</option>
            <option value="provider">Service Provider</option>
          </select>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Email</label>
            <input type="email" value={profile.email} onChange={(e) => handleChange('email', e.target.value)} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="block font-medium">Phone</label>
            <input type="tel" value={profile.phone} onChange={(e) => handleChange('phone', e.target.value)} className="w-full border p-2 rounded" required />
          </div>
        </div>

        <div>
          <label className="block font-medium">Website</label>
          <input type="text" value={profile.website} onChange={(e) => handleChange('website', e.target.value)} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <textarea value={profile.address} onChange={(e) => handleChange('address', e.target.value)} className="w-full border p-2 rounded" rows={3}></textarea>
        </div>

        {/* Features */}
        <div>
          <label className="block font-medium mb-2">Features / Highlights</label>
          {profile.features.map((feature, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => updateFeature(idx, e.target.value)}
                className="flex-1 border p-2 rounded"
              />
              {profile.features.length > 1 && (
                <button type="button" onClick={() => removeFeature(idx)} className="px-2 bg-red-500 text-white rounded">✕</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addFeature} className="text-blue-600 hover:underline text-sm">+ Add Feature</button>
        </div>

        <button type="submit" className="bg-primary-600 text-white px-6 py-2 rounded">Save Profile</button>
      </form>
    </div>
  )
}
