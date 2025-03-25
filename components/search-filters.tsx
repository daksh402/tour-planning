"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"

type SearchFiltersProps = {
  type: string
}

export function SearchFilters({ type }: SearchFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get current search parameters
  const from = searchParams.get("from") || ""
  const to = searchParams.get("to") || ""
  const depart = searchParams.get("depart") || ""
  const returnDate = searchParams.get("return") || ""
  const passengers = searchParams.get("passengers") || "1"

  // Filter states
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000])
  const [departureTime, setDepartureTime] = useState<string[]>([])
  const [stops, setStops] = useState<string[]>([])
  const [amenities, setAmenities] = useState<string[]>([])

  // Filter options based on transport type
  const getAmenityOptions = () => {
    switch (type) {
      case "flight":
        return ["Wi-Fi", "Meal Included", "Extra Legroom", "Entertainment", "Power Outlets"]
      case "train":
        return ["Wi-Fi", "Dining Car", "Quiet Car", "Power Outlets", "Sleeper Cabin"]
      case "bus":
        return ["Wi-Fi", "Restroom", "Power Outlets", "Reclining Seats", "Snacks"]
      default:
        return []
    }
  }

  const handleDepartureTimeChange = (value: string) => {
    setDepartureTime(
      departureTime.includes(value) ? departureTime.filter((item) => item !== value) : [...departureTime, value],
    )
  }

  const handleStopsChange = (value: string) => {
    setStops(stops.includes(value) ? stops.filter((item) => item !== value) : [...stops, value])
  }

  const handleAmenityChange = (value: string) => {
    setAmenities(amenities.includes(value) ? amenities.filter((item) => item !== value) : [...amenities, value])
  }

  const applyFilters = () => {
    // In a real app, this would update the URL with filter parameters
    // and trigger a new search
    const params = new URLSearchParams(searchParams.toString())

    // Add filter parameters
    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    if (departureTime.length > 0) {
      params.set("departureTime", departureTime.join(","))
    } else {
      params.delete("departureTime")
    }

    if (stops.length > 0) {
      params.set("stops", stops.join(","))
    } else {
      params.delete("stops")
    }

    if (amenities.length > 0) {
      params.set("amenities", amenities.join(","))
    } else {
      params.delete("amenities")
    }

    router.push(`/search?${params.toString()}`)
  }

  const resetFilters = () => {
    setPriceRange([0, 1000])
    setDepartureTime([])
    setStops([])
    setAmenities([])

    // Remove filter parameters from URL
    const params = new URLSearchParams()
    params.set("type", type)
    params.set("from", from)
    params.set("to", to)
    params.set("depart", depart)
    if (returnDate) params.set("return", returnDate)
    params.set("passengers", passengers)

    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Filters</h2>

      <Accordion type="multiple" defaultValue={["price", "departure", "stops", "amenities"]}>
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="py-2">
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="py-4"
              />
              <div className="flex items-center justify-between mt-2">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="departure">
          <AccordionTrigger>Departure Time</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {["Morning (6AM-12PM)", "Afternoon (12PM-6PM)", "Evening (6PM-12AM)"].map((time) => (
                <div key={time} className="flex items-center space-x-2">
                  <Checkbox
                    id={`time-${time}`}
                    checked={departureTime.includes(time)}
                    onCheckedChange={() => handleDepartureTimeChange(time)}
                  />
                  <Label htmlFor={`time-${time}`}>{time}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="stops">
          <AccordionTrigger>Stops</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {["Direct", "1 Stop", "2+ Stops"].map((stop) => (
                <div key={stop} className="flex items-center space-x-2">
                  <Checkbox
                    id={`stop-${stop}`}
                    checked={stops.includes(stop)}
                    onCheckedChange={() => handleStopsChange(stop)}
                  />
                  <Label htmlFor={`stop-${stop}`}>{stop}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="amenities">
          <AccordionTrigger>Amenities</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {getAmenityOptions().map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`amenity-${amenity}`}
                    checked={amenities.includes(amenity)}
                    onCheckedChange={() => handleAmenityChange(amenity)}
                  />
                  <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex gap-2 mt-6">
        <Button onClick={applyFilters} className="flex-1">
          Apply Filters
        </Button>
        <Button onClick={resetFilters} variant="outline" className="flex-1">
          Reset
        </Button>
      </div>
    </div>
  )
}

