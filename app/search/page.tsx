import { Suspense } from "react"
import { SearchResults } from "@/components/search-results"
import { SearchFilters } from "@/components/search-filters"
import { SearchSkeleton } from "@/components/search-skeleton"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const type = (searchParams.type as string) || "flight"
  const from = (searchParams.from as string) || ""
  const to = (searchParams.to as string) || ""
  const depart = (searchParams.depart as string) || ""
  const returnDate = (searchParams.return as string) || undefined
  const passengers = (searchParams.passengers as string) || "1"

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">
        {type.charAt(0).toUpperCase() + type.slice(1)} from {from} to {to}
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <SearchFilters type={type} />
        </div>

        <div className="md:col-span-3">
          <Suspense fallback={<SearchSkeleton />}>
            <SearchResults
              type={type}
              from={from}
              to={to}
              departDate={depart}
              returnDate={returnDate}
              passengers={Number.parseInt(passengers)}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

