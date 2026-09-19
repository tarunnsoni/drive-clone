import { createFolder } from '#/server/folders'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from './query-keys'
import type { CreateFolderInput } from '../schemas'

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

export { useCreateFolder }
