import { QUERY_KEYS } from './query-keys'
import { getFolders, getStarredFolders } from '#/server/folders'
import { useQuery } from '@tanstack/react-query'
import { getFiles, getStarredFiles } from '#/server/files'

const useFiles = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.FILES],
    queryFn: getFiles,
  })
}

const useStarredFiles = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.STARRED_FILES],
    queryFn: getStarredFiles,
  })
}

const useFolders = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.FOLDERS],
    queryFn: getFolders,
  })
}

const useStarredFolders = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.STARRED_FOLDERS],
    queryFn: getStarredFolders,
  })
}

export { useFolders, useFiles, useStarredFiles, useStarredFolders }
