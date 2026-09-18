import { Search, Upload } from 'lucide-react'

import { UserButton } from '@clerk/tanstack-react-start'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

type DriveHeaderProps = {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function DriveHeader({ search, setSearch }: DriveHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <SidebarTrigger className="shrink-0" />

        <Separator orientation="vertical" className="hidden h-5 sm:block" />

        <div className="hidden items-center gap-2 text-sm sm:flex">
          <span className="font-semibold">CloudVault</span>

          <span className="text-muted-foreground">/</span>

          <span className="text-muted-foreground">My Drive</span>
        </div>

        <div className="relative ml-auto w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search files..."
            className="h-9 border-border/60 bg-muted/40 pl-9 pr-3 text-sm shadow-none focus-visible:bg-background"
          />
        </div>

        <Button className="hidden shrink-0 gap-2 sm:flex">
          <Upload className="size-4" />
          Upload
        </Button>

        <Button size="icon" className="size-9 shrink-0 sm:hidden">
          <Upload className="size-4" />
          <span className="sr-only">Upload</span>
        </Button>

        <Separator orientation="vertical" className="h-5" />

        <UserButton />
      </div>
    </header>
  )
}
