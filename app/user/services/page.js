'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Star, Filter, Grid, List, ChevronDown } from 'lucide-react'
import Pagination from '@/components/Pagination'

// Categories with subcategories
const categoriesData = {
  "All Categories": [],
  "Home Services": ["Cleaning", "Plumbing", "Electrical", "Gardening", "Painting"],
  "Technology": ["Web Development", "Mobile Apps", "IT Support", "Data Analysis", "Design"],
  "Beauty & Wellness": ["Haircut", "Massage", "Skincare", "Fitness", "Yoga"],
  "Education": ["Tutoring", "Language Learning", "Music Lessons", "Coaching", "Workshops"],
  "Events": ["Photography", "Catering", "DJ Services", "Planning", "Decoration"],
  "Transportation": ["Delivery", "Moving", "Taxi", "Car Rental", "Logistics"]
}

// Mock services and products
const mockItems = [
  {
    id: 1,
    title: "Professional House Cleaning Service",
    type: "service",
    category: "Home Services",
    subCategory: "Cleaning",
    provider: "CleanPro Services",
    rating: 4.8,
    reviewCount: 124,
    price: "$80/session",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    location: "New York, NY",
    distance: "2.3 miles",
    featured: true,
    description: "Professional deep cleaning service for your home with eco-friendly products."
  },
  {
    id: 2,
    title: "Custom Web Application Development",
    type: "service",
    category: "Technology",
    subCategory: "Web Development",
    provider: "TechGurus Inc",
    rating: 4.9,
    reviewCount: 89,
    price: "From $2,500",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    location: "San Francisco, CA",
    distance: "5.1 miles",
    featured: false,
    description: "Full-stack web development with modern technologies and responsive design."
  },
  {
    id: 3,
    title: "Organic Skincare Products Bundle",
    type: "product",
    category: "Beauty & Wellness",
    subCategory: "Skincare",
    provider: "Natural Beauty Co",
    rating: 4.7,
    reviewCount: 203,
    price: "$45.99",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop",
    location: "Los Angeles, CA",
    distance: "1.8 miles",
    featured: true,
    description: "Complete skincare routine with natural and organic ingredients."
  },
  {
    id: 4,
    title: "Private Guitar Lessons",
    type: "service",
    category: "Education",
    subCategory: "Music Lessons",
    provider: "Music Masters",
    rating: 4.8,
    reviewCount: 67,
    price: "$60/hour",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    location: "Austin, TX",
    distance: "3.7 miles",
    featured: false,
    description: "Learn guitar from experienced instructor with personalized lessons."
  },
  {
    id: 5,
    title: "Wedding Photography Package",
    type: "service",
    category: "Events",
    subCategory: "Photography",
    provider: "Capture Moments",
    rating: 4.9,
    reviewCount: 156,
    price: "$1,200",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
    location: "Miami, FL",
    distance: "4.2 miles",
    featured: true,
    description: "Professional wedding photography with full day coverage and editing."
  },
  {
    id: 6,
    title: "Premium Yoga Mat Set",
    type: "product",
    category: "Beauty & Wellness",
    subCategory: "Fitness",
    provider: "Zen Equipment",
    rating: 4.6,
    reviewCount: 91,
    price: "$89.99",
    image: "https://images.unsplash.com/photo-1506629905607-62b39f7a0caf?w=400&h=300&fit=crop",
    location: "Seattle, WA",
    distance: "6.1 miles",
    featured: false,
    description: "High-quality yoga mat with accessories for your perfect practice."
  }
]

export default function ServicesMarketplace() {
  const [items, setItems] = useState(mockItems)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedSubCategory, setSelectedSubCategory] = useState('')
  const [locationQuery, setLocationQuery] = useState('')
  const [viewType, setViewType] = useState('grid')
  const [sortBy, setSortBy] = useState('featured')

  const itemsPerPage = 6

  // Filter and sort items
  // const filteredItems = items.filter(item => {
  //   const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory
  //   const matchesSubCategory = !selectedSubCategory || item.subCategory === selectedSubCategory
  //   const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //                        item.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //                        item.description.toLowerCase().includes(searchQuery.toLowerCase())
  //   const matchesLocation = !locationQuery || item.location.toLowerCase().includes(locationQuery.toLowerCase())

  //   return matchesCategory && matchesSubCategory && matchesSearch && matchesLocation
  // })

  // Sort items


  const [selectedType, setSelectedType] = useState("all") // NEW


  // Filter and sort items
  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory
    const matchesSubCategory = !selectedSubCategory || item.subCategory === selectedSubCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = !locationQuery || item.location.toLowerCase().includes(locationQuery.toLowerCase())
    const matchesType = selectedType === "all" || item.type === selectedType  // NEW

    return matchesCategory && matchesSubCategory && matchesSearch && matchesLocation && matchesType
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'price':
        return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''))
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance)
      case 'featured':
      default:
        return b.featured - a.featured
    }
  })

  // Pagination
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage)
  const paginatedItems = sortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setSelectedSubCategory('')
    setCurrentPage(1)
  }

  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategory(subCategory === selectedSubCategory ? '' : subCategory)
    setCurrentPage(1)
  }

  const handleSearch = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setCurrentPage(1)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {selectedCategory !== 'All Categories' ? `${selectedCategory}` : 'Services & Products'}
              </h1>
              <p className="text-gray-600 mt-1">
                Discover top-rated services and products near you
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {sortedItems.length} results found
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewType('grid')}
                  className={`p-2 rounded-lg ${viewType === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewType('list')}
                  className={`p-2 rounded-lg ${viewType === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Sidebar - Categories */}
          <aside className="lg:w-1/5">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                {Object.keys(categoriesData).map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md transform scale-[1.02]'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-[1.01]'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">

            {/* Right Panel - Search & Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search services or products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Location Search */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Location..."
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="featured">Featured First</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price">Price: Low to High</option>
                    <option value="distance">Nearest First</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
                >
                  Search
                </button>
              </div>

              {/* Subcategories */}
              {selectedCategory !== 'All Categories' && categoriesData[selectedCategory].length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Subcategories:</h4>
                  <div className="flex flex-wrap gap-2">
                    {categoriesData[selectedCategory].map(subCat => (
                      <button
                        key={subCat}
                        onClick={() => handleSubCategoryChange(subCat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedSubCategory === subCat
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        {subCat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Tabs for Services / Products */}
            <div className="flex space-x-4 mb-6">
              {["all", "service", "product"].map(type => (
                <button
                  key={type}
                  onClick={() => { setSelectedType(type); setCurrentPage(1) }}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${selectedType === type
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {type === "all" ? "All" : type === "service" ? "Services" : "Products"}
                </button>
              ))}
            </div>

            {/* Results */}
            {loading ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Finding the best matches for you...</p>
              </div>
            ) : (
              <>
                {paginatedItems.length > 0 ? (
                  <div className={`grid gap-6 mb-8 ${viewType === 'grid'
                      ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                      : 'grid-cols-1'
                    }`}>
                    {paginatedItems.map(item => (
                      <ItemCard key={item.id} item={item} viewType={viewType} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria or browse different categories.</p>
                  </div>
                )}

                {/* Pagination */}
                {/* {totalPages > 1 && ( */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                {/* )} */}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

// Reusable Item Card Component
function ItemCard({ item, viewType }) {
  const isGridView = viewType === 'grid'

  return (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group ${isGridView ? 'flex-col' : 'flex flex-col md:flex-row'
      }`}>
      {/* Featured Badge */}
      {/* {item.featured && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          FEATURED
        </div>
      )} */}

      {/* Image */}
      <div className={`relative overflow-hidden ${isGridView ? 'h-48' : 'md:w-64 h-48 md:h-auto'
        }`}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
          <span className={`text-xs font-medium ${item.type === 'service' ? 'text-blue-600' : 'text-green-600'
            }`}>
            {item.type.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center mb-3">
          <div className="flex items-center mr-4">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-900">{item.rating}</span>
            <span className="ml-1 text-sm text-gray-500">({item.reviewCount})</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{item.distance}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{item.provider}</p>
            <p className="text-sm text-gray-500">{item.location}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-blue-600">{item.price}</p>
          </div>
        </div>

        <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium">
          {item.type === 'service' ? 'Book Now' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

// // Pagination Component
// function Pagination({ currentPage, totalPages, onPageChange }) {
//   const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

//   return (
//     <div className="flex justify-center items-center space-x-2 mt-8">
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         Previous
//       </button>

//       {pages.map(page => (
//         <button
//           key={page}
//           onClick={() => onPageChange(page)}
//           className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === page
//               ? 'bg-blue-500 text-white'
//               : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
//             }`}
//         >
//           {page}
//         </button>
//       ))}

//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         Next
//       </button>
//     </div>
//   )
// }