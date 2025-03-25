import { notFound } from "next/navigation"
import { BookingForm } from "@/components/booking-form"
import { BookingSummary } from "@/components/booking-summary"

export default function BookingPage({
  params,
  searchParams,
}: {
  params: { type: string; id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { type, id } = params
  const from = searchParams.from as string
  const to = searchParams.to as string
  const depart = searchParams.depart as string
  const returnDate = searchParams.return as string | undefined
  const passengers = Number.parseInt((searchParams.passengers as string) || "1")

  // Validate required parameters
  if (!from || !to || !depart || !passengers) {
    notFound()
  }

  // Validate transport type
  if (!["flight", "train", "bus"].includes(type)) {
    notFound()
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Complete Your Booking</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BookingForm
            type={type}
            id={id}
            from={from}
            to={to}
            departDate={depart}
            returnDate={returnDate}
            passengers={passengers}
          />
        </div>

        <div className="lg:col-span-1">
          <BookingSummary
            type={type}
            id={id}
            from={from}
            to={to}
            departDate={depart}
            returnDate={returnDate}
            passengers={passengers}
          />
        </div>
      </div>
    </div>
  )
}

