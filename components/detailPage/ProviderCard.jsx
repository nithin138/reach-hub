
// components/ProviderCard.js
'use client'
import { useState } from 'react'
import { Star, CheckCircle, Award, Calendar, MessageCircle, Phone, Truck, Package } from 'lucide-react'
import EnquiryModal from './EnquiryModel'

export default function ProviderCard({ 
  provider, 
  price, 
  originalPrice, 
  rating, 
  reviewCount, 
  totalSales, 
  type,
  inStock,
  shipping 
}) {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false)

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
        {/* Provider Info */}
        <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="relative">
            <img 
              src={provider.avatar} 
              alt={provider.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            {provider.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              {provider.name}
              {provider.verified && <Award className="w-4 h-4 text-blue-500" />}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{provider.rating} ({provider.reviewCount} reviews)</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {type === 'service' ? `Responds ${provider.responseTime}` : `${provider.totalProducts} products`} • Member since {provider.memberSince}
            </p>
          </div>
        </div>

        {/* Pricing */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-3xl font-bold text-gray-900">{price}</span>
            {originalPrice && (
              <span className="text-lg text-gray-400 line-through">{originalPrice}</span>
            )}
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              {rating} ({reviewCount})
            </span>
            <span>{totalSales} {type === 'service' ? 'bookings' : 'sold'}</span>
          </div>
          
          {/* Product-specific info */}
          {type === 'product' && (
            <div className="mt-3 space-y-2">
              <div className={`text-sm font-medium ${inStock ? 'text-green-600' : 'text-red-600'}`}>
                {inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </div>
              {shipping && (
                <div className="flex items-center justify-center gap-1 text-sm text-blue-600">
                  <Truck className="w-4 h-4" />
                  {shipping}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="font-bold text-blue-600">
              {type === 'service' ? provider.completedJobs : provider.totalProducts}
            </div>
            <div className="text-xs text-gray-600">
              {type === 'service' ? 'Completed Jobs' : 'Products'}
            </div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="font-bold text-green-600">{provider.responseTime}</div>
            <div className="text-xs text-gray-600">Response Time</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={() => setShowEnquiryModal(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            disabled={type === 'product' && !inStock}
          >
            {type === 'service' ? (
              <>
                <Calendar className="w-5 h-5" />
                Book Now / Send Enquiry
              </>
            ) : (
              <>
                <Package className="w-5 h-5" />
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </>
            )}
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Message
            </button>
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              Call
            </button>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <EnquiryModal 
          provider={provider}
          type={type}
          onClose={() => setShowEnquiryModal(false)}
        />
      )}
    </>
  )
}