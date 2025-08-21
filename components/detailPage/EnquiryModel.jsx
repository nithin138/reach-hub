// components/EnquiryModal.js
'use client'
import { useState } from 'react'

export default function EnquiryModal({ provider, type, onClose }) {
  const [enquiryData, setEnquiryData] = useState({
    message: '',
    preferredDate: '',
    budget: '',
    quantity: type === 'product' ? 1 : undefined
  })

  const handleSubmit = () => {
    console.log('Submitting enquiry:', enquiryData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {type === 'service' ? 'Contact' : 'Order from'} {provider.name}
          </h3>
          
          <div className="space-y-6">
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-2">
                Your Message *
              </div>
              <textarea
                rows="4"
                value={enquiryData.message}
                onChange={(e) => setEnquiryData({...enquiryData, message: e.target.value})}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder={type === 'service' 
                  ? "Tell us about your requirements..." 
                  : "Any specific requirements or questions..."}
              />
            </div>
            
            {type === 'service' && (
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </div>
                <input
                  type="date"
                  value={enquiryData.preferredDate}
                  onChange={(e) => setEnquiryData({...enquiryData, preferredDate: e.target.value})}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            )}

            {type === 'product' && (
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </div>
                <input
                  type="number"
                  min="1"
                  value={enquiryData.quantity}
                  onChange={(e) => setEnquiryData({...enquiryData, quantity: parseInt(e.target.value)})}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            )}
            
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-2">
                {type === 'service' ? 'Budget Range' : 'Special Requirements'}
              </div>
              <input
                type="text"
                value={enquiryData.budget}
                onChange={(e) => setEnquiryData({...enquiryData, budget: e.target.value})}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder={type === 'service' ? "e.g., $75-150" : "Any special requirements..."}
              />
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors"
              >
                {type === 'service' ? 'Send Enquiry' : 'Place Order'}
              </button>
              <button 
                onClick={onClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-6 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}