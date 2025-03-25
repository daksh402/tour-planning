import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="container px-4 py-20 mx-auto text-center text-white md:py-32">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Discover Your Next Adventure</h1>
        <p className="max-w-2xl mx-auto mt-6 text-xl">
          Search and book flights, trains, and buses all in one place. Plan your journey with ease and explore the
          world.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button size="lg" asChild>
            <Link href="#search-form">Start Planning</Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-white/10">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

