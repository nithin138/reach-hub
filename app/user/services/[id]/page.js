'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Modal from '../../../../components/Modal'
import { useAuth } from '../../../../context/AuthContext'

export default function ServiceDetailPage() {
  const { id } = useParams()
  const { user, isAuthenticated } = useAuth()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showEnquiryModal, setShowEnquiryModal] = useState(false)
  const [enquiryData, setEnquiryData] = useState({
    message: '',
    preferredDate: '',
    budget: ''
  })

  useEffect(() => {
    // Simulate fetching service details
    setTimeout(() => {
      setService({
        id: parseInt(id),
        title: "Professional House Cleaning",
        description: "Comprehensive house cleaning services including deep cleaning, regular maintenance, and specialized cleaning for move-ins/move-outs.",
        category: "Cleaning",
        provider: {
          name: "CleanPro Services",
          rating: 4.8,
          reviewCount: 156,
          avatar: "/default-avatar.png",
          verified: true
        },
        price: "From $50",
        images: ["/placeholder.jpg", "/placeholder.jpg"],
        location: "New York, NY",
        serviceArea: "Manhattan, Brooklyn, Queens",
        duration: "2-4 hours",
        availability: "Mon-Sat, 8AM-6PM",
        features: [
          "Fully insured and bonded",
          "Eco-friendly cleaning products",
          "Flexible scheduling",
          "100% satisfaction guarantee"
        ],
        reviews: [
          {
            id: 1,
            user: "Sarah M.",
            rating: 5,
            comment: "Excellent service! Very thorough and professional.",
            date: "2024-01-15"
          }
        ]
      })
      setLoading(false)
    }, 1000)
  }, [id])

  const handleEnquirySubmit = async (e) => {
    e.preventDefault()
    // In real app, this would make an API call
    console.log('Submitting enquiry:', enquiryData)
    setShowEnquiryModal(false)
    // Show success message
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="h-96 bg-gray-200 rounded mb-8"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li><Link href="/user/services" className="hover:text-primary-600">Services</Link></li>
          <li>›</li>
          <li><Link href={`/user/services?category=${service.category}`} className="hover:text-primary-600">{service.category}</Link></li>
          <li>›</li>
          <li className="text-gray-900">{service.title}</li>
        </ol>
      </nav>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Images */}
          <div className="mb-8">
            <img 
              src={service.images[0]} 
              alt={service.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Service Info */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{service.description}</p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Service Details</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><strong>Duration:</strong> {service.duration}</li>
                  <li><strong>Service Area:</strong> {service.serviceArea}</li>
                  <li><strong>Availability:</strong> {service.availability}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h3>
            <div className="space-y-4">
              {service.reviews.map(review => (
                <div key={review.id} className="card">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <div className="font-semibold text-gray-900">{review.user}</div>
                      <div className="flex items-center">
                        <div className="flex text-yellow-400 mr-2">
                          {'★'.repeat(review.rating)}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="card sticky top-4">
            {/* Provider Info */}
            <div className="text-center mb-6">
              <img 
                src={service.provider.avatar} 
                alt={service.provider.name}
                className="w-20 h-20 rounded-full mx-auto mb-3"
              />
              <h3 className="font-semibold text-gray-900">{service.provider.name}</h3>
              <div className="flex items-center justify-center mt-2">
                <div className="flex text-yellow-400 mr-2">
                  {'★'.repeat(Math.floor(service.provider.rating))}
                </div>
                <span className="text-sm text-gray-600">
                  {service.provider.rating} ({service.provider.reviewCount} reviews)
                </span>
              </div>
              {service.provider.verified && (
                <span className="inline-flex items-center mt-2 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ Verified Provider
                </span>
              )}
            </div>

            {/* Price */}
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-primary-600 mb-2">{service.price}</div>
              <div className="text-sm text-gray-600">Starting price</div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {isAuthenticated ? (
                <button 
                  onClick={() => setShowEnquiryModal(true)}
                  className="w-full btn-primary"
                >
                  Send Enquiry
                </button>
              ) : (
                <Link href="/auth/login" className="w-full btn-primary block text-center">
                  Login to Send Enquiry
                </Link>
              )}
              <button className="w-full btn-secondary">
                Message Provider
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <Modal onClose={() => setShowEnquiryModal(false)}>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Send Enquiry to {service.provider.name}
            </h3>
            <form onSubmit={handleEnquirySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  value={enquiryData.message}
                  onChange={(e) => setEnquiryData({...enquiryData, message: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Tell us about your requirements..."
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={enquiryData.preferredDate}
                  onChange={(e) => setEnquiryData({...enquiryData, preferredDate: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <input
                  type="text"
                  value={enquiryData.budget}
                  onChange={(e) => setEnquiryData({...enquiryData, budget: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., $50-100"
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 btn-primary">
                  Send Enquiry
                </button>
                <button 
                  type="button"
                  onClick={() => setShowEnquiryModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  )
}