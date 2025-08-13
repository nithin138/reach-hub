'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import SearchBar from '../../components/SearchBar'
import ServiceCard from '../../components/ServiceCard'
import Pagination from '../../components/Pagination'

// Mock data
const mockServices = [
  {
    id: 1,
    title: "Professional House Cleaning",
    category: "Home Services",
    subCategory: "Cleaning",
    provider: "CleanPro Services",
    rating: 4.8,
    image: "/placeholder.jpg",
    location: "New York, NY"
  },
  {
    id: 2,
    title: "Web App Development",
    category: "Technology",
    subCategory: "Web Development",
    provider: "TechGurus",
    rating: 4.6,
    image: "/placeholder.jpg",
    location: "San Francisco, CA"
  },
  // Add more mock services...
]

// Optional: define category buttons for maintainability
const categories = [
  "All Categories",
  "Home Services",
  "Technology",
  "Beauty & Wellness",
  "Education",
  "Events",
  "Transportation"
]

export default function UserDashboard() {
  const { user, isAuthenticated } = useAuth()
  const [services, setServices] = useState(mockServices)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [loading, setLoading] = useState(false)

  // Filtered services based on category and search
  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'All Categories' || service.category === selectedCategory
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleSearch = (query) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
          {isAuthenticated ? `Welcome back, ${user?.name || 'User'}!` : 'Find Services'}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover and book services or products from trusted local providers
        </p>
      </header>

      {/* Search & Categories */}
      <section className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <SearchBar 
            placeholder="Search for services or products..." 
            value={searchQuery}
            onSearch={handleSearch}
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-center md:justify-end">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      ) : (
        <>
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">No services found for this category or search.</p>
          )}

          {/* Pagination */}
          <Pagination 
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  )
}
