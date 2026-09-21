import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/drive/starred')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/drive/starred"!</div>
}
