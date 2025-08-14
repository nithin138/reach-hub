'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import Link from 'next/link'

export default function ProviderDashboard() {
  const { user, isAuthenticated } = useAuth()
  const [stats, setStats] = useState({
    totalServices: 0,
    activeEnquiries: 0,
    totalBookings: 0,
    monthlyRevenue: 0
  })
  const [recentEnquiries, setRecentEnquiries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching provider data
    setTimeout(() => {
      setStats({
        totalServices: 3,
        activeEnquiries: 7,
        totalBookings: 24,
        monthlyRevenue: 2850
      })

      setRecentEnquiries([
        {
          id: 1,
          service: "Professional House Cleaning",
          customer: "Sarah M.",
          message: "I need weekly cleaning service for a 3-bedroom apartment",
          submittedAt: "2024-01-22",
          status: "pending"
        },
        {
          id: 2,
          service: "Deep Carpet Cleaning",
          customer: "John D.",
          message: "Looking for carpet cleaning service for my office",
          submittedAt: "2024-01-21",
          status: "pending"
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="mx-auto px-6 py-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800  text-center">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-300 via-pink-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg mb-4">
          Provider Dashboard
        </h1>
        <p className="text-lg text-white mb-6">
          As a <span className="font-semibold text-purple-700">Service Provider</span>, you can
          manage your profile, accept bookings, track your services,
          and connect directly with customers looking for quality work.
        </p>

        <div className="p-4 rounded-lg shadow-inner mb-8 border border-white/30 bg-white/10 backdrop-blur-md">
          <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-300 via-pink-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg mb-2">Why join as a provider?</h2>
          <ul className="text-left text-gray-200 space-y-2 max-w-md mx-auto">
            <li>✅ Expand your reach and grow your client base</li>
            <li>✅ Manage bookings and payments in one place</li>
            <li>✅ Get real-time notifications for new service requests</li>
            <li>✅ Build trust with verified customer reviews</li>
          </ul>
        </div>


        <p className="text-white mb-8">
          Already have a provider account? Log in now to access your personalized dashboard.
        </p>

        <Link
          href="/auth/login"
          className="inline-block bg-purple-600 text-white font-medium px-6 py-3 rounded-lg shadow-md 
                   hover:bg-purple-700 hover:shadow-lg transition duration-200"
        >
          Login as Provider
        </Link>
      </div>
    )
  }


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || 'Provider'}!
        </h1>
        <p className="text-gray-600">
          Manage your services and respond to customer enquiries
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">{stats.totalServices}</div>
          <div className="text-gray-600">Active Services</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.activeEnquiries}</div>
          <div className="text-gray-600">Pending Enquiries</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{stats.totalBookings}</div>
          <div className="text-gray-600">Total Bookings</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">${stats.monthlyRevenue}</div>
          <div className="text-gray-600">Monthly Revenue</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Link href="/provider/services" className="card group hover:shadow-md transition-all">
          <div className="text-center">
            <div className="text-4xl mb-3">🛠️</div>
            <h3 className="font-semibold text-gray-900 mb-2">Manage Services</h3>
            <p className="text-gray-600 text-sm">Add, edit, or remove your services</p>
          </div>
        </Link>

        <Link href="/provider/enquiries" className="card group hover:shadow-md transition-all">
          <div className="text-center">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="font-semibold text-gray-900 mb-2">View Enquiries</h3>
            <p className="text-gray-600 text-sm">Respond to customer enquiries</p>
          </div>
        </Link>

        <div className="card text-center opacity-50">
          <div className="text-4xl mb-3">📊</div>
          <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
          <p className="text-gray-600 text-sm">View performance metrics</p>
          <span className="text-xs text-gray-500 mt-2 block">Coming Soon</span>
        </div>
      </div>

      {/* Recent Enquiries */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Enquiries</h2>
          <Link href="/provider/enquiries" className="text-primary-600 hover:text-primary-700 font-medium">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
          </div>
        ) : recentEnquiries.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-gray-600">No recent enquiries</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentEnquiries.map(enquiry => (
              <div key={enquiry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{enquiry.service}</h4>
                  <p className="text-sm text-gray-600 mb-1">From: {enquiry.customer}</p>
                  <p className="text-sm text-gray-700">{enquiry.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(enquiry.submittedAt).toLocaleDateString()}
                  </p>
                </div>
                <button className="ml-4 btn-primary text-sm">
                  Respond
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
