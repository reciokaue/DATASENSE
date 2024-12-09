import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Upload } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { uploadFormImage } from '@/api/upload-form-image'
import { Button } from '@/components/ui/button'
import { Form } from '@/models'

interface UploadImageProps {
  form?: Form
  setValue?: any
}

export function UploadImage({ form, setValue }: UploadImageProps) {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    form?.logoUrl || null,
  )
  const queryClient = useQueryClient()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newFile = event.target.files[0]
      setFile(newFile)
      setPreviewUrl(URL.createObjectURL(newFile))
    }
  }

  const { mutateAsync: handleUpload, isPending } = useMutation({
    mutationFn: () => uploadFormImage(form.id, file),
    onSuccess: (result) => {
      const previous: Form = queryClient.getQueryData(['form', form.id])

      if (previous)
        queryClient.setQueryData(['form', form.id], {
          ...previous,
          logoUrl: result.logoUrl,
        })

      setFile(null)
      setValue('logoUrl', result.logoUrl)
      setPreviewUrl(result.logoUrl)
      toast('Imagem salva com sucesso', { type: 'success' })
    },
    onError: () => {
      toast('Não foi possível fazer o upload da imagem', { type: 'error' })
    },
  })

  async function handleRemoveImage() {
    await uploadFormImage(form.id, null)

    const previous: Form = queryClient.getQueryData(['form', form.id])

    if (previous)
      queryClient.setQueryData(['form', form.id], {
        ...previous,
        logoUrl: null,
      })

    setValue('logoUrl', null)
    setFile(null)
    setPreviewUrl(null)
  }

  const handleCancel = () => {
    setFile(null)
    setPreviewUrl(null)
  }

  useEffect(() => {
    setPreviewUrl(form?.logoUrl)
  }, [form])

  return (
    <div className="flex flex-col items-center justify-center">
      <label
        htmlFor="dropzone-file"
        className="relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-800"
      >
        {previewUrl !== null ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="absolute h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <Upload />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Clique para carregar uma imagem
            </p>
          </div>
        )}
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
      {previewUrl && !file && (
        <div className="mt-2 flex w-full items-center justify-end space-x-2">
          <Button type="button" onClick={handleRemoveImage} variant="outline">
            Remover imagem
          </Button>
        </div>
      )}
      {file && (
        <div className="mt-2 flex w-full items-center justify-end space-x-2">
          <Button
            type="button"
            onClick={handleCancel}
            variant="secondary"
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={() => handleUpload()}
            isLoading={isPending}
          >
            Salvar
          </Button>
        </div>
      )}
    </div>
  )
}
