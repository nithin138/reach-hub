// app/[type]/[id]/page.js - Main Server Component

import { Star, CheckCircle, ThumbsUp } from "lucide-react"
// re import components
import Breadcrumb from "@/components/detailPage/BreadCrumb"
import { notFound } from 'next/navigation'
import ImageGallery from '@/components/detailPage/ImageGallery'
// import ItemDetails from '@/components/detailPage/ItemDetails'
import ProviderCard from '@/components/detailPage/ProviderCard'
import TabsSection from '@/components/detailPage/TabsSection'
// import ActionButtons from '@/components/detailPage/ActionButtons'

// Server-side data fetching function
async function getItemData(type, id) {
  try {
    // This would typically fetch from your API or database
    // For demo purposes, returning mock data
    const response = await fetch(`${process.env.API_BASE_URL}/api/${type}/${id}`, {
      cache: 'no-store', // or 'force-cache' for static content
      next: { revalidate: 3600 } // Revalidate every hour
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch item')
    }
    
    return response.json()
  } catch (error) {
    // Fallback mock data for development
    return getMockData(type, id)
  }
}

// Mock data function (replace with actual API call)
function getMockData(type, id) {
  const baseData = {
    id: parseInt(id),
    type: type,
    title: type === 'service' ? "Professional House Cleaning Service" : "Premium Cleaning Kit",
    description: type === 'service' 
      ? "Transform your home with our comprehensive cleaning service. We use eco-friendly products and professional techniques to ensure every corner of your home sparkles."
      : "Complete professional-grade cleaning kit with all essential tools and eco-friendly products for maintaining a spotless home.",
    category: type === 'service' ? "Home Services" : "Home & Garden",
    price: type === 'service' ? "From $75" : "$129.99",
    originalPrice: type === 'service' ? "$95" : "$159.99",
    discount: "21% OFF",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7f09?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584622781564-1d987ba11221?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&h=600&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 247,
    totalSales: type === 'service' ? 1230 : 856,
    location: "New York, NY",
    inStock: type === 'product' ? true : null,
    shipping: type === 'product' ? "Free shipping over $100" : null,
    provider: {
      name: type === 'service' ? "CleanPro Solutions" : "EcoClean Supplies",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      verified: true,
      rating: 4.8,
      reviewCount: 892,
      responseTime: "Within 2 hours",
      memberSince: "2019",
      completedJobs: type === 'service' ? 1250 : null,
      totalProducts: type === 'product' ? 45 : null,
      bio: type === 'service' 
        ? "Professional cleaning service with over 8 years of experience. We're committed to providing exceptional service and customer satisfaction."
        : "Premium cleaning supplies manufacturer focused on eco-friendly and effective products for professional and home use."
    },
    features: type === 'service' 
      ? [
          "Fully insured and bonded",
          "Eco-friendly cleaning products", 
          "Flexible scheduling",
          "100% satisfaction guarantee",
          "Same-day availability",
          "Professional equipment included"
        ]
      : [
          "Professional-grade cleaning tools",
          "Eco-friendly cleaning solutions",
          "Microfiber cloths included",
          "30-day money-back guarantee",
          "Free shipping on orders over $100",
          "Complete instruction guide"
        ],
    specifications: type === 'service'
      ? {
          "Duration": "2-4 hours",
          "Service Area": "Manhattan, Brooklyn, Queens",
          "Availability": "Mon-Sat, 8AM-8PM",
          "Team Size": "2-3 professionals",
          "Languages": "English, Spanish",
          "Payment": "Cash, Card, Digital"
        }
      : {
          "Kit Contents": "15 premium items",
          "Weight": "3.2 lbs",
          "Dimensions": "12\" x 8\" x 6\"",
          "Material": "Eco-friendly materials",
          "Warranty": "2 years",
          "Origin": "Made in USA"
        },
    reviews: [
      {
        id: 1,
        user: "Sarah Mitchell",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b381e3f2?w=50&h=50&fit=crop&crop=face",
        rating: 5,
        comment: type === 'service' 
          ? "Absolutely amazing service! The team was punctual, professional, and left my house spotless. I'll definitely book again!"
          : "Amazing cleaning kit! Everything I needed in one package. The quality is exceptional and it makes cleaning so much easier.",
        date: "2024-01-15",
        helpful: 12,
        verified: true,
        images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=150&fit=crop"]
      },
      {
        id: 2,
        user: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        rating: 5,
        comment: type === 'service'
          ? "Exceptional attention to detail. They cleaned areas I didn't even think about. Highly recommended!"
          : "Best cleaning products I've ever used. Eco-friendly and incredibly effective. Worth every penny!",
        date: "2024-01-10",
        helpful: 8,
        verified: true
      }
    ]
  }

  return baseData
}

// Main page component (Server Component)
export default async function DetailPage({ params }) {
  const { type, id } = params
  
  // Validate type parameter
  if (!['service', 'product'].includes(type)) {
    notFound()
  }

  // Fetch data on server side
  const itemData = await getItemData(type, id)
  
  if (!itemData) {
    notFound()
  }

  const {
    title,
    description,
    category,
    images,
    price,
    originalPrice,
    discount,
    rating,
    reviewCount,
    totalSales,
    provider,
    features,
    specifications,
    reviews,
    location,
    inStock,
    shipping
  } = itemData

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb & Actions */}
          <Breadcrumb 
            category={category}
            title={title}
          />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Image Gallery */}
            <div className="lg:col-span-7">
              <ImageGallery 
                images={images}
                title={title}
                discount={discount}
              />
            </div>

            {/* Provider Card */}
            <div className="lg:col-span-5">
              <ProviderCard 
                provider={provider}
                price={price}
                originalPrice={originalPrice}
                rating={rating}
                reviewCount={reviewCount}
                totalSales={totalSales}
                type={type}
                inStock={inStock}
                shipping={shipping}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TabsSection 
          title={title}
          description={description}
          features={features}
          specifications={specifications}
          reviews={reviews}
          provider={provider}
          type={type}
        />
      </div>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { type, id } = await params
  const itemData = await getItemData(type, id)
  
  if (!itemData) {
    return {
      title: 'Item Not Found',
      description: 'The requested item could not be found.'
    }
  }

  return {
    title: `${itemData.title} - ${itemData.provider.name}`,
    description: itemData.description,
    openGraph: {
      title: itemData.title,
      description: itemData.description,
      images: [itemData.images[0]],
      type: 'website',
    },
  }
}

// Generate static params for static generation (optional)
export async function generateStaticParams() {
  // Return array of { type: 'service', id: '1' } objects
  // This would typically come from your database/API
  return [
    { type: 'service', id: '1' },
    { type: 'service', id: '2' },
    { type: 'product', id: '1' },
    { type: 'product', id: '2' },
  ]
}

// === COMPONENT FILES ===