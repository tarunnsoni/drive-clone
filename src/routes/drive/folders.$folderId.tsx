import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/drive/folders/$folderId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/drive/folder/$folderId"!</div>
}
