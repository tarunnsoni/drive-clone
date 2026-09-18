import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import DriveHeader from './-components/drive-header'
import DriveContent from './-components/drive-content'

export const Route = createFileRoute('/drive/')({
  component: DrivePage,
})

function DrivePage() {
  const [search, setSearch] = useState('')

  return (
    <>
      <DriveHeader search={search} setSearch={setSearch} />
      <DriveContent search={search} />
    </>
  )
}
