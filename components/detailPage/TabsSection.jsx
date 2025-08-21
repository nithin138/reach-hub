// components/TabsSection.js
'use client'
import { useState } from 'react'
import { CheckCircle, Star, Award, MessageCircle, Phone } from 'lucide-react'
import DetailsTab from './DetailsTab'
import ReviewsTab from './ReviewsTab'

export default function TabsSection({ 
  title, 
  description, 
  features, 
  specifications, 
  reviews, 
  provider, 
  type 
}) {
  const [activeTab, setActiveTab] = useState('details')

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {['details', 'reviews', 'provider'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-2 border-b-2 font-medium text-sm capitalize transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
              {tab === 'reviews' && (
                <span className="ml-1 text-xs text-gray-400">({reviews.length})</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'details' && (
          <DetailsTab 
            title={title}
            description={description}
            features={features}
            specifications={specifications}
            type={type}
          />
        )}

        {activeTab === 'reviews' && (
          <ReviewsTab reviews={reviews} />
        )}

        {activeTab === 'provider' && (
          <ProviderTab provider={provider} type={type} />
        )}
      </div>
    </div>
  )
}