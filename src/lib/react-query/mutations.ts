import { createFolder, markFolderStar, renameFolder } from '#/server/folders'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from './query-keys'
import type { CreateFolderInput, RenameInput } from '../schemas'
import {
  createFileRecord,
  markFileStar,
  renameFile,
  deleteFile,
  moveFileToTrash,
} from '#/server/files'
import { createBrowserSupabaseClient } from '../supabase/client'
import { useAuth } from '@clerk/tanstack-react-start'
import { getCurrentUserId } from '#/server/auth'
import { v4 as uuidv4 } from 'uuid'

// -- FILES --

const useMarkFileStar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (fileId: string) => markFileStar({ data: fileId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FILES],
      })

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.STARRED_FILES],
      })
    },
  })
}

const useRenameFile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (fileDetails: RenameInput) => renameFile({ data: fileDetails }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FILES],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.STARRED_FILES],
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
        queryKey: [QUERY_KEYS.FILES],
      })
    },
  })
}

function useMoveFileToTrash() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (fileId: string) => moveFileToTrash({ data: fileId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FILES],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.STARRED_FILES],
      })
    },
  })
}

function useDeleteFile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (fileId: string) =>
      deleteFile({
        data: fileId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FILES],
      })
    },
  })
}

// -- FOLDERS --

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

const useMarkFolderStar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (folderId: string) => markFolderStar({ data: folderId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FOLDERS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.STARRED_FOLDERS],
      })
    },
  })
}

const useRenameFolder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (folderDetails: RenameInput) =>
      renameFolder({ data: folderDetails }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FOLDERS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.STARRED_FOLDERS],
      })
    },
  })
}

export {
  useCreateFolder,
  useUploadFile,
  useMarkFolderStar,
  useMarkFileStar,
  useRenameFile,
  useRenameFolder,
  useMoveFileToTrash,
  useDeleteFile,
}
