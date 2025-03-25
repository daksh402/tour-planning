import { SearchForm } from "@/components/search-form"
import { FeaturedDestinations } from "@/components/featured-destinations"
import { RecentBookings } from "@/components/recent-bookings"
import { HeroSection } from "@/components/hero-section"

export default function HomePage() {
  return (
    <div className="min-h-screen ">
      <HeroSection />
      <div className="container px-4 py-12 mx-auto space-y-12">
        <SearchForm />
        <FeaturedDestinations />
        <RecentBookings />
      </div>
    </div>
  )
}

