import HeroSection from '@/components/HeroSection'
import CategoriesSection from '@/components/CAtegoriesSection'
import FeaturedServicesSection from '@/components/FeaturedServices'
import StatsSection from '@/components/StatsSection'

export default function HomePage() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <CategoriesSection />
      <FeaturedServicesSection />
      <StatsSection />
    </div>
  )
}