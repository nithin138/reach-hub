'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    password: '',
    confirmPassword: ''
  })

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text' },
    { name: 'email', label: 'Email address', type: 'email' },
    { name: 'phone', label: 'Phone Number', type: 'tel' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password' }
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Register form data:', formData)
    router.push('/login')
  }
  const inputClass = "mt-1 block w-full rounded-md border border-white/30 bg-white/20 px-3 py-2 text-white placeholder-gray-200 shadow-sm focus:border-pink-400 focus:ring-pink-400 focus:outline-none backdrop-blur-sm";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white/10 p-8 shadow-lg backdrop-blur-lg border border-white/20">
        <h2 className="text-center text-3xl font-bold text-white drop-shadow-lg">
          Create your account
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Radio button for type */}
          <div>
            <label className="block text-sm font-medium text-white">Account Type</label>
            <div className="mt-2 flex gap-6">
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  name="type"
                  value="customer"
                  checked={formData.type === 'customer'}
                  onChange={handleChange}
                  className="h-4 w-4 text-pink-500 focus:ring-pink-400 border-gray-300"
                  required
                />
                <span className="ml-2">Customer</span>
              </label>
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  name="type"
                  value="service_provider"
                  checked={formData.type === 'service_provider'}
                  onChange={handleChange}
                  className="h-4 w-4 text-pink-500 focus:ring-pink-400 border-gray-300"
                  required
                />
                <span className="ml-2">Service Provider</span>
              </label>
            </div>
          </div>
          <div className="space-y-6">
            {/* Full-width Name field */}
            {fields.length > 0 && (
              <div>
                <label htmlFor={fields[0].name} className="block text-sm font-medium text-white">
                  {fields[0].label}
                </label>
                <input
                  id={fields[0].name}
                  name={fields[0].name}
                  type={fields[0].type}
                  value={formData[fields[0].name]}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-white/30 bg-white/20 px-3 py-2 
                   text-white placeholder-gray-200 shadow-sm focus:border-pink-400 
                   focus:ring-pink-400 focus:outline-none backdrop-blur-sm"
                />
              </div>
            )}

            {/* 2-column layout for the rest */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.slice(1).map(({ name, label, type }) => (
                <div key={name}>
                  <label htmlFor={name} className="block text-sm font-medium text-white">
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border border-white/30 bg-white/20 px-3 py-2 
                     text-white placeholder-gray-200 shadow-sm focus:border-pink-400 
                     focus:ring-pink-400 focus:outline-none backdrop-blur-sm"
                  />
                </div>
              ))}
            </div>
          </div>





          <button
            type="submit"
            className="w-full rounded-md bg-pink-500 px-4 py-2 text-white font-medium 
                       hover:bg-pink-600 focus:outline-none focus:ring-2 
                       focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            Sign up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white/90">
          Already have an account?{' '}
          <a href="/auth/login" className="font-medium text-yellow-300 hover:text-yellow-200">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}
