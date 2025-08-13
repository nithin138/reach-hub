'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const SearchBar = ({ 
  onSearch, 
  placeholder = "What service do you need?",
  showCategories = true,
  className = ""
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const searchInputRef = useRef(null)
  const router = useRouter()

  // Popular service categories
  const serviceCategories = [
    { name: 'Cleaning', icon: '🧹' },
    { name: 'Plumbing', icon: '🔧' },
    { name: 'Electrical', icon: '⚡' },
    { name: 'Gardening', icon: '🌱' },
    { name: 'Moving', icon: '📦' },
    { name: 'Painting', icon: '🎨' },
    { name: 'Carpentry', icon: '🔨' },
    { name: 'IT Support', icon: '💻' }
  ]

  // Search suggestions based on query
  const getSearchSuggestions = (query) => {
    if (!query) return []
    
    const allServices = [
      'House Cleaning', 'Deep Cleaning', 'Office Cleaning', 'Carpet Cleaning',
      'Plumbing Repair', 'Pipe Installation', 'Drain Cleaning', 'Water Heater Repair',
      'Electrical Wiring', 'Light Installation', 'Electrical Repair', 'Panel Upgrade',
      'Garden Maintenance', 'Lawn Mowing', 'Tree Trimming', 'Landscaping',
      'Local Moving', 'Long Distance Moving', 'Packing Services', 'Storage',
      'Interior Painting', 'Exterior Painting', 'Wall Painting', 'Furniture Painting',
      'Furniture Assembly', 'Cabinet Installation', 'Deck Building', 'Home Repair',
      'Computer Repair', 'Network Setup', 'Software Installation', 'Tech Support'
    ]

    return allServices
      .filter(service => service.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5)
  }

  // Get user's current location
  const getCurrentLocation = async () => {
    setIsLoadingLocation(true)
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // In a real app, you'd use a geocoding service
            // For now, we'll simulate it
            await new Promise(resolve => setTimeout(resolve, 1000))
            setLocation('Current Location')
          } catch (error) {
            console.error('Error getting location:', error)
            setLocation('Location unavailable')
          } finally {
            setIsLoadingLocation(false)
          }
        },
        (error) => {
          console.error('Geolocation error:', error)
          setLocation('Location access denied')
          setIsLoadingLocation(false)
        }
      )
    } else {
      setLocation('Geolocation not supported')
      setIsLoadingLocation(false)
    }
  }

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault()
    
    if (!searchQuery.trim()) return
    
    const searchParams = {
      query: searchQuery.trim(),
      location: location.trim() || 'Current Location'
    }
    
    // Call parent callback if provided
    if (onSearch) {
      onSearch(searchParams)
    } else {
      // Navigate to search results page
      const params = new URLSearchParams({
        q: searchParams.query,
        location: searchParams.location
      })
      router.push(`/search?${params.toString()}`)
    }
    
    setShowSuggestions(false)
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
    searchInputRef.current?.focus()
  }

  // Handle category click
  const handleCategoryClick = (categoryName) => {
    setSearchQuery(categoryName)
    searchInputRef.current?.focus()
  }

  // Handle input focus
  const handleInputFocus = () => {
    setShowSuggestions(true)
  }

  // Handle input blur (with delay to allow clicks)
  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200)
  }

  // Initialize with user's location on mount
  useEffect(() => {
    getCurrentLocation()
  }, [])

  const suggestions = getSearchSuggestions(searchQuery)

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Main Search Form */}
      <form onSubmit={handleSearch} className="relative">
        <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {/* Service Search Input */}
          <div className="flex-1 relative">
            <div className="flex items-center px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-200">
              <div className="text-gray-400 mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder={placeholder}
                className="flex-1 outline-none text-gray-700 placeholder-gray-500"
              />
            </div>

            {/* Search Suggestions */}
            {showSuggestions && (searchQuery || suggestions.length > 0) && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="text-gray-700">{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location Input */}
          <div className="sm:w-64">
            <div className="flex items-center px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-200">
              <div className="text-gray-400 mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                className="flex-1 outline-none text-gray-700 placeholder-gray-500"
              />
              {isLoadingLocation ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              ) : (
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="text-blue-600 hover:text-blue-700 ml-2 transition-colors"
                  title="Use current location"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Search Button */}
          <div className="sm:w-auto">
            <button
              type="submit"
              disabled={!searchQuery.trim()}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Popular Categories */}
      {showCategories && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-600 mb-3">Popular Services</h3>
          <div className="flex flex-wrap gap-2">
            {serviceCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category.name)}
                className="inline-flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar