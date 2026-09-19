import { useState } from 'react'
import { Loader2, Upload } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useUploadFile } from '#/lib/react-query/mutations'

interface UploadFileButtonProps {
  folderId?: string | null
  position?: 'header' | 'content'
}

export function UploadFileButton({
  folderId = null,
  position = 'content',
}: UploadFileButtonProps) {
  const uploadMutation = useUploadFile()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setErrorMessage(null)

    const file = event.target.files?.[0]

    if (!file) return

    try {
      await uploadMutation.mutateAsync({
        file,
        folderId,
      })
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to upload file',
      )
    } finally {
      event.target.value = ''
    }
  }

  const isUploading = uploadMutation.isPending

  return (
    <div className="flex flex-col items-end gap-2">
      <input
        id="cloudvault-file-upload"
        type="file"
        className="sr-only"
        disabled={isUploading}
        onChange={handleFileChange}
      />

      <Button
        asChild
        className={`gap-2 ${isUploading ? 'opacity-60' : ''}`}
        disabled={isUploading}
      >
        <label htmlFor="cloudvault-file-upload" className="cursor-pointer">
          {isUploading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Upload className="size-4" />
          )}

          {position !== 'header' && (isUploading ? 'Uploading...' : 'Upload')}
        </label>
      </Button>

      {errorMessage && (
        <p className="max-w-xs text-right text-sm text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  )
}
