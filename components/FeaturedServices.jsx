import Link from 'next/link'
import ServiceCard from './ServiceCard'
import { Award, Star } from 'lucide-react'

// Enhanced mock data
const featuredServices = [
    {
        id: 1,
        title: "Premium House Cleaning Service",
        category: "Cleaning",
        provider: "CleanPro Elite",
        rating: 4.9,
        reviewCount: 247,
        price: "From $75",
        image: "/placeholder.jpg",
        location: "New York, NY",
        description: "Professional deep cleaning with eco-friendly products. Trusted by families for over 5 years.",
        responseTime: "Responds in 30 minutes",
        isVerified: true,
        badge: "Top Rated"
    },
    {
        id: 2,
        title: "Expert Plumbing & Emergency Repairs",
        category: "Home Repair",
        provider: "Fix-It Masters",
        rating: 4.8,
        reviewCount: 189,
        price: "From $95",
        image: "/placeholder.jpg",
        location: "Los Angeles, CA",
        description: "24/7 emergency plumbing service. Licensed, insured, and guaranteed work.",
        responseTime: "Available now",
        isVerified: true,
        badge: "Emergency Service"
    },
    {
        id: 3,
        title: "Full-Stack Web Development",
        category: "Technology",
        provider: "DevCraft Solutions",
        rating: 5.0,
        reviewCount: 156,
        price: "From $1,200",
        image: "/placeholder.jpg",
        location: "Remote",
        description: "Custom web applications with modern tech stack. Portfolio of 100+ successful projects.",
        responseTime: "Usually responds in 2 hours",
        isVerified: true,
        badge: "Featured"
    }
]

export default function FeaturedServicesSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-full filter blur-3xl -translate-x-1/2"></div>
                <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-r from-pink-100/50 to-orange-100/50 rounded-full filter blur-3xl translate-x-1/2"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full text-gray-700 mb-6">
                        <Award className="w-4 h-4 mr-2 text-yellow-600" />
                        <span className="text-sm font-semibold">Hand-picked Excellence</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black mb-6">
                        <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            Featured
                        </span>
                        <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                            {" "}Premium Services
                        </span>
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Discover our most trusted and highly-rated service providers.
                        <br />
                        <span className="font-semibold text-gray-800">Quality guaranteed, satisfaction delivered.</span>
                    </p>
                </div>

                {/* Services Grid with Enhanced Layout */}
                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    {featuredServices.map((service, index) => (
                        <div key={service.id} className="relative group">
                            {/* Featured Badge for First Service */}
                            {index === 0 && (
                                <div className="absolute -top-3 -right-3 z-20">
                                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                                        <Star className="w-3 h-3 mr-1 fill-current" />
                                        BEST SELLER
                                    </div>
                                </div>
                            )}

                            {/* Glowing Effect on Hover */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>

                            <div className="relative">
                                <ServiceCard service={service} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 py-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl">
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                            98%
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Customer Satisfaction</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                            24/7
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Support Available</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                            1M+
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Services Completed</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                            4.9★
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Average Rating</div>
                    </div>
                </div>

                {/* Enhanced CTA Section */}
                <div className="text-center relative">
                    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-12 relative overflow-hidden border border-gray-100 shadow-lg">
                        {/* Floating Gradient Orbs */}
                        <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-500/30 filter blur-3xl animate-pulse"></div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-r from-pink-400/30 to-red-400/30 filter blur-3xl animate-pulse delay-500"></div>

                        {/* Subtle Pattern */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22M20%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10zm10%200c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                Ready to find your perfect service provider?
                            </h3>
                            <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                                Join thousands of satisfied customers who found exactly what they needed through our platform.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                {/* Primary Button with subtle glow */}
                                <Link href="/user/services" className="group relative">
                                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-20 group-hover:opacity-50 blur-lg transition duration-700"></div>
                                    <div className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 flex items-center">
                                        Explore All Services
                                        <svg
                                            className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </Link>

                                {/* Secondary Button */}
                                <Link
                                    href="/provider"
                                    className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center"
                                >
                                    List Your Service
                                    <Award className="ml-2 w-5 h-5 text-yellow-500" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}