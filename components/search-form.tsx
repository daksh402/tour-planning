"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, Plane, Train, Bus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const searchFormSchema = z.object({
  transportType: z.string(),
  from: z.string().min(2, {
    message: "From location must be at least 2 characters.",
  }),
  to: z.string().min(2, {
    message: "To location must be at least 2 characters.",
  }),
  departDate: z.date({
    required_error: "Departure date is required.",
  }),
  returnDate: z.date().optional(),
  passengers: z.string().min(1, {
    message: "Please select number of passengers.",
  }),
})

export function SearchForm() {
  const router = useRouter()
  const [isRoundTrip, setIsRoundTrip] = useState(false)

  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      transportType: "flight",
      from: "",
      to: "",
      passengers: "1",
    },
  })

  function onSubmit(values: z.infer<typeof searchFormSchema>) {
    // Convert dates to ISO strings for URL parameters
    const searchParams = new URLSearchParams({
      type: values.transportType,
      from: values.from,
      to: values.to,
      depart: values.departDate.toISOString(),
      passengers: values.passengers,
      ...(values.returnDate && { return: values.returnDate.toISOString() }),
    })

    router.push(`/search?${searchParams.toString()}`)
  }

  return (
    <div id="search-form" className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">Search for Transportation</h2>

      <Tabs defaultValue="flight" onValueChange={(value) => form.setValue("transportType", value)}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="flight" className="flex items-center gap-2">
            <Plane className="w-4 h-4" />
            Flights
          </TabsTrigger>
          <TabsTrigger value="train" className="flex items-center gap-2">
            <Train className="w-4 h-4" />
            Trains
          </TabsTrigger>
          <TabsTrigger value="bus" className="flex items-center gap-2">
            <Bus className="w-4 h-4" />
            Buses
          </TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <Button
                type="button"
                variant={isRoundTrip ? "default" : "outline"}
                onClick={() => setIsRoundTrip(true)}
                className="w-1/2"
              >
                Round Trip
              </Button>
              <Button
                type="button"
                variant={!isRoundTrip ? "default" : "outline"}
                onClick={() => setIsRoundTrip(false)}
                className="w-1/2"
              >
                One Way
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <Input placeholder="City or airport" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <Input placeholder="City or airport" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="departDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Depart</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isRoundTrip && (
                <FormField
                  control={form.control}
                  name="returnDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Return</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              const departDate = form.getValues("departDate")
                              return (
                                date < new Date(new Date().setHours(0, 0, 0, 0)) || (departDate && date < departDate)
                              )
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <FormField
              control={form.control}
              name="passengers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passengers</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of passengers" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "passenger" : "passengers"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Search
            </Button>
          </form>
        </Form>
      </Tabs>
    </div>
  )
}

