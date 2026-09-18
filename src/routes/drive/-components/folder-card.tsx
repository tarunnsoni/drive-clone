import { Folder, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type FolderCardProps = {
  name: string
  items: number
}

export default function FolderCard({ name, items }: FolderCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-background p-3 transition-all hover:-translate-y-0.5 hover:border-border hover:shadow-sm">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
        <Folder className="size-5 fill-current/10" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{name}</p>

        <p className="mt-0.5 text-xs text-muted-foreground">
          {items} {items === 1 ? 'item' : 'items'}
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0 opacity-100 transition-opacity"
          >
            <MoreHorizontal className="size-4" />

            <span className="sr-only">Folder actions</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem>Open</DropdownMenuItem>

          <DropdownMenuItem>Rename</DropdownMenuItem>

          <DropdownMenuItem>Star</DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="text-destructive focus:text-destructive">
            Move to Trash
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
