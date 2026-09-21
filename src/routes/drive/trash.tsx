import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/drive/trash')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/drive/trash"!</div>
}
