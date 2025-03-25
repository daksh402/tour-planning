import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function BookingConfirmationPage({
  params,
}: {
  params: { reference: string }
}) {
  const { reference } = params

  return (
    <div className="container flex flex-col items-center justify-center max-w-md px-4 py-12 mx-auto">
      <div className="flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>

      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
          <CardDescription>Your booking has been successfully completed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 text-center border rounded-md">
            <div className="text-sm text-muted-foreground">Booking Reference</div>
            <div className="text-xl font-bold">{reference}</div>
          </div>

          <p className="text-center text-muted-foreground">
            A confirmation email has been sent to your email address with all the details of your booking.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button asChild className="w-full">
            <Link href="/bookings">View My Bookings</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

