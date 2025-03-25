import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <>
    <div className="relative bg-transparent bg-black/40">
      <Image className="absolute h-full w-full top-0 -z-10" src="https://imgs.search.brave.com/7JPr6LCD--6fj92MW_RE1pc9OvX1rBWqMhRbhawzmaM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9h/aXJwb3J0LXRlcm1p/bmFsXzE0MTctMTQ1/Ni5qcGc_c2VtdD1h/aXNfaHlicmlk" height={200} width={300} alt="hero"/>
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
    </>
  )
}

