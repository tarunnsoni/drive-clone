export type FileType = 'pdf' | 'image' | 'spreadsheet' | 'archive' | 'document'

export type FileCardProps = {
  name: string
  type: FileType
  size: string
  modified: string
  starred?: boolean
}

export type Folder = {
  id: string
  user_id: string
  name: string
  parent_id: string | null
  created_at: string
  updated_at: string
}

export type File = {
  id: string
  user_id: string
  folder_id: string | null
  name: string
  storage_path: string
  mime_type: string
  size: number
  is_starred: boolean
  deleted_at: string | null
  created_at: string
  updated_at: string
}
