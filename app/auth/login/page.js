'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../../context/AuthContext'
import { useRouter } from 'next/navigation'
import { LockClosedIcon, EnvelopeIcon, KeyIcon } from '@heroicons/react/24/solid'

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'user'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(formData.email, formData.password, formData.userType)
      router.push(formData.userType === 'provider' ? '/provider' : '/user')
    } catch {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/30 animate-fadeIn">
        <div className="text-center mb-8">
          <div className="mx-auto h-14 w-14 rounded-full bg-indigo-200 flex items-center justify-center shadow-md">
            <LockClosedIcon className="h-7 w-7 text-indigo-600" />
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-white drop-shadow-lg">
            Welcome Back
          </h2>
          <p className="text-sm text-indigo-100 mt-1">
            Sign in to your account
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-3 rounded-lg mb-4 animate-shake">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Account Type */}
          <div>
            <label className="block text-sm font-medium text-indigo-100 mb-2">
              Account Type
            </label>
            <div className="flex space-x-3">
              {['user', 'provider'].map((type) => (
                <label
                  key={type}
                  className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    formData.userType === type
                      ? 'bg-indigo-500 text-white shadow-md'
                      : 'bg-white/10 text-indigo-100 hover:bg-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    value={type}
                    checked={formData.userType === type}
                    onChange={(e) =>
                      setFormData({ ...formData, userType: e.target.value })
                    }
                    className="hidden"
                  />
                  <span className="capitalize text-sm font-medium">
                    {type === 'user' ? 'Customer' : 'Service Provider'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <EnvelopeIcon className="absolute left-3 top-3.5 h-5 w-5 text-indigo-300" />
            <input
              id="email"
              type="email"
              placeholder="Email address"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-indigo-200 focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <KeyIcon className="absolute left-3 top-3.5 h-5 w-5 text-indigo-300" />
            <input
              id="password"
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-10 p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-indigo-200 focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            />
          </div>

          {/* Remember Me + Forgot */}
          <div className="flex items-center justify-between text-sm text-indigo-100">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-4 w-4 text-pink-400 border-white/30 rounded"
              />
              <span>Remember me</span>
            </label>
            <Link href="#" className="hover:text-pink-300 font-medium transition-colors">
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-pink-500 to-indigo-500 hover:opacity-90 shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 disabled:opacity-50 transition"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-indigo-100">
          Don’t have an account?{' '}
          <Link href="/auth/register" className="text-pink-300 hover:text-pink-200 font-medium transition-colors">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
