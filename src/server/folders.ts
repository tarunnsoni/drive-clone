import { createServerFn } from '@tanstack/react-start'
import { createClient } from '#/lib/supabase/server'
import { type Folder } from '#/types/index'
import { createFolderSchema, renameSchema } from '#/lib/schemas'
import { getCurrentUserId } from './auth'
import z from 'zod'

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

const markFolderStar = createServerFn({ method: 'POST' })
  .validator(z.uuid())
  .handler(async ({ data: folderId }) => {
    const userId = await getCurrentUserId()

    const supabase = await createClient()

    const { data: folder, error } = await supabase
      .from('folders')
      .select('*')
      .eq('id', folderId)
      .eq('user_id', userId)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    if (!folder || !folder.id) {
      throw new Error('Folder not found')
    }

    const { error: updateFolderError, data: updatedFolder } = await supabase
      .from('folders')
      .update({
        is_starred: !folder.is_starred,
      })
      .eq('id', folder.id)
      .eq('user_id', userId)
      .select()
      .single()

    if (updateFolderError) {
      throw new Error(updateFolderError.message)
    }

    return updatedFolder
  })

const renameFolder = createServerFn({
  method: 'POST',
})
  .validator(renameSchema)
  .handler(async ({ data }) => {
    const userId = await getCurrentUserId()

    const supabase = await createClient()

    const { data: folder, error } = await supabase
      .from('folders')
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

    if (!folder) {
      throw new Error('Folder not found')
    }

    return folder
  })

export { getFolders, createFolder, markFolderStar, renameFolder }
