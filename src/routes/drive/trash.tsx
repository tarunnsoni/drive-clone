import { useTrashFiles, useTrashFolders } from '#/lib/react-query/queries'
import { createFileRoute } from '@tanstack/react-router'
import { Trash2 } from 'lucide-react'
import FolderCard from './-components/folder-card'
import FileCard from './-components/file-card'
import { toFileCardProps } from '#/utils/file'

export const Route = createFileRoute('/drive/trash')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: folders = [] } = useTrashFolders()
  const { data: files = [] } = useTrashFiles()

  return (
    <main className="flex-1 p-4 sm:p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Trash2 className="size-5 text-muted-foreground" />

          <h1 className="text-xl font-semibold">Trash</h1>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          Items you've moved to trash.
        </p>
      </div>

      <div className="space-y-8">
        {folders.length > 0 && (
          <section>
            <h2 className="mb-3 text-sm font-medium text-muted-foreground">
              Folders
            </h2>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {folders.map((folder) => (
                <FolderCard
                  key={folder.id}
                  id={folder.id}
                  name={folder.name}
                  items={folder.files.length + folder.folders.length}
                  isStarred={folder.is_starred}
                  variant="trash"
                />
              ))}
            </div>
          </section>
        )}

        {files.length > 0 && (
          <section>
            <h2 className="mb-3 text-sm font-medium text-muted-foreground">
              Files
            </h2>

            <div className="space-y-2">
              {files.map((file) => (
                <FileCard
                  key={file.id}
                  {...toFileCardProps(file)}
                  variant="trash"
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
