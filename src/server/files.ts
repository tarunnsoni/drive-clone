import { createServerFn } from '@tanstack/react-start'
import { createClient } from '#/lib/supabase/server'
import { type File } from '#/types/index'
import { createFileSchema } from '#/lib/schemas'
import { getCurrentUserId } from './auth'
import z from 'zod'

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

const markFileStar = createServerFn({ method: 'POST' })
  .validator(z.uuid())
  .handler(async ({ data: fileId }) => {
    const userId = await getCurrentUserId()

    const supabase = await createClient()

    const { data: file, error } = await supabase
      .from('files')
      .select('*')
      .eq('id', fileId)
      .eq('user_id', userId)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    if (!file || !file.id) {
      throw new Error('File not found')
    }

    const { error: updateFileError, data: updatedFile } = await supabase
      .from('files')
      .update({
        is_starred: !file.is_starred,
      })
      .eq('id', file.id)
      .eq('user_id', userId)
      .select()
      .single()

    if (updateFileError) {
      throw new Error(updateFileError.message)
    }

    return updatedFile
  })

export { getFiles, createFileRecord, markFileStar }
