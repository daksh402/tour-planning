import { NextResponse } from "next/server"

// This would be a database model in a real application
type Booking = {
  id: string
  reference: string
  userId: string
  type: "flight" | "train" | "bus"
  provider: string
  from: string
  to: string
  departDate: string
  returnDate?: string
  passengers: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }[]
  specialRequests?: string
  totalPrice: number
  status: "upcoming" | "completed" | "cancelled"
  createdAt: string
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const status = searchParams.get("status") || "all"

  try {
    // In a real app, this would query a database for the user's bookings
    // Here we're simulating a delay and returning mock data
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock user ID (in a real app, this would come from authentication)
    const userId = "user-123"

    // Generate mock bookings
    const bookings = generateMockBookings(userId)

    // Filter by status if needed
    const filteredBookings = status === "all" ? bookings : bookings.filter((booking) => booking.status === status)

    return NextResponse.json({ bookings: filteredBookings })
  } catch (error) {
    console.error("Bookings error:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const { type, from, to, departDate, passengers, payment } = body

    if (!type || !from || !to || !departDate || !passengers || !payment) {
      return NextResponse.json({ error: "Missing required booking information" }, { status: 400 })
    }

    // In a real app, this would create a booking in the database
    // and process payment
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate a random booking reference
    const reference = Math.random().toString(36).substring(2, 10).toUpperCase()

    return NextResponse.json({
      success: true,
      booking: {
        reference,
        type,
        from,
        to,
        departDate,
        status: "upcoming",
      },
    })
  } catch (error) {
    console.error("Booking creation error:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}

function generateMockBookings(userId: string): Booking[] {
  return [
    {
      id: "booking-1",
      reference: "BK12345",
      userId,
      type: "flight",
      provider: "Air Express",
      from: "New York",
      to: "London",
      departDate: "2025-04-15T10:30:00Z",
      returnDate: "2025-04-22T14:45:00Z",
      passengers: [
        {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phone: "123-456-7890",
        },
        {
          firstName: "Jane",
          lastName: "Doe",
          email: "jane@example.com",
          phone: "123-456-7891",
        },
      ],
      totalPrice: 1298,
      status: "upcoming",
      createdAt: "2025-01-15T12:30:00Z",
    },
    {
      id: "booking-2",
      reference: "BK12346",
      userId,
      type: "train",
      provider: "RailConnect",
      from: "Paris",
      to: "Amsterdam",
      departDate: "2025-05-10T08:15:00Z",
      passengers: [
        {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phone: "123-456-7890",
        },
      ],
      specialRequests: "Window seat preferred",
      totalPrice: 164,
      status: "upcoming",
      createdAt: "2025-01-20T09:45:00Z",
    },
    {
      id: "booking-3",
      reference: "BK12347",
      userId,
      type: "bus",
      provider: "BusLines",
      from: "Boston",
      to: "Washington DC",
      departDate: "2025-03-05T09:00:00Z",
      passengers: [
        {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phone: "123-456-7890",
        },
        {
          firstName: "Jane",
          lastName: "Doe",
          email: "jane@example.com",
          phone: "123-456-7891",
        },
        {
          firstName: "Bob",
          lastName: "Smith",
          email: "bob@example.com",
          phone: "123-456-7892",
        },
      ],
      totalPrice: 261,
      status: "completed",
      createdAt: "2025-01-05T14:20:00Z",
    },
    {
      id: "booking-4",
      reference: "BK12348",
      userId,
      type: "flight",
      provider: "SkyWings",
      from: "Miami",
      to: "Las Vegas",
      departDate: "2025-02-20T07:30:00Z",
      returnDate: "2025-02-27T19:15:00Z",
      passengers: [
        {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phone: "123-456-7890",
        },
        {
          firstName: "Jane",
          lastName: "Doe",
          email: "jane@example.com",
          phone: "123-456-7891",
        },
      ],
      specialRequests: "Vegetarian meals",
      totalPrice: 876,
      status: "cancelled",
      createdAt: "2025-01-10T11:15:00Z",
    },
  ]
}

