"use client"

import { Trash2 } from "lucide-react"
import { useRef } from "react"

const FileUpload = ({ label, placeholder, file, onFileChange }) => {
  const fileInputRef = useRef(null)

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      onFileChange(selectedFile)
    }
  }

  const handleRemoveFile = () => {
    onFileChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getPreviewUrl = () => {
    if (file) {
      return URL.createObjectURL(file)
    }
    return "/placeholder.svg?height=64&width=64"
  }

  const getFileName = () => {
    if (file) {
      return file.name
    }
    return placeholder
  }

  return (
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <img src={getPreviewUrl() || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleFileSelect}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded border"
          >
            Choose File
          </button>
          <span className="text-sm text-gray-500 truncate max-w-xs">{getFileName()}</span>
          <input ref={fileInputRef} type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
        </div>
      </div>
      {file && (
        <button type="button" onClick={handleRemoveFile} className="p-2 text-gray-400 hover:text-red-500">
          <Trash2 size={20} />
        </button>
      )}
    </div>
  )
}

export default FileUpload;
