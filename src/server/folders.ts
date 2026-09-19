import { createServerFn } from '@tanstack/react-start'
import { createClient } from '#/lib/supabase/server'
import { type Folder } from '#/types/index'
import { createFolderSchema } from '#/lib/schemas'
import { getCurrentUserId } from './auth'

const getFolders = createServerFn({ method: 'GET' }).handler(async () => {
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

const createFolder = createServerFn({ method: 'POST' })
  .validator(createFolderSchema)
  .handler(async ({ data }) => {
    const userId = await getCurrentUserId()

    const supabase = await createClient()

    const { name: folderName, parentId } = data

    const { data: folder, error } = await supabase
      .from('folders')
      .insert({
        user_id: userId,
        name: folderName,
        parent_id: parentId ?? null,
      })
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return folder as Folder
  })

export { getFolders, createFolder }
