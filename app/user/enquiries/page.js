'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../../hooks/useAuth'

export default function UserEnquiriesPage() {
  const { user, isAuthenticated } = useAuth()
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, pending, responded

  useEffect(() => {
    if (!isAuthenticated) return

    // Simulate fetching enquiries
    setTimeout(() => {
                setEnquiries([
        {
          id: 1,
          service: "Professional House Cleaning",
          provider: "CleanPro Services",
          status: "responded",
          message: "I need weekly cleaning service for a 3-bedroom apartment",
          submittedAt: "2024-01-20",
          response: "Thank you for your enquiry! We'd be happy to help. Our weekly service for a 3-bedroom apartment starts at $120. Can we schedule a consultation?",
          respondedAt: "2024-01-21"
        },
        {
          id: 2,
          service: "Web Development",
          provider: "DevExperts",
          status: "pending",
          message: "Looking for someone to build an e-commerce website",
          submittedAt: "2024-01-22",
          response: null,
          respondedAt: null
        }
      ])
      setLoading(false)
    }, 1000)
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Please Login</h1>
          <p className="text-gray-600">You need to be logged in to view your enquiries.</p>
        </div>
      </div>
    )
  }

  const filteredEnquiries = enquiries.filter(enquiry => {
    if (filter === 'all') return true
    return enquiry.status === filter
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Enquiries</h1>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 w-fit">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All ({enquiries.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'pending' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Pending ({enquiries.filter(e => e.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('responded')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'responded' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Responded ({enquiries.filter(e => e.status === 'responded').length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
        </div>
      ) : filteredEnquiries.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No enquiries found</h3>
          <p className="text-gray-600">You haven't sent any enquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredEnquiries.map(enquiry => (
            <div key={enquiry.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{enquiry.service}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  enquiry.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {enquiry.status === 'pending' ? 'Pending' : 'Responded'}
                </span>
              </div>
              
              <p className="text-gray-600 mb-3">Provider: {enquiry.provider}</p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-2">Your message:</p>
                <p className="text-gray-900">{enquiry.message}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Sent on {new Date(enquiry.submittedAt).toLocaleDateString()}
                </p>
              </div>

              {enquiry.response && (
                <div className="bg-primary-50 rounded-lg p-4">
                  <p className="text-sm text-primary-700 mb-2">Provider response:</p>
                  <p className="text-gray-900">{enquiry.response}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Responded on {new Date(enquiry.respondedAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
