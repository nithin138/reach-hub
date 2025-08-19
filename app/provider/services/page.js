'use client'

import { useState, useEffect } from 'react'
import Modal from '../../../components/Modal'
import { Menu, MenuItem, MenuButton, MenuList } from '@headlessui/react'
import { DotsVertical } from 'lucide-react'
import ItemCard from '@/components/provider_dashboard/ItemCard'

export default function ProviderServicesPage() {
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
    // Simulate fetching provider services
    setTimeout(() => {
      setServices([
        {
          id: 1,
          name: "Professional House Cleaning",
          description: "Comprehensive house cleaning services",
          category: "Cleaning",
          price: 50,
          status: "Active",
          enquiries: 12,
          bookings: 8
        },
        {
          id: 2,
          name: "Deep Carpet Cleaning",
          description: "Professional carpet and upholstery cleaning",
          category: "Cleaning",
          price: 80,
          status: "Active",
          enquiries: 5,
          bookings: 3
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

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
      title: service.name,
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

  const handleDeleteService = (id) => {
    setServices(prev => prev.filter(s => s.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingService) {
      setServices(prev =>
        prev.map(s =>
          s.id === editingService.id
            ? { ...s, name: serviceForm.title, description: serviceForm.description, category: serviceForm.category, price: serviceForm.price }
            : s
        )
      )
    } else {
      setServices(prev => [
        ...prev,
        {
          id: Date.now(),
          name: serviceForm.title,
          description: serviceForm.description,
          category: serviceForm.category,
          price: serviceForm.price,
          status: "Active",
          enquiries: 0,
          bookings: 0
        }
      ])
    }
    setShowAddModal(false)
  }

  const addFeature = () => setServiceForm({ ...serviceForm, features: [...serviceForm.features, ''] })
  const updateFeature = (index, value) => {
    const newFeatures = [...serviceForm.features]
    newFeatures[index] = value
    setServiceForm({ ...serviceForm, features: newFeatures })
  }
  const removeFeature = (index) => setServiceForm({ ...serviceForm, features: serviceForm.features.filter((_, i) => i !== index) })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Services</h1>
        <button onClick={handleAddService} className="btn-primary bg-gradient-to-r from-blue-600 to-purple-600">Add New Service</button>
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
          <button onClick={handleAddService} className="btn-primary">Add Your First Service</button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(service => (
            <ItemCard
              key={service.id}
              type="service"
              name={service.name}
              description={service.description}
              price={service.price}
              status={service.status}
              enquiries={service.enquiries}
              bookings={service.bookings}
            >
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="p-2 rounded-full hover:bg-gray-100 transition">
                  <DotsVertical size={20} />
                </MenuButton>
                <MenuList className="bg-white shadow-md rounded-md p-1">
                  <MenuItem as="button" onClick={() => handleEditService(service)} className="w-full text-left px-3 py-1 hover:bg-gray-100 rounded-md">Edit</MenuItem>
                  <MenuItem as="button" onClick={() => handleDeleteService(service.id)} className="w-full text-left px-3 py-1 hover:bg-gray-100 rounded-md">Delete</MenuItem>
                </MenuList>
              </Menu>
            </ItemCard>
          ))}
        </div>
      )}

      {/* Add/Edit Service Modal */}
      {showAddModal && (
        <Modal isOpen={() => setShowAddModal(true)} onClose={() => setShowAddModal(false)}>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 ">{editingService ? 'Edit Service' : 'Add New Service'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Title</label>
                <input type="text" value={serviceForm.title} onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea rows="3" value={serviceForm.description} onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" required />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select value={serviceForm.category} onChange={(e) => setServiceForm({...serviceForm, category: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" required>
                    <option value="">Select Category</option>
                    <option value="Home Services">Home Services</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Technology">Technology</option>
                    <option value="Beauty & Wellness">Beauty & Wellness</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input type="text" value={serviceForm.price} onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="e.g., From $50" required />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 btn-primary bg-gradient-to-r from-blue-600 to-purple-600">{editingService ? 'Update Service' : 'Add Service'}</button>
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  )
}
