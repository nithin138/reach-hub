import Link from 'next/link'
import SearchBar from './SearchBar'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function HeroSection() {
    return (

        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
                <div className="absolute inset-0 bg-black/20"></div>
                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/30 to-red-600/30 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-teal-600/20 rounded-full filter blur-3xl animate-bounce"></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white mb-8 border border-white/20">
                    <Sparkles className="w-4 h-4 mr-2 text-yellow-300" />
                    <span className="text-sm font-medium">Trusted by 50,000+ customers</span>
                </div>
                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                        Find Amazing
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                        Service Providers
                    </span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-12 text-gray-200 max-w-4xl mx-auto leading-relaxed">
                    Connect with world-class professionals who'll transform your ideas into reality.
                    <br className="hidden md:block" />
                    <span className="text-transparent bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text font-semibold">
                        Quality guaranteed, results delivered.
                    </span>
                </p>
                {/* Search Bar */}
                <div className="max-w-3xl mx-auto mb-12">
                    <div className="relative">
                        <SearchBar
                            placeholder="What service are you dreaming of?"
                            className="transform hover:scale-105 transition-all duration-300"
                        />
                        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
                    </div>
                </div>
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link href="/user" className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                        <div className="relative px-8 py-4 bg-white rounded-xl text-gray-900 font-bold text-lg flex items-center transition-all duration-200 group-hover:scale-105">
                            Explore Services
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    <Link href="/provider" className="group relative">
                        <div className="relative px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-xl text-white font-bold text-lg flex items-center transition-all duration-200 hover:bg-white/20 hover:border-white/40 hover:scale-105">
                            Become a Provider
                            <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform text-yellow-300" />
                        </div>
                    </Link>
                </div>
                {/* Trust Indicators */}
                <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-70">
                    <div className="text-white text-sm">
                        <span className="font-bold text-2xl block">4.9★</span>
                        Average Rating
                    </div>
                    <div className="w-px h-8 bg-white/30"></div>
                    <div className="text-white text-sm">
                        <span className="font-bold text-2xl block">24/7</span>
                        Support
                    </div>
                    <div className="w-px h-8 bg-white/30"></div>
                    <div className="text-white text-sm">
                        <span className="font-bold text-2xl block">100%</span>
                        Verified
                    </div>
                </div>
                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1">
                        <div className="w-1 h-3 bg-white/60 rounded-full mx-auto animate-pulse"></div>
                    </div>
                </div>
            </div>

        </section>
    )
}