import { SidebarInset, SidebarProvider } from '#/components/ui/sidebar'
import { auth } from '@clerk/tanstack-react-start/server'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

import DriveHeader from './-components/drive-header'
import DriveSidebar from './-components/drive-sidebar'
import { searchSchema } from '#/lib/schemas'

export const getAuthState = createServerFn().handler(async () => {
  const { isAuthenticated, userId } = await auth()

  if (!isAuthenticated) {
    throw redirect({
      to: '/',
    })
  }

  return { userId }
})

export const Route = createFileRoute('/drive')({
  validateSearch: searchSchema,

  beforeLoad: async () => {
    return await getAuthState()
  },

  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <DriveSidebar />

      <SidebarInset>
        <DriveHeader />

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
