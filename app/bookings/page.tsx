import { Suspense } from "react"
import { BookingsList } from "@/components/bookings-list"
import { BookingsListSkeleton } from "@/components/bookings-list-skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BookingsPage() {
  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">My Bookings</h1>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <Suspense fallback={<BookingsListSkeleton />}>
            <BookingsList status="upcoming" />
          </Suspense>
        </TabsContent>

        <TabsContent value="past">
          <Suspense fallback={<BookingsListSkeleton />}>
            <BookingsList status="completed" />
          </Suspense>
        </TabsContent>

        <TabsContent value="cancelled">
          <Suspense fallback={<BookingsListSkeleton />}>
            <BookingsList status="cancelled" />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

