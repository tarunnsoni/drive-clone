import { QUERY_KEYS } from './query-keys'
import { getFolders } from '#/server/folders'
import { useQuery } from '@tanstack/react-query'
import { getFiles } from '#/server/files'

const useFolders = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.FOLDERS],
    queryFn: getFolders,
  })
}

const useFiles = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.FILES],
    queryFn: getFiles,
  })
}

export { useFolders, useFiles }
