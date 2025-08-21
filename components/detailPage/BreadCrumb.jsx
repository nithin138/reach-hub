// components/Breadcrumb.js
'use client'
import { Share2, Heart } from 'lucide-react'
import { useState } from 'react'

export default function Breadcrumb({ category, title }) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  return (
    <div className="flex items-center justify-between mb-6">
      <nav className="text-sm text-gray-500">
        <span className="hover:text-gray-700 cursor-pointer">Home</span> 
        <span className="mx-2">›</span>
        <span className="hover:text-gray-700 cursor-pointer">{category}</span>
        <span className="mx-2">›</span>
        <span className="text-gray-900 font-medium">{title}</span>
      </nav>
      <div className="flex items-center gap-3">
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`p-2 rounded-full transition-colors ${isBookmarked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
        >
          <Heart className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  )
}