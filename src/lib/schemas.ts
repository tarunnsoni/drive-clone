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

// SCHEMA TYPES
export type CreateFolderInput = z.infer<typeof createFolderSchema>
