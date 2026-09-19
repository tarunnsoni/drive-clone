import { Skeleton } from '@/components/ui/skeleton'

export function FileCardSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
      {/* File icon */}
      <Skeleton className="size-10 shrink-0 rounded-lg" />

      {/* File information */}
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>

      {/* More button */}
      <Skeleton className="size-8 shrink-0 rounded-md" />
    </div>
  )
}

export function FolderCardSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
      {/* Folder icon */}
      <Skeleton className="size-10 shrink-0 rounded-lg" />

      {/* Folder name + items */}
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-20" />
      </div>

      {/* More button */}
      <Skeleton className="size-8 shrink-0 rounded-md" />
    </div>
  )
}
