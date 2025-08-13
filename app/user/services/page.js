'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import SearchBar from '../../../components/SearchBar'
import ServiceCard from '../../../components/ServiceCard'
import Pagination from '../../../components/Pagination'

// Categories for filter
const categoriesList = [
  "All Categories",
  "Home Services",
  "Technology",
  "Beauty & Wellness",
  "Education",
  "Events",
  "Transportation"
]

// Mock services
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
]

export default function ServicesPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category') || 'All Categories'

  const [services, setServices] = useState(mockServices)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'All Categories' || service.category === selectedCategory
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setServices(mockServices)
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [selectedCategory, currentPage, searchQuery])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
          {selectedCategory !== 'All Categories' ? `${selectedCategory} Services` : 'All Services'}
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Explore top-rated services and products in your preferred category
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <Sidebar 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categoriesList}
        />

        {/* Main Content */}
        <main className="flex-1">
          <div className="mb-6">
            <SearchBar 
              placeholder="Search services or products..."
              value={searchQuery}
              onSearch={setSearchQuery}
            />
          </div>

          {loading ? (
            <Loader />
          ) : (
            <>
              {filteredServices.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredServices.map(service => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-12">
                  No services found for this category or search.
                </p>
              )}

              <Pagination 
                currentPage={currentPage}
                totalPages={5}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </main>
      </div>
    </div>
  )
}

/* ---------------------- Sidebar Component ---------------------- */
function Sidebar({ selectedCategory, onCategoryChange, categories }) {
  return (
    <aside className="lg:w-1/4">
      <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Filter by Category</h3>
        <div className="flex flex-col gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`text-left px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

/* ---------------------- Loader Component ---------------------- */
function Loader() {
  return (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading services...</p>
    </div>
  )
}
