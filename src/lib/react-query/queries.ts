import { QUERY_KEYS } from './query-keys'
import {
  getChildFolders,
  getFolder,
  getFolders,
  getStarredFolders,
} from '#/server/folders'
import { useQuery } from '@tanstack/react-query'
import { getFiles, getFolderFiles, getStarredFiles } from '#/server/files'

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

const useFolderFiles = (folderId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FILES, QUERY_KEYS.FOLDER, folderId],
    queryFn: () => getFolderFiles({ data: folderId }),
    enabled: !!folderId,
  })
}

const useFolders = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.FOLDERS],
    queryFn: getFolders,
  })
}

export function useFolder(folderId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.FOLDER, folderId],
    queryFn: () => getFolder({ data: folderId }),
    enabled: !!folderId,
  })
}

const useStarredFolders = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.STARRED_FOLDERS],
    queryFn: getStarredFolders,
  })
}

const useChildFolders = (folderId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FOLDERS, QUERY_KEYS.CHILDREN, folderId],
    queryFn: () => getChildFolders({ data: folderId }),
    enabled: !!folderId,
  })
}

export {
  useFolders,
  useFiles,
  useStarredFiles,
  useStarredFolders,
  useChildFolders,
  useFolderFiles,
}
