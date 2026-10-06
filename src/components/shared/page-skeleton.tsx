import { Skeleton } from "@/components/ui/skeleton";

interface PageSkeletonProps {
  cards?: number;
  tableRows?: number;
}

export default function PageSkeleton({
  cards = 4,
  tableRows = 6,
}: PageSkeletonProps) {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-52" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: cards }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border bg-card p-5 shadow-sm"
          >
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-3 h-8 w-20" />
            <Skeleton className="mt-2 h-3 w-32" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="rounded-xl border bg-card p-5">
        <Skeleton className="h-6 w-40" />

        <div className="mt-5 space-y-4">
          {Array.from({ length: tableRows }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4"
            >
              <Skeleton className="h-10 w-10 rounded-full" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>

              <Skeleton className="h-8 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}