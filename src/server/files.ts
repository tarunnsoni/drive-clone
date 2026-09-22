import { createServerFn } from '@tanstack/react-start'
import { createClient } from '#/lib/supabase/server'
import { type File } from '#/types/index'
import { createFileSchema, renameSchema } from '#/lib/schemas'
import { getCurrentUserId } from './auth'
import z from 'zod'

const getFiles = createServerFn({ method: 'GET' }).handler(async () => {
  const userId = await getCurrentUserId()
  const supabase = await createClient()

  const { data: files, error } = await supabase
    .from('files')
    .select('*')
    .eq('user_id', userId)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) {
    throw new Error(error.message)
  }

  return files as Array<File>
})

const getStarredFiles = createServerFn({ method: 'GET' }).handler(async () => {
  const userId = await getCurrentUserId()
  const supabase = await createClient()

  const { data: files, error } = await supabase
    .from('files')
    .select('*')
    .eq('user_id', userId)
    .eq('is_starred', true)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return files as Array<File>
})

const getFolderFiles = createServerFn({ method: 'GET' })
  .validator(z.uuid())
  .handler(async ({ data: folderId }) => {
    const userId = await getCurrentUserId()
    const supabase = await createClient()

    const { data: files, error } = await supabase
      .from('files')
      .select('*')
      .eq('user_id', userId)
      .eq('folder_id', folderId)
      .is('deleted_at', null)
      .order('created_at', {
        ascending: false,
      })

    if (error) throw new Error(error.message)

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

const renameFile = createServerFn({
  method: 'POST',
})
  .validator(renameSchema)
  .handler(async ({ data }) => {
    console.log(1)

    const userId = await getCurrentUserId()

    const supabase = await createClient()

    const { data: file, error } = await supabase
      .from('files')
      .update({
        name: data.name,
      })
      .eq('id', data.id)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    if (!file) {
      throw new Error('File not found')
    }

    return file
  })

const moveFileToTrash = createServerFn({ method: 'POST' })
  .validator(z.uuid())
  .handler(async ({ data: fileId }) => {
    const userId = await getCurrentUserId()

    const supabase = await createClient()

    const { data: file, error } = await supabase
      .from('files')
      .update({
        deleted_at: new Date().toISOString(),
      })
      .eq('id', fileId)
      .eq('user_id', userId)
      .is('deleted_at', null)
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    if (!file) {
      throw new Error('File not found')
    }

    return file
  })

const deleteFile = createServerFn({ method: 'POST' })
  .validator(z.uuid())
  .handler(async ({ data: fileId }) => {
    const userId = await getCurrentUserId()

    const supabase = await createClient()

    const { success, error } = await supabase
      .from('files')
      .delete()
      .eq('id', fileId)
      .eq('user_id', userId)

    if (error) {
      throw new Error(error.message)
    }

    if (success) {
      return { success }
    }
  })

export {
  getFiles,
  getStarredFiles,
  getFolderFiles,
  createFileRecord,
  markFileStar,
  renameFile,
  moveFileToTrash,
  deleteFile,
}
