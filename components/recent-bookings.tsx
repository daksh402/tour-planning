"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Plane, Train, Bus, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type Booking = {
  id: string
  type: "flight" | "train" | "bus"
  from: string
  to: string
  departDate: string
  returnDate?: string
  status: "upcoming" | "completed" | "cancelled"
}

export function RecentBookings() {
  const [bookings, setBookings] = useState<Booking[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch recent bookings
    const fetchBookings = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockBookings: Booking[] = [
          {
            id: "bk-1001",
            type: "flight",
            from: "New York",
            to: "London",
            departDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            status: "upcoming",
          },
          {
            id: "bk-1002",
            type: "train",
            from: "Paris",
            to: "Amsterdam",
            departDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            status: "upcoming",
          },
          {
            id: "bk-1003",
            type: "bus",
            from: "Boston",
            to: "Washington DC",
            departDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            status: "completed",
          },
        ]

        setBookings(mockBookings)
      } catch (error) {
        console.error("Error fetching bookings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

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
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Recent Bookings</h2>
        <Link href="/bookings" className="text-primary hover:underline">
          View all bookings
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : bookings && bookings.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {bookings.map((booking) => (
            <Link key={booking.id} href={`/bookings/${booking.id}`}>
              <Card className="transition-all duration-200 hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {getTransportIcon(booking.type)}
                    <span className="capitalize">{booking.type}</span>
                    <span
                      className={`ml-auto text-xs px-2 py-1 rounded-full ${
                        booking.status === "upcoming"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "completed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-lg font-medium">{booking.from}</div>
                    <ArrowRight className="w-4 h-4 mx-2 text-muted-foreground" />
                    <div className="text-lg font-medium">{booking.to}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Depart: {format(new Date(booking.departDate), "MMM d, yyyy")}
                  </div>
                  {booking.returnDate && (
                    <div className="text-sm text-muted-foreground">
                      Return: {format(new Date(booking.returnDate), "MMM d, yyyy")}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="mb-4 text-muted-foreground">You don't have any recent bookings</p>
            <Link href="#search-form" className="text-primary hover:underline">
              Start planning your trip
            </Link>
          </CardContent>
        </Card>
      )}
    </section>
  )
}

