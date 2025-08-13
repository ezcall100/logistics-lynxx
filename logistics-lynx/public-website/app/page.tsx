import { HeroSection } from '@/components/HeroSection'
import { FeaturesSection } from '@/components/FeaturesSection'
import { SolutionsSection } from '@/components/SolutionsSection'
import { CTASection } from '@/components/CTASection'
import { TestimonialsSection } from '@/components/TestimonialsSection'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <SolutionsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
