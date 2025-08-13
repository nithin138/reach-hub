'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ServiceCard = ({ service, className = "" }) => {
  const [imageError, setImageError] = useState(false)
  const router = useRouter()

  if (!service) return null

  const {
    id,
    title,
    category,
    provider,
    rating,
    price,
    image,
    location
  } = service

  // Handle card click - navigate to service details
  const handleCardClick = () => {
    router.push(`/services/${id}`)
  }

  // Handle provider click - navigate to provider profile
  const handleProviderClick = (e) => {
    e.stopPropagation()
    // Extract provider ID from provider name (in real app, you'd have provider.id)
    const providerId = provider.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    router.push(`/providers/${providerId}`)
  }

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      )
    }

    // Empty stars
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }

    return stars
  }

  // Category badge colors
  const getCategoryColor = (category) => {
    const colors = {
      'Cleaning': 'bg-blue-100 text-blue-800',
      'Plumbing': 'bg-green-100 text-green-800',
      'Electrical': 'bg-yellow-100 text-yellow-800',
      'Gardening': 'bg-emerald-100 text-emerald-800',
      'Moving': 'bg-purple-100 text-purple-800',
      'Painting': 'bg-pink-100 text-pink-800',
      'Carpentry': 'bg-orange-100 text-orange-800',
      'IT Support': 'bg-indigo-100 text-indigo-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  // Placeholder image for failed loads
  const placeholderImage = `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="240" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="240" fill="#F3F4F6"/>
      <rect x="150" y="80" width="100" height="80" rx="8" fill="#D1D5DB"/>
      <rect x="170" y="100" width="60" height="40" fill="#9CA3AF"/>
      <circle cx="185" cy="115" r="8" fill="#6B7280"/>
      <circle cx="215" cy="115" r="8" fill="#6B7280"/>
      <rect x="180" y="130" width="40" height="4" rx="2" fill="#6B7280"/>
    </svg>
  `)}`

  return (
    <div 
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden border border-gray-200 ${className}`}
      onClick={handleCardClick}
    >
      {/* Service Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageError ? placeholderImage : image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={() => setImageError(true)}
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(category)}`}>
            {category}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full transition-all duration-200 group"
          onClick={(e) => {
            e.stopPropagation()
            // Handle favorite toggle
            console.log('Toggle favorite for service:', id)
          }}
        >
          <svg className="w-4 h-4 text-gray-600 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Service Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Provider Info */}
        <button
          onClick={handleProviderClick}
          className="text-sm text-gray-600 hover:text-blue-600 transition-colors mb-3 flex items-center space-x-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h2M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h1m-1-4h1m4 4h1m-1-4h1" />
          </svg>
          <span>{provider}</span>
        </button>

        {/* Rating and Location Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {renderStars(rating)}
            </div>
            <span className="text-sm font-medium text-gray-700 ml-1">
              {rating.toFixed(1)}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{location}</span>
          </div>
        </div>

        {/* Price and Action Row */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-gray-900">
            {price}
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/services/${id}/book`)
            }}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard