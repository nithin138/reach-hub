'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import Modal from '../../../components/Modal'

export default function ProviderEnquiriesPage() {
  const { user, isAuthenticated } = useAuth()
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, pending, responded
  const [respondingTo, setRespondingTo] = useState(null)
  const [response, setResponse] = useState('')

  useEffect(() => {
    if (!isAuthenticated) return

    // Simulate fetching enquiries
    setTimeout(() => {
      setEnquiries([
        {
          id: 1,
          service: "Professional House Cleaning",
          customer: {
            name: "Sarah M.",
            avatar: "/default-avatar.png"
          },
          message: "I need weekly cleaning service for a 3-bedroom apartment. What are your rates and availability?",
          submittedAt: "2024-01-22T10:30:00Z",
          status: "pending",
          preferredDate: "2024-01-25",
          budget: "$100-150",
          response: null
        },
        {
          id: 2,
          service: "Deep Carpet Cleaning",
          customer: {
            name: "John D.",
            avatar: "/default-avatar.png"
          },
          message: "Looking for carpet cleaning service for my office space. About 2000 sq ft.",
          submittedAt: "2024-01-21T14:20:00Z",
          status: "responded",
          preferredDate: "2024-01-30",
          budget: "$200-300",
          response: "Thank you for your enquiry! I'd be happy to clean your office carpets. For 2000 sq ft, my rate is $250. I'm available on your preferred date. Shall we schedule a consultation?",
          respondedAt: "2024-01-21T16:45:00Z"
        },
        {
          id: 3,
          service: "Window Cleaning Service",
          customer: {
            name: "Mike R.",
            avatar: "/default-avatar.png"
          },
          message: "Need exterior window cleaning for a 2-story house. When are you available?",
          submittedAt: "2024-01-20T09:15:00Z",
          status: "pending",
          preferredDate: "2024-01-28",
          budget: "$80-120",
          response: null
        }
      ])
      setLoading(false)
    }, 1000)
  }, [isAuthenticated])

  const handleRespond = (enquiry) => {
    setRespondingTo(enquiry)
    setResponse('')
  }

  const handleSubmitResponse = async (e) => {
    e.preventDefault()

    // In real app, this would make an API call
    console.log('Submitting response:', { enquiryId: respondingTo.id, response })

    // Update enquiry status locally
    setEnquiries(enquiries.map(enquiry => 
      enquiry.id === respondingTo.id 
        ? { 
            ...enquiry, 
            status: 'responded', 
            response, 
            respondedAt: new Date().toISOString() 
          } 
        : enquiry
    ))

    setRespondingTo(null)
    setResponse('')
  }

  const filteredEnquiries = enquiries.filter(enquiry => {
    if (filter === 'all') return true
    return enquiry.status === filter
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Please Login</h1>
          <p className="text-gray-600">You need to be logged in to view enquiries.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading enquiries...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Service Enquiries</h1>

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

      {/* Enquiries List */}
      {filteredEnquiries.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No enquiries found</h3>
          <p className="text-gray-600">
            {filter === 'all' 
              ? "You haven't received any service enquiries yet." 
              : `No ${filter} enquiries at the moment.`
            }
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredEnquiries.map((enquiry) => (
            <div key={enquiry.id} className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={enquiry.customer.avatar}
                      alt={enquiry.customer.name}
                      className="w-10 h-10 rounded-full bg-gray-200"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMjAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHBhdGggZD0iTTEyIDEyQzE0LjIwOTEgMTIgMTYgMTAuMjA5MSAxNiA4QzE2IDUuNzkwODYgMTQuMjA5MSA0IDEyIDRDOS43OTA4NiA0IDggNS43OTA4NiA4IDhDOCAxMC4yMDkxIDkuNzkwODYgMTIgMTIgMTJaIiBmaWxsPSIjOUIxMTE4Ii8+CjxwYXRoIGQ9Ik0xMiAxNEM5LjMzIDIwIDUgMTcuMzMgNSAxNEM1IDEyLjM0IDYuMzQgMTEgOCAxMUgxNkMxNy42NiAxMSAxOSAxMi4zNCAxOSAxNEM5IDIwIDEyIDE0IDEyIDE0WiIgZmlsbD0iIzlCMTExOCIvPgo8L3N2Zz4KPC9zdmc+'
                      }}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{enquiry.customer.name}</h3>
                      <p className="text-sm text-gray-600">{enquiry.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      enquiry.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {enquiry.status === 'pending' ? 'Awaiting Response' : 'Responded'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(enquiry.submittedAt)}
                    </span>
                  </div>
                </div>

                {/* Enquiry Details */}
                <div className="mb-4">
                  <p className="text-gray-700 mb-3">{enquiry.message}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">Preferred Date:</span>
                      <span>{new Date(enquiry.preferredDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">Budget:</span>
                      <span>{enquiry.budget}</span>
                    </div>
                  </div>
                </div>

                {/* Response Section */}
                {enquiry.status === 'responded' && enquiry.response && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-blue-900">Your Response</h4>
                      <span className="text-sm text-blue-600">
                        {formatDate(enquiry.respondedAt)}
                      </span>
                    </div>
                    <p className="text-blue-800">{enquiry.response}</p>
                  </div>
                )}

                {/* Action Button */}
                {enquiry.status === 'pending' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleRespond(enquiry)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Respond to Enquiry
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Response Modal */}
      {respondingTo && (
        <Modal
          isOpen={true}
          onClose={() => setRespondingTo(null)}
          title="Respond to Enquiry"
        >
          <div className="p-6">
            {/* Enquiry Summary */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={respondingTo.customer.avatar}
                  alt={respondingTo.customer.name}
                  className="w-8 h-8 rounded-full bg-gray-200"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iMTYiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHN2ZyBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLXVzZXIiIGZpbGw9Im5vbmUiIGhlaWdodD0iMTYiIHN0cm9rZT0iIzlCMTExOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjE2Ij4KPHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAgMC00LTRIOGE0IDQgMCAwIDAtNCA0djIiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ii8+Cjwvc3ZnPgo8L3N2Zz4='
                  }}
                />
                <div>
                  <h3 className="font-medium text-gray-900">{respondingTo.customer.name}</h3>
                  <p className="text-sm text-gray-600">{respondingTo.service}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-2">{respondingTo.message}</p>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Budget:</span> {respondingTo.budget} • 
                <span className="font-medium ml-2">Preferred Date:</span> {new Date(respondingTo.preferredDate).toLocaleDateString()}
              </div>
            </div>

            {/* Response Form */}
            <form onSubmit={handleSubmitResponse}>
              <div className="mb-4">
                <label htmlFor="response" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Response
                </label>
                <textarea
                  id="response"
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Write your response to the customer..."
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setRespondingTo(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={!response.trim()}
                >
                  Send Response
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  )
}