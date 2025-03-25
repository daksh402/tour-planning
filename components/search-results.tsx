import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plane, Train, Bus, Clock, Users, ArrowRight } from "lucide-react"
import { format, addHours, parseISO } from "date-fns"
import Link from "next/link"

type SearchResultsProps = {
  type: string
  from: string
  to: string
  departDate: string
  returnDate?: string
  passengers: number
}

type TransportOption = {
  id: string
  provider: string
  departureTime: Date
  arrivalTime: Date
  duration: string
  price: number
  stops: number
  amenities: string[]
}

export async function SearchResults({ type, from, to, departDate, returnDate, passengers }: SearchResultsProps) {
  // In a real app, this would be an API call to fetch search results
  // Here we're simulating a delay and returning mock data
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Generate mock results based on search parameters
  const results = generateMockResults(type, from, to, departDate, passengers)

  const getTransportIcon = (type: string) => {
    switch (type) {
      case "flight":
        return <Plane className="w-5 h-5" />
      case "train":
        return <Train className="w-5 h-5" />
      case "bus":
        return <Bus className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
        <div className="flex items-center gap-2">
          {getTransportIcon(type)}
          <span className="font-medium">
            {results.length} {type}s found
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span className="text-sm text-muted-foreground">{format(parseISO(departDate), "EEE, MMM d")}</span>
          <Users className="w-4 h-4 ml-2" />
          <span className="text-sm text-muted-foreground">
            {passengers} {passengers === 1 ? "passenger" : "passengers"}
          </span>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((option) => (
            <Card key={option.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="flex flex-col">
                    <div className="text-lg font-semibold">{option.provider}</div>
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      {getTransportIcon(type)}
                      <span className="ml-1 capitalize">{type}</span>
                      {option.stops === 0 && (
                        <Badge variant="outline" className="ml-2">
                          Direct
                        </Badge>
                      )}
                      {option.stops > 0 && (
                        <Badge variant="outline" className="ml-2">
                          {option.stops} {option.stops === 1 ? "stop" : "stops"}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-xl font-bold">{format(option.departureTime, "HH:mm")}</div>
                      <div className="text-sm text-muted-foreground">{from}</div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="text-xs text-muted-foreground">{option.duration}</div>
                      <div className="relative w-20 h-px my-2 bg-border">
                        <ArrowRight className="absolute w-3 h-3 -translate-y-1/2 right-0 top-1/2" />
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-xl font-bold">{format(option.arrivalTime, "HH:mm")}</div>
                      <div className="text-sm text-muted-foreground">{to}</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <div className="text-2xl font-bold">${option.price}</div>
                    <div className="text-sm text-muted-foreground">per person</div>
                  </div>
                </div>

                {option.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {option.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex justify-end p-4 bg-muted/50">
                <Button asChild>
                  <Link
                    href={`/booking/${type}/${option.id}?from=${from}&to=${to}&depart=${departDate}${returnDate ? `&return=${returnDate}` : ""}&passengers=${passengers}`}
                  >
                    Select
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="mb-4 text-muted-foreground">No results found for your search criteria</p>
            <Button asChild>
              <Link href="/">Modify Search</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function generateMockResults(
  type: string,
  from: string,
  to: string,
  departDate: string,
  passengers: number,
): TransportOption[] {
  const baseDate = parseISO(departDate)
  const providers = {
    flight: ["Air Express", "SkyWings", "Global Air", "FastJet", "Coastal Airways"],
    train: ["RailConnect", "Express Rail", "National Railways", "SpeedTrain", "RegionalLink"],
    bus: ["BusLines", "Express Coach", "City Connect", "LongDistance", "ComfortBus"],
  }

  const amenities = {
    flight: ["Wi-Fi", "Meal Included", "Extra Legroom", "Entertainment", "Power Outlets"],
    train: ["Wi-Fi", "Dining Car", "Quiet Car", "Power Outlets", "Sleeper Cabin"],
    bus: ["Wi-Fi", "Restroom", "Power Outlets", "Reclining Seats", "Snacks"],
  }

  // Generate 5-8 random results
  const count = Math.floor(Math.random() * 4) + 5
  const results: TransportOption[] = []

  for (let i = 0; i < count; i++) {
    // Random departure time between 6am and 10pm
    const hourOffset = Math.floor(Math.random() * 16) + 6
    const minuteOffset = Math.floor(Math.random() * 12) * 5
    const departureTime = new Date(baseDate)
    departureTime.setHours(hourOffset, minuteOffset, 0)

    // Random duration between 1-5 hours for flights, 2-8 hours for trains, 3-10 hours for buses
    let durationHours
    if (type === "flight") {
      durationHours = Math.floor(Math.random() * 4) + 1
    } else if (type === "train") {
      durationHours = Math.floor(Math.random() * 6) + 2
    } else {
      durationHours = Math.floor(Math.random() * 7) + 3
    }

    const durationMinutes = Math.floor(Math.random() * 12) * 5
    const totalDurationMinutes = durationHours * 60 + durationMinutes

    const arrivalTime = addHours(departureTime, durationHours)
    arrivalTime.setMinutes(departureTime.getMinutes() + durationMinutes)

    // Format duration as "Xh Ym"
    const durationFormatted = `${durationHours}h ${durationMinutes > 0 ? `${durationMinutes}m` : ""}`

    // Random number of stops (0-2)
    const stops = type === "flight" ? Math.floor(Math.random() * 3) : Math.floor(Math.random() * 2)

    // Random price based on transport type and duration
    let basePrice
    if (type === "flight") {
      basePrice = 150 + durationHours * 50
    } else if (type === "train") {
      basePrice = 80 + durationHours * 20
    } else {
      basePrice = 40 + durationHours * 10
    }

    // Add some random variation
    const priceVariation = Math.floor(Math.random() * 40) - 20
    const price = Math.max(20, basePrice + priceVariation)

    // Random selection of amenities
    const availableAmenities = amenities[type as keyof typeof amenities] || []
    const selectedAmenities = []
    const amenityCount = Math.floor(Math.random() * 4) + 1

    for (let j = 0; j < amenityCount; j++) {
      const randomIndex = Math.floor(Math.random() * availableAmenities.length)
      const amenity = availableAmenities[randomIndex]

      if (!selectedAmenities.includes(amenity)) {
        selectedAmenities.push(amenity)
      }
    }

    // Select a random provider
    const providerList = providers[type as keyof typeof providers] || []
    const provider = providerList[Math.floor(Math.random() * providerList.length)]

    results.push({
      id: `${type}-${i + 1000}`,
      provider,
      departureTime,
      arrivalTime,
      duration: durationFormatted,
      price,
      stops,
      amenities: selectedAmenities,
    })
  }

  // Sort by departure time
  return results.sort((a, b) => a.departureTime.getTime() - b.departureTime.getTime())
}

