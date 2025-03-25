import { NextResponse } from "next/server"

// This would be a database model in a real application
type TransportOption = {
  id: string
  type: "flight" | "train" | "bus"
  provider: string
  from: string
  to: string
  departureTime: string
  arrivalTime: string
  duration: string
  price: number
  stops: number
  amenities: string[]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const type = searchParams.get("type") || "flight"
  const from = searchParams.get("from")
  const to = searchParams.get("to")
  const depart = searchParams.get("depart")
  const returnDate = searchParams.get("return")
  const passengers = Number.parseInt(searchParams.get("passengers") || "1")

  // Validate required parameters
  if (!from || !to || !depart) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  }

  try {
    // In a real app, this would query a database or external API
    // Here we're simulating a delay and returning mock data
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Generate mock results based on search parameters
    const results = generateMockResults(type as "flight" | "train" | "bus", from, to, depart, passengers)

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Failed to search for transportation options" }, { status: 500 })
  }
}

function generateMockResults(
  type: "flight" | "train" | "bus",
  from: string,
  to: string,
  departDate: string,
  passengers: number,
): TransportOption[] {
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

  const baseDate = new Date(departDate)

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

    const arrivalTime = new Date(departureTime)
    arrivalTime.setHours(departureTime.getHours() + durationHours)
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
    const availableAmenities = amenities[type]
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
    const provider = providers[type][Math.floor(Math.random() * providers[type].length)]

    results.push({
      id: `${type}-${i + 1000}`,
      type,
      provider,
      from,
      to,
      departureTime: departureTime.toISOString(),
      arrivalTime: arrivalTime.toISOString(),
      duration: durationFormatted,
      price,
      stops,
      amenities: selectedAmenities,
    })
  }

  // Sort by price
  return results.sort((a, b) => a.price - b.price)
}

