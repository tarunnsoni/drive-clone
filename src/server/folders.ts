import { createServerFn } from '@tanstack/react-start'
import { createClient } from '#/lib/supabase/server'
import { auth } from '@clerk/tanstack-react-start/server'
import { type Folder } from '#/types/index'

const getFolders = createServerFn({ method: 'GET' }).handler(async () => {
  const { userId } = await auth()

  // check for user is authenticated or not
  if (!userId) {
    throw new Error('Unauthenticated')
  }

  const supabase = await createClient()

  const { data: folders, error } = await supabase
    .from('folders')
    .select('*, files(id)')
    .order('name', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return folders as Array<Folder & { files: Array<{ id: string }> }>
})

export { getFolders }
