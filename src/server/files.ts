import { createServerFn } from '@tanstack/react-start'
import { createClient } from '#/lib/supabase/server'
import { type File } from '#/types/index'
import { createFileSchema } from '#/lib/schemas'
import { getCurrentUserId } from './auth'

const getFiles = createServerFn({ method: 'GET' }).handler(async () => {
  const supabase = await createClient()

  const { data: files, error } = await supabase.from('files').select('*')

  if (error) {
    throw new Error(error.message)
  }

  return files as Array<File>
})

const createFileRecord = createServerFn({ method: 'POST' })
  .validator(createFileSchema)
  .handler(async ({ data }) => {
    const userId = await getCurrentUserId()

    const supabase = await createClient()

    const { mimeType, name, size, storagePath, folderId } = data

    const { data: driveFile, error } = await supabase
      .from('files')
      .insert({
        user_id: userId,
        name,
        mime_type: mimeType,
        storage_path: storagePath,
        size,
        folder_id: folderId ?? null,
      })
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return driveFile
  })

export { getFiles, createFileRecord }
