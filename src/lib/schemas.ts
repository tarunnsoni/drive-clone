import { z } from 'zod'

// SCHEMAS
export const createFolderSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Folder name is required')
    .max(100, 'Folder name must be less than 100 characters'),

  parentId: z.uuid('Invalid parent folder ID').nullable().optional(),
})

export const createFileSchema = z.object({
  name: z.string().min(1),
  storagePath: z.string().min(1),
  mimeType: z.string().min(1),
  size: z.number().positive(),
  folderId: z.uuid().nullable().optional(),
})

// SCHEMA TYPES

export type CreateFolderInput = z.infer<typeof createFolderSchema>
export type CreateFileInput = z.infer<typeof createFileSchema>
