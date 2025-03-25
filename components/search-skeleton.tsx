import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function SearchSkeleton() {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded-lg">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-40" />
        </div>
      </div>

      {[1, 2, 3].map((i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-1 w-20" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end p-4 bg-muted/50">
            <Skeleton className="h-10 w-24" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

