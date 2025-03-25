import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { format, parseISO } from "date-fns"
import { Plane, Train, Bus, ArrowRight, Calendar, Users } from "lucide-react"

type BookingSummaryProps = {
  type: string
  id: string
  from: string
  to: string
  departDate: string
  returnDate?: string
  passengers: number
}

export function BookingSummary({ type, id, from, to, departDate, returnDate, passengers }: BookingSummaryProps) {
  // In a real app, this would fetch the actual booking details from an API
  // Here we're generating mock data based on the ID
  const mockBookingDetails = {
    provider: type === "flight" ? "Air Express" : type === "train" ? "RailConnect" : "BusLines",
    departureTime: "10:30",
    arrivalTime: "13:45",
    duration: "3h 15m",
    basePrice: type === "flight" ? 299 : type === "train" ? 129 : 59,
    taxes: type === "flight" ? 45 : type === "train" ? 15 : 8,
    fees: 20,
  }

  const getTransportIcon = () => {
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

  const totalPerPerson = mockBookingDetails.basePrice + mockBookingDetails.taxes + mockBookingDetails.fees
  const totalPrice = totalPerPerson * passengers

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-2">
          {getTransportIcon()}
          <span className="font-medium capitalize">{type}</span>
          <span className="text-muted-foreground">({mockBookingDetails.provider})</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium">{from}</div>
            <ArrowRight className="w-4 h-4 mx-2 text-muted-foreground" />
            <div className="text-lg font-medium">{to}</div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{format(parseISO(departDate), "EEE, MMM d, yyyy")}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span>{mockBookingDetails.departureTime}</span>
            <span className="text-xs text-muted-foreground">{mockBookingDetails.duration}</span>
            <span>{mockBookingDetails.arrivalTime}</span>
          </div>

          {returnDate && (
            <>
              <Separator className="my-2" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Return: {format(parseISO(returnDate), "EEE, MMM d, yyyy")}</span>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>
            {passengers} {passengers === 1 ? "passenger" : "passengers"}
          </span>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Base fare</span>
            <span>
              ${mockBookingDetails.basePrice} × {passengers}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Taxes</span>
            <span>
              ${mockBookingDetails.taxes} × {passengers}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Booking fees</span>
            <span>
              ${mockBookingDetails.fees} × {passengers}
            </span>
          </div>
          <Separator className="my-2" />
          <div className="flex items-center justify-between font-medium">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
        </div>

        <div className="p-3 text-sm bg-muted rounded-md">
          <p>Free cancellation available up to 24 hours before departure.</p>
        </div>
      </CardContent>
    </Card>
  )
}

