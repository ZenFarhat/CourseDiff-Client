import React from "react"
import { File } from "phosphor-react"

interface FileComponentProps {
  name: string
  handleFileClick: () => void
}

const FileComponent = (props: FileComponentProps) => {
  const { name, handleFileClick } = props

  return (
    <div onClick={handleFileClick} className="flex items-center cursor-pointer hover:bg-blue-700 z-50 w-full p-2 border-2 rounded-xl mb-2">
      <File size={22} color="#fbf4f4" />
      <p className="ml-2 text-white">{name}</p>
    </div>
  )
}

export default FileComponent
