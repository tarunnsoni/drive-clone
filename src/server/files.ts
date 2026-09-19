import { createServerFn } from '@tanstack/react-start'
import { createClient } from '#/lib/supabase/server'
import { auth } from '@clerk/tanstack-react-start/server'
import { type File } from '#/types/index'

const getFiles = createServerFn({ method: 'GET' }).handler(async () => {
  const { userId } = await auth()

  // check for user is authenticated or not
  if (!userId) {
    throw new Error('Unauthenticated')
  }

  const supabase = await createClient()

  const { data: files, error } = await supabase.from('files').select('*')

  if (error) {
    throw new Error(error.message)
  }

  return files as Array<File>
})

export { getFiles }
