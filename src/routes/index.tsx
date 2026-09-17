import Header from '#/components/header'
import HeroCard from '#/components/hero-card'
import HeroContent from '#/components/hero-content'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />

      {/* Hero Section */}
      <div className=" mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <HeroContent />
        <HeroCard />
      </div>
    </div>
  )
}
