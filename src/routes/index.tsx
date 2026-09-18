import Features from '#/components/features-section/features'
import Footer from '#/components/footer'
import HeroCard from '#/components/hero-section/hero-card'
import HeroContent from '#/components/hero-section/hero-content'
import HowItWorks from '#/components/how-it-works-section/how-it-works'
import ProductShowcase from '#/components/product-showcase-section/product-showcase'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div
        id="hero"
        className="
          mx-auto grid w-full max-w-7xl
          items-center justify-items-center
          gap-10
          px-4 py-8
          sm:px-6 sm:py-10
          lg:grid-cols-2 lg:gap-16 lg:py-14
        "
      >
        <HeroContent />
        <HeroCard />
      </div>

      {/* Features Section */}
      <Features />

      {/* Product Showcase Section */}
      <ProductShowcase />

      {/* How it works Section */}
      <HowItWorks />

      {/* Footer */}
      <Footer />
    </div>
  )
}
