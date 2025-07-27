import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ClaimSearchLoading() {
  return (
    <div className="min-h-screen bg-vanilla-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Search Section Skeleton */}
        <Card className="mb-8 border-vanilla-200">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-80" />
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="flex items-end">
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-6 w-36" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Results Skeleton */}
          <div className="lg:col-span-2">
            <Card className="border-vanilla-200">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-40" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-6 w-20" />
                          </div>
                          <Skeleton className="h-4 w-full mb-2" />
                          <div className="flex items-center space-x-4">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                        <div className="text-right">
                          <Skeleton className="h-3 w-20 mb-1" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Skeleton */}
          <div>
            <Card className="border-vanilla-200">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-3 w-20 mb-1" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
