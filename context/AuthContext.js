'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        // In a real app, you'd check with your backend API
        // For now, we'll check if there's user data in memory or a token
        const savedUser = typeof window !== 'undefined' ? 
          JSON.parse(sessionStorage.getItem('servicehub_user') || 'null') : null
        
        if (savedUser) {
          setUser(savedUser)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        // Clear any corrupted data
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('servicehub_user')
        }
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email, password, userType = 'customer') => {
    try {
      setLoading(true)
      
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock user data based on email and userType
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        userType, // 'customer' or 'provider'
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        avatar: '/default-avatar.png',
        createdAt: new Date().toISOString(),
        ...(userType === 'provider' && {
          businessName: `${email.split('@')[0]} Services`,
          services: [],
          rating: 0,
          reviewCount: 0,
          verified: false
        })
      }

      // In a real app, you'd receive this from your backend
      setUser(userData)
      setIsAuthenticated(true)
      
      // Store in sessionStorage (in real app, handle tokens properly)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('servicehub_user', JSON.stringify(userData))
      }

      return { success: true, user: userData }
    } catch (error) {
      console.error('Login failed:', error)
      return { success: false, error: 'Login failed. Please try again.' }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200))

      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        ...userData,
        avatar: '/default-avatar.png',
        createdAt: new Date().toISOString(),
        ...(userData.userType === 'provider' && {
          services: [],
          rating: 0,
          reviewCount: 0,
          verified: false
        })
      }

      setUser(newUser)
      setIsAuthenticated(true)
      
      // Store in sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('servicehub_user', JSON.stringify(newUser))
      }

      return { success: true, user: newUser }
    } catch (error) {
      console.error('Registration failed:', error)
      return { success: false, error: 'Registration failed. Please try again.' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    
    // Clear stored data
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('servicehub_user')
    }
  }

  const updateProfile = async (updates) => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))

      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      
      // Update stored data
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('servicehub_user', JSON.stringify(updatedUser))
      }

      return { success: true, user: updatedUser }
    } catch (error) {
      console.error('Profile update failed:', error)
      return { success: false, error: 'Failed to update profile. Please try again.' }
    } finally {
      setLoading(false)
    }
  }

  // Helper functions
  const isProvider = () => user?.userType === 'provider'
  const isCustomer = () => user?.userType === 'customer'

  const value = {
    // State
    user,
    isAuthenticated,
    loading,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    
    // Helpers
    isProvider,
    isCustomer
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}