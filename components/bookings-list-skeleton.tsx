import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function BookingsListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-4 w-40" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-4 w-4 mx-2" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-36" />
              </div>

              <div className="flex flex-col items-end justify-between">
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end p-4 bg-muted/50">
            <div className="flex gap-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

