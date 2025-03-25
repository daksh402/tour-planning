import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const destinations = [
  {
    id: 1,
    name: "Paris, France",
    image: "/placeholder.svg?height=200&width=300",
    price: "From $299",
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    image: "/placeholder.svg?height=200&width=300",
    price: "From $799",
  },
  {
    id: 3,
    name: "New York, USA",
    image: "/placeholder.svg?height=200&width=300",
    price: "From $349",
  },
  {
    id: 4,
    name: "Sydney, Australia",
    image: "/placeholder.svg?height=200&width=300",
    price: "From $899",
  },
]

export function FeaturedDestinations() {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Featured Destinations</h2>
        <Link href="/destinations" className="text-primary hover:underline">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {destinations.map((destination) => (
          <Link key={destination.id} href={`/destinations/${destination.id}`}>
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                width={300}
                height={200}
                className="object-cover w-full h-40"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold">{destination.name}</h3>
                <p className="text-sm text-primary">{destination.price}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

