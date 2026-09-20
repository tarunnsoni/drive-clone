import { createFolder, markFolderStar } from '#/server/folders'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from './query-keys'
import type { CreateFolderInput } from '../schemas'
import { createFileRecord, markFileStar } from '#/server/files'
import { createBrowserSupabaseClient } from '../supabase/client'
import { useAuth } from '@clerk/tanstack-react-start'
import { getCurrentUserId } from '#/server/auth'
import { v4 as uuidv4 } from 'uuid'

const useCreateFolder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (folderDetails: CreateFolderInput) =>
      createFolder({ data: folderDetails }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FOLDERS],
      })
    },
  })
}

function useUploadFile() {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({
      file,
      folderId = null,
    }: {
      file: File
      folderId?: string | null
    }) => {
      const userId = await getCurrentUserId()

      const supabase = createBrowserSupabaseClient(getToken)

      const fileId = uuidv4()

      const extension = file.name.includes('.')
        ? `.${file.name.split('.').pop()}`
        : ''

      const folderPath = folderId ?? 'root'

      const storagePath = `${userId}/${folderPath}/${fileId}${extension}`

      const { data: uploadedFile, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(storagePath, file, {
          contentType: file.type || 'application/octet-stream',
          upsert: false,
        })

      if (uploadError) {
        throw new Error(uploadError.message)
      }

      const fileRecord = await createFileRecord({
        data: {
          name: file.name,
          storagePath: uploadedFile.path,
          mimeType: file.type || 'application/octet-stream',
          size: file.size,
          folderId,
        },
      })

      return fileRecord
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['files'],
      })
    },
  })
}

const useMarkFolderStar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (folderId: string) => markFolderStar({ data: folderId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FOLDERS],
      })
    },
  })
}

const useMarkFileStar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (fileId: string) => markFileStar({ data: fileId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FILES],
      })
    },
  })
}

export { useCreateFolder, useUploadFile, useMarkFolderStar, useMarkFileStar }
