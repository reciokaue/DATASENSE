import { Upload } from 'lucide-react'
import { useState } from 'react'

import { uploadFormImage } from '@/api/upload-form-image'
import { Form } from '@/models'

import { Button } from '../ui/button'

interface UploadImageProps {
  form?: Form
}

export function UploadImage({ form }: UploadImageProps) {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newFile = event.target.files[0]
      setFile(newFile)
      setPreviewUrl(URL.createObjectURL(newFile))
    }
  }

  const handleUpload = async () => {
    if (file && form?.id) {
      try {
        await uploadFormImage(form.id, file)
        console.log('Image uploaded successfully!')
        setFile(null)
      } catch (error) {
        console.error(error)
        console.log('Failed to upload image.')
      }
    } else {
      console.log('Please select a file to upload.')
    }
  }

  const handleCancel = () => {
    setFile(null)
    setPreviewUrl(null)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <label
        htmlFor="dropzone-file"
        className="relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-800"
      >
        {previewUrl !== null || form?.logoUrl ? (
          <img
            src={previewUrl || form?.logoUrl}
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

      {file && (
        <div className="mt-2 flex w-full items-center justify-end space-x-2">
          <Button type="button" onClick={handleCancel} variant="secondary">
            Cancelar
          </Button>
          <Button type="button" onClick={handleUpload}>
            Salvar
          </Button>
        </div>
      )}
    </div>
  )
}
