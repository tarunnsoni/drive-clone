import { FolderPlus, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FolderCard from './folder-card'
import FileCard from './file-card'
import type { FileCardProps } from '#/types/index'

const folders = [
  {
    name: 'Projects',
    items: 12,
  },
  {
    name: 'Client Contracts',
    items: 8,
  },
  {
    name: 'Personal',
    items: 16,
  },
  {
    name: 'Documents',
    items: 24,
  },
]

const files: Array<FileCardProps> = [
  {
    name: 'Resume.pdf',
    type: 'pdf',
    size: '2.4 MB',
    modified: '2 days ago',
    starred: true,
  },
  {
    name: 'Profile.png',
    type: 'image',
    size: '1.8 MB',
    modified: '4 days ago',
  },
  {
    name: 'Expenses.xlsx',
    type: 'spreadsheet',
    size: '890 KB',
    modified: '1 week ago',
  },
  {
    name: 'Pitch Deck 2025.pptx',
    type: 'spreadsheet',
    size: '14.2 MB',
    modified: '1 week ago',
  },
  {
    name: 'Project Brief.pdf',
    type: 'pdf',
    size: '3.1 MB',
    modified: '2 weeks ago',
  },
  {
    name: 'Brand Assets.zip',
    type: 'archive',
    size: '24.6 MB',
    modified: '3 weeks ago',
  },
]

export default function DriveContent({ search }: { search: string }) {
  const normalizedSearch = search.trim().toLowerCase()

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(normalizedSearch),
  )

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(normalizedSearch),
  )

  const hasResults = filteredFolders.length > 0 || filteredFiles.length > 0

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-9">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Workspace
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            My Drive
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your files and folders in one place.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <FolderPlus className="size-4" />
            <span className="hidden sm:inline">New folder</span>
            <span className="sm:hidden">Folder</span>
          </Button>

          <Button className="gap-2">
            <Upload className="size-4" />
            Upload
          </Button>
        </div>
      </div>

      {!hasResults ? (
        <EmptySearch />
      ) : (
        <div className="mt-8 space-y-9">
          {filteredFolders.length > 0 && (
            <section>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold">Folders</h2>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Your organized spaces
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {filteredFolders.map((folder) => (
                  <FolderCard
                    key={folder.name}
                    name={folder.name}
                    items={folder.items}
                  />
                ))}
              </div>
            </section>
          )}

          {filteredFiles.length > 0 && (
            <section>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold">Recent files</h2>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Your recently modified files
                  </p>
                </div>

                <Button variant="ghost" size="sm" className="text-xs">
                  View all
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {filteredFiles.map((file) => (
                  <FileCard key={file.name} {...file} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </main>
  )
}

function EmptySearch() {
  return (
    <div className="mt-12 flex min-h-90 flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-muted/20 px-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
        <Upload className="size-5 text-muted-foreground" />
      </div>

      <h2 className="mt-4 text-sm font-semibold">No files found</h2>

      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Try a different search term or upload a new file to your drive.
      </p>
    </div>
  )
}
