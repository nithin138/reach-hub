import Link from 'next/link'
import { TrendingUp } from 'lucide-react'

const gradients = [
  "from-blue-500 to-cyan-400",
  "from-purple-500 to-pink-400",
  "from-pink-500 to-rose-400",
  "from-emerald-500 to-teal-400",
  "from-orange-500 to-amber-400",
  "from-indigo-500 to-blue-400"
]

// Example backend data
const categoriesFromBackend = [
  { name: "Home Services", icon: "🏠", servicesCount: 800, productsCount: 450, description: "Cleaning, repair & maintenance" },
  { name: "Technology", icon: "💻", servicesCount: 500, productsCount: 390, description: "Web dev, apps & IT support" },
  { name: "Beauty & Wellness", icon: "💅", servicesCount: 420, productsCount: 230, description: "Spa, fitness & personal care" },
  { name: "Education", icon: "📚", servicesCount: 300, productsCount: 120, description: "Tutoring & skill development" },
  { name: "Events", icon: "🎉", servicesCount: 250, productsCount: 130, description: "Planning & entertainment" },
  { name: "Transportation", icon: "🚗", servicesCount: 150, productsCount: 70, description: "Moving & delivery services" }
]

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-gray-700 mb-6">
            <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-semibold">Popular Categories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Explore Services & Products by
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover amazing professionals across various industries, 
            <span className="font-semibold text-gray-800"> all vetted and ready to exceed your expectations</span>
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoriesFromBackend.map((category, index) => {
            const gradient = gradients[index % gradients.length] // Cycle gradients
            return (
              <Link
                key={index}
                href={`/user/services?category=${encodeURIComponent(category.name)}`}
                className="group relative"
              >
                <div className="relative overflow-hidden bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-gray-100">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Hover Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500`}></div>
                  
                  <div className="relative p-8 text-center">
                    {/* Icon */}
                    <div className="relative mb-6 text-6xl">{category.icon}</div>

                    {/* Category Info */}
                    <h3 className={`text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300`}>
                      {category.name}
                    </h3>
                    
                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">{category.description}</p>

                    {/* Services & Products Count */}
                    <div className="flex justify-center gap-2">
                      <div className={`px-3 py-1 bg-gradient-to-r ${gradient} text-white text-sm font-semibold rounded-full`}>
                        {category.servicesCount.toLocaleString()} services
                      </div>
                      <div className={`px-3 py-1 bg-gradient-to-r ${gradient} text-white text-sm font-semibold rounded-full`}>
                        {category.productsCount.toLocaleString()} products
                      </div>
                    </div>

                    {/* Arrow Indicator */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className={`w-8 h-8 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center`}>
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">Can't find what you're looking for?</p>
          <Link href="/user/services" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Browse All Services
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
