export type FileType = 'pdf' | 'image' | 'spreadsheet' | 'archive' | 'document'

export type FileCardProps = {
  name: string
  type: FileType
  size: string
  modified: string
  starred?: boolean
}
