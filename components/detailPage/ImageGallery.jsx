// components/ImageGallery.js
'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ImageGallery({ images, title, discount }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative">
      <div className="relative aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
        <img 
          src={images[activeImageIndex]} 
          alt={title}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        
        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/40 text-white text-sm rounded-full backdrop-blur-sm">
            {activeImageIndex + 1} / {images.length}
          </div>
        )}

        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
            {discount}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden transition-all ${
                idx === activeImageIndex ? 'ring-3 ring-blue-500 scale-105' : 'hover:scale-105 opacity-70'
              }`}
            >
              <img src={img} alt={`${title} ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}