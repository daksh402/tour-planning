import Link from "next/link"
import { format, parseISO } from "date-fns"
import { Plane, Train, Bus, ArrowRight, Calendar, Users } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type BookingsListProps = {
  status: "upcoming" | "completed" | "cancelled"
}

type Booking = {
  id: string
  reference: string
  type: "flight" | "train" | "bus"
  provider: string
  from: string
  to: string
  departDate: string
  returnDate?: string
  passengers: number
  totalPrice: number
  status: "upcoming" | "completed" | "cancelled"
}

export async function BookingsList({ status }: BookingsListProps) {
  // In a real app, this would be an API call to fetch bookings by status
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock data
  const mockBookings: Booking[] = [
    {
      id: "1",
      reference: "BK12345",
      type: "flight",
      provider: "Air Express",
      from: "New York",
      to: "London",
      departDate: "2025-04-15T10:30:00Z",
      returnDate: "2025-04-22T14:45:00Z",
      passengers: 2,
      totalPrice: 1298,
      status: "upcoming",
    },
    {
      id: "2",
      reference: "BK12346",
      type: "train",
      provider: "RailConnect",
      from: "Paris",
      to: "Amsterdam",
      departDate: "2025-05-10T08:15:00Z",
      passengers: 1,
      totalPrice: 164,
      status: "upcoming",
    },
    {
      id: "3",
      reference: "BK12347",
      type: "bus",
      provider: "BusLines",
      from: "Boston",
      to: "Washington DC",
      departDate: "2025-03-05T09:00:00Z",
      passengers: 3,
      totalPrice: 261,
      status: "completed",
    },
    {
      id: "4",
      reference: "BK12348",
      type: "flight",
      provider: "SkyWings",
      from: "Miami",
      to: "Las Vegas",
      departDate: "2025-02-20T07:30:00Z",
      returnDate: "2025-02-27T19:15:00Z",
      passengers: 2,
      totalPrice: 876,
      status: "cancelled",
    },
  ]

  // Filter bookings by status
  const filteredBookings = mockBookings.filter((booking) => booking.status === status)

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Upcoming
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Cancelled
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {filteredBookings.length > 0 ? (
        filteredBookings.map((booking) => (
          <Card key={booking.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getTransportIcon(booking.type)}
                      <span className="font-medium capitalize">{booking.type}</span>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {booking.provider} · Ref: {booking.reference}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-medium">{booking.from}</div>
                    <ArrowRight className="w-4 h-4 mx-2 text-muted-foreground" />
                    <div className="text-lg font-medium">{booking.to}</div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{format(parseISO(booking.departDate), "EEE, MMM d, yyyy")}</span>
                  </div>

                  {booking.returnDate && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Return: {format(parseISO(booking.returnDate), "EEE, MMM d, yyyy")}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end justify-between">
                  <div className="text-xl font-bold">${booking.totalPrice}</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>
                      {booking.passengers} {booking.passengers === 1 ? "passenger" : "passengers"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end p-4 bg-muted/50">
              <div className="flex gap-2">
                {status === "upcoming" && (
                  <>
                    <Button variant="outline" asChild>
                      <Link href={`/bookings/${booking.id}/modify`}>Modify</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/bookings/${booking.id}/cancel`}>Cancel</Link>
                    </Button>
                  </>
                )}
                <Button asChild>
                  <Link href={`/bookings/${booking.id}`}>View Details</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="mb-4 text-muted-foreground">
              {status === "upcoming"
                ? "You don't have any upcoming bookings"
                : status === "completed"
                  ? "You don't have any past bookings"
                  : "You don't have any cancelled bookings"}
            </p>
            <Button asChild>
              <Link href="/">Plan a Trip</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

