import { Badge } from '@/components/ui/badge'
import {
  FileText,
  FileSpreadsheet,
  MoreVertical,
  RefreshCw,
} from 'lucide-react'

type FileCardProps = {
  icon: React.ReactNode
  iconBackground: string
  name: string
  updated: string
  size: string
}

export default function HeroCard() {
  return (
    <div
      className="
        w-full max-w-xl overflow-hidden
        rounded-2xl border border-border/60
        bg-background
        shadow-2xl shadow-black/10
      "
    >
      <div
        className="
          flex h-14 items-center justify-between
          bg-muted/60
          px-4
          sm:px-5
        "
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-red-500" />
            <span className="size-2.5 rounded-full bg-yellow-500" />
            <span className="size-2.5 rounded-full bg-green-500" />
          </div>

          <span
            className="
              truncate
              font-mono text-[11px] font-medium
              text-muted-foreground
              sm:text-xs
            "
          >
            cloudvault.internal/drive
          </span>
        </div>

        <Badge
          variant="secondary"
          className="
            ml-3 shrink-0
            rounded-full
            bg-background
            px-2.5 py-1
            text-[10px]
            font-medium
            text-green-700
            shadow-sm
            sm:text-xs
          "
        >
          <span className="mr-1.5 size-1.5 rounded-full bg-green-500" />
          Synced
        </Badge>
      </div>

      <div className="p-5 sm:p-7">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-2">
            <h3 className="truncate text-base font-semibold sm:text-lg">
              Recent Shared Drives
            </h3>

            <Badge
              variant="secondary"
              className="
                shrink-0
                rounded-md
                bg-blue-100
                px-2 py-0.5
                text-[10px]
                font-medium
                text-blue-700
                hover:bg-blue-100
              "
            >
              Live v3.4
            </Badge>
          </div>

          <div className="ml-3 flex shrink-0 -space-x-2">
            <div className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
              A
            </div>

            <div className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
              J
            </div>

            <div className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-primary text-[10px] font-medium text-primary-foreground">
              +4
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <FileCard
            icon={<FileText className="size-5 text-blue-600" />}
            iconBackground="bg-blue-100"
            name="Q3_Pitch_Deck_Final.pdf"
            updated="Updated 12m ago"
            size="4.2 MB"
          />

          <FileCard
            icon={<FileSpreadsheet className="size-5 text-green-600" />}
            iconBackground="bg-green-100"
            name="Annual_Revenue_2025.xlsx"
            updated="Updated 1m ago"
            size="1.8 MB"
          />
        </div>

        <div
          className="
            mt-5
            flex items-center justify-between
            rounded-xl
            border border-blue-200
            bg-blue-50/70
            p-4
            sm:p-5
          "
        >
          <div className="min-w-0">
            <p
              className="
                text-[10px] font-semibold uppercase
                tracking-wide text-blue-600
              "
            >
              Sync Active
            </p>

            <h4
              className="
                mt-1 truncate
                text-base font-semibold
                sm:text-lg
              "
            >
              MacBook Pro • iPhone 15
            </h4>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Files are synchronized across your devices
            </p>
          </div>

          <div
            className="
              ml-3 flex size-11 shrink-0
              items-center justify-center
              rounded-full
              bg-background
              shadow-md
            "
          >
            <RefreshCw className="size-5 text-primary" />
          </div>
        </div>
      </div>
    </div>
  )
}

function FileCard({
  icon,
  iconBackground,
  name,
  updated,
  size,
}: FileCardProps) {
  return (
    <div
      className="
        min-w-0 rounded-xl
        border border-border/60
        bg-muted/30
        p-3.5
        transition-shadow
        hover:shadow-md
        sm:p-4
      "
    >
      <div className="flex items-start justify-between">
        <div
          className={`
            flex size-10 items-center justify-center
            rounded-lg
            ${iconBackground}
          `}
        >
          {icon}
        </div>

        <button
          type="button"
          className="
            rounded-md p-1
            text-muted-foreground
            transition-colors
            hover:bg-muted
            hover:text-foreground
          "
        >
          <MoreVertical className="size-4" />
          <span className="sr-only">More options</span>
        </button>
      </div>

      <div className="mt-4 min-w-0">
        <p
          className="
            truncate
            text-sm font-semibold
            text-foreground
          "
        >
          {name}
        </p>

        <p className="mt-1 truncate text-xs text-muted-foreground">
          {updated} • {size}
        </p>
      </div>
    </div>
  )
}
