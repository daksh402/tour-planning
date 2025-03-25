"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

type BookingFormProps = {
  type: string
  id: string
  from: string
  to: string
  departDate: string
  returnDate?: string
  passengers: number
}

const passengerSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
})

const paymentSchema = z.object({
  cardholderName: z.string().min(2, { message: "Cardholder name is required." }),
  cardNumber: z.string().min(16, { message: "Please enter a valid card number." }),
  expiryDate: z.string().min(5, { message: "Please enter a valid expiry date (MM/YY)." }),
  cvv: z.string().min(3, { message: "Please enter a valid CVV." }),
  billingAddress: z.string().min(5, { message: "Billing address is required." }),
  savePaymentInfo: z.boolean().default(false),
})

const bookingFormSchema = z.object({
  passengers: z.array(passengerSchema).min(1),
  specialRequests: z.string().optional(),
  payment: paymentSchema,
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions to proceed.",
  }),
})

export function BookingForm({ type, id, from, to, departDate, returnDate, passengers }: BookingFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form with passenger count from search
  const defaultPassengers = Array(passengers)
    .fill(0)
    .map(() => ({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    }))

  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      passengers: defaultPassengers,
      specialRequests: "",
      payment: {
        cardholderName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        billingAddress: "",
        savePaymentInfo: false,
      },
      termsAccepted: false,
    },
  })

  async function onSubmit(values: z.infer<typeof bookingFormSchema>) {
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to create the booking
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate a random booking reference
      const bookingRef = Math.random().toString(36).substring(2, 10).toUpperCase()

      toast({
        title: "Booking Confirmed!",
        description: `Your booking reference is ${bookingRef}`,
      })

      // Redirect to confirmation page
      router.push(`/booking/confirmation/${bookingRef}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem processing your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Passenger Information</CardTitle>
            <CardDescription>
              Please enter details for all {passengers} {passengers === 1 ? "passenger" : "passengers"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="passenger-1" className="w-full">
              <TabsList className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {Array(passengers)
                  .fill(0)
                  .map((_, index) => (
                    <TabsTrigger key={index} value={`passenger-${index + 1}`}>
                      Passenger {index + 1}
                    </TabsTrigger>
                  ))}
              </TabsList>

              {Array(passengers)
                .fill(0)
                .map((_, index) => (
                  <TabsContent key={index} value={`passenger-${index + 1}`} className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name={`passengers.${index}.firstName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="First name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`passengers.${index}.lastName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name={`passengers.${index}.email`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Email address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`passengers.${index}.phone`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="Phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                ))}
            </Tabs>

            <div className="mt-6">
              <FormField
                control={form.control}
                name="specialRequests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requests (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any special requirements or requests" className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please note that special requests cannot be guaranteed but we will do our best to accommodate
                      them.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
            <CardDescription>Please enter your payment details to complete the booking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="payment.cardholderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cardholder Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name on card" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payment.cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="1234 5678 9012 3456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="payment.expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input placeholder="MM/YY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="payment.cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input placeholder="123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="payment.billingAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your billing address" className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payment.savePaymentInfo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Save payment information for future bookings</FormLabel>
                      <FormDescription>
                        Your payment information will be securely stored for faster checkout.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I accept the{" "}
                      <a href="/terms" className="text-primary hover:underline">
                        terms and conditions
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-primary hover:underline">
                        privacy policy
                      </a>
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Complete Booking"}
        </Button>
      </form>
    </Form>
  )
}

