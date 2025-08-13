'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import Modal from '../../../components/Modal'

export default function ProviderServicesPage() {
  const { user, isAuthenticated } = useAuth()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    serviceArea: '',
    features: ['']
  })

  useEffect(() => {
    if (!isAuthenticated) return

    // Simulate fetching provider services
    setTimeout(() => {
      setServices([
        {
          id: 1,
          title: "Professional House Cleaning",
          description: "Comprehensive house cleaning services",
          category: "Cleaning",
          price: "From $50",
          status: "active",
          enquiries: 12,
          bookings: 8
        },
        {
          id: 2,
          title: "Deep Carpet Cleaning",
          description: "Professional carpet and upholstery cleaning",
          category: "Cleaning",
          price: "From $80",
          status: "active",
          enquiries: 5,
          bookings: 3
        }
      ])
      setLoading(false)
    }, 1000)
  }, [isAuthenticated])

  const handleAddService = () => {
    setServiceForm({
      title: '',
      description: '',
      category: '',
      price: '',
      duration: '',
      serviceArea: '',
      features: ['']
    })
    setEditingService(null)
    setShowAddModal(true)
  }

  const handleEditService = (service) => {
    setServiceForm({
      title: service.title,
      description: service.description,
      category: service.category,
      price: service.price,
      duration: service.duration || '',
      serviceArea: service.serviceArea || '',
      features: service.features || ['']
    })
    setEditingService(service)
    setShowAddModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In real app, this would make an API call
    console.log('Submitting service:', serviceForm)
    setShowAddModal(false)
  }

  const addFeature = () => {
    setServiceForm({
      ...serviceForm,
      features: [...serviceForm.features, '']
    })
  }

  const updateFeature = (index, value) => {
    const newFeatures = [...serviceForm.features]
    newFeatures[index] = value
    setServiceForm({
      ...serviceForm,
      features: newFeatures
    })
  }

  const removeFeature = (index) => {
    setServiceForm({
      ...serviceForm,
      features: serviceForm.features.filter((_, i) => i !== index)
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Please Login</h1>
          <p className="text-gray-600">You need to be logged in to manage your services.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Services</h1>
        <button onClick={handleAddService} className="btn-primary">
          Add New Service
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No services yet</h3>
          <p className="text-gray-600 mb-6">Start by adding your first service offering</p>
          <button onClick={handleAddService} className="btn-primary">
            Add Your First Service
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {services.map(service => (
            <div key={service.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                  <p className="text-gray-600">{service.category}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    service.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {service.status}
                  </span>
                  <button 
                    onClick={() => handleEditService(service)}
                    className="btn-secondary text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{service.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-primary-600">{service.price}</div>
                <div className="flex gap-6 text-sm text-gray-600">
                  <span>{service.enquiries} enquiries</span>
                  <span>{service.bookings} bookings</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Service Modal */}
      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Title
                </label>
                <input
                  type="text"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                ></textarea>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({...serviceForm, category: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Home Services">Home Services</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Technology">Technology</option>
                    <option value="Beauty & Wellness">Beauty & Wellness</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <input
                    type="text"
                    value={serviceForm.price}
                    onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., From $50"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={serviceForm.duration}
                    onChange={(e) => setServiceForm({...serviceForm, duration: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., 2-4 hours"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Area
                  </label>
                  <input
                    type="text"
                    value={serviceForm.serviceArea}
                    onChange={(e) => setServiceForm({...serviceForm, serviceArea: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Manhattan, Brooklyn"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Features
                </label>
                {serviceForm.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter feature"
                    />
                    {serviceForm.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  + Add Feature
                </button>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 btn-primary">
                  {editingService ? 'Update Service' : 'Add Service'}
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
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