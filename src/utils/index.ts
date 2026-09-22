import { createClient } from '#/lib/supabase/server'

export async function getFolderTreeIds(folderId: string, userId: string) {
  const supabase = await createClient()

  const { data: folders, error } = await supabase
    .from('folders')
    .select('id, parent_id')
    .eq('user_id', userId)

  if (error) {
    throw new Error(error.message)
  }

  const folderIds = new Set<string>([folderId])

  let changed = true

  while (changed) {
    changed = false

    for (const folder of folders) {
      if (
        folder.parent_id &&
        folderIds.has(folder.parent_id) &&
        !folderIds.has(folder.id)
      ) {
        folderIds.add(folder.id)
        changed = true
      }
    }
  }

  return [...folderIds]
}
