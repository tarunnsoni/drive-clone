import { createFileRoute } from '@tanstack/react-router'

import DriveContent from './-components/drive-content'

export const Route = createFileRoute('/drive/')({
  component: DrivePage,
})

function DrivePage() {
  const { search = '' } = Route.useSearch()

  return <DriveContent search={search} />
}
