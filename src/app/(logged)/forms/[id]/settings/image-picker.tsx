import { ChangeEvent, useState } from 'react'

export function ImagePicker() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(URL.createObjectURL(file))
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <label
        htmlFor="image-upload"
        className="flex h-64 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400"
      >
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected"
            className="h-full w-full rounded-lg object-cover"
          />
        ) : (
          <span className="text-gray-500">
            Clique para selecionar uma imagem
          </span>
        )}
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      {selectedImage && (
        <button
          onClick={removeImage}
          className="ml-auto rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Remover imagem
        </button>
      )}
    </div>
  )
}

export default ImagePicker
