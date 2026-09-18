import {
  FileImage,
  FileSpreadsheet,
  FileText,
  Folder,
  Plus,
  Search,
  Star,
  Trash2,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const files = [
  {
    name: 'Resume.pdf',
    type: 'PDF Document',
    size: '2.4 MB',
    icon: FileText,
    iconBackground: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  {
    name: 'Profile.png',
    type: 'PNG Image',
    size: '1.8 MB',
    icon: FileImage,
    iconBackground: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    name: 'Expenses.xlsx',
    type: 'Spreadsheet',
    size: '890 KB',
    icon: FileSpreadsheet,
    iconBackground: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    name: 'Projects',
    type: 'Folder',
    size: '12 files',
    icon: Folder,
    iconBackground: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
]

const navigation = [
  {
    label: 'My Drive',
    icon: Folder,
    active: true,
  },
  {
    label: 'Starred',
    icon: Star,
  },
  {
    label: 'Trash',
    icon: Trash2,
  },
]

export default function ProductShowcase() {
  return (
    <section
      id="showcase"
      className="
        w-full px-4 py-8
        sm:px-6 sm:py-10
        lg:py-12
      "
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="
              rounded-full border-0
              bg-primary/10
              px-3 py-1.5
              text-[10px] font-semibold
              uppercase tracking-wide
              text-primary
            "
          >
            See It In Action
          </Badge>

          <h2
            className="
              mt-5 text-3xl font-bold tracking-tight
              sm:text-4xl lg:text-5xl
            "
          >
            Your files, simply organized
          </h2>

          <p
            className="
              mx-auto mt-4 max-w-xl
              text-sm leading-6 text-muted-foreground
              sm:text-base sm:leading-7
            "
          >
            A clean workspace that keeps your files easy to find, manage, and
            access.
          </p>
        </div>

        <div
          className="
            mx-auto mt-10 w-full max-w-5xl
            overflow-hidden rounded-2xl
            border border-border/60
            bg-background
            shadow-xl shadow-black/5
            sm:mt-12
          "
        >
          <div
            className="
              flex h-14 items-center justify-between
              border-b border-border/60
              px-4 sm:px-6
            "
          >
            <div className="flex min-w-0 items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                <Folder className="size-4 text-primary" />
              </div>

              <span className="truncate text-sm font-semibold">CloudVault</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-lg border px-3 py-1.5 sm:flex">
                <Search className="size-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Search files...
                </span>
              </div>

              <Button size="sm" className="rounded-lg">
                <Plus className="size-4" />
                <span className="hidden sm:inline">Upload</span>
              </Button>
            </div>
          </div>

          <div className="flex min-h-90">
            <aside
              className="
                hidden w-48 shrink-0
                border-r border-border/60
                p-4 sm:block
              "
            >
              <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Workspace
              </p>

              <nav className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon

                  return (
                    <button
                      key={item.label}
                      type="button"
                      className={`
                        flex w-full items-center gap-2
                        rounded-lg px-2.5 py-2
                        text-sm
                        ${
                          item.active
                            ? 'bg-muted font-medium text-foreground'
                            : 'text-muted-foreground hover:bg-muted/60'
                        }
                      `}
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </button>
                  )
                })}
              </nav>
            </aside>

            <main className="min-w-0 flex-1 p-4 sm:p-6">
              <div className="mb-5">
                <h3 className="text-base font-semibold">My Drive</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Your files and folders
                </p>
              </div>

              <div
                className="
                  grid gap-3
                  sm:grid-cols-2
                "
              >
                {files.map((file) => {
                  const Icon = file.icon

                  return (
                    <div
                      key={file.name}
                      className="
                        flex min-w-0 items-center gap-3
                        rounded-xl border
                        border-border/60
                        p-3.5
                        transition-shadow
                        hover:shadow-sm
                      "
                    >
                      <div
                        className={`
                          flex size-10 shrink-0
                          items-center justify-center
                          rounded-lg
                          ${file.iconBackground}
                          ${file.iconColor}
                        `}
                      >
                        <Icon className="size-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {file.name}
                        </p>

                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {file.type} · {file.size}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  )
}
