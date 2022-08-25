import React from "react"
import { Folder, FolderOpen } from "phosphor-react"

interface FolderComponentProps {
  name: string
  handleFolderClick: () => void
  expanded: boolean
}

const FolderComponent = (props: FolderComponentProps) => {
  const { name, handleFolderClick, expanded } = props

  return (
    <div onClick={handleFolderClick} className="flex items-center cursor-pointer hover:bg-blue-700 z-50 w-full p-2 border-2 rounded-xl mb-2">
      {expanded ? <FolderOpen size={22} color="#fbf4f4" /> : <Folder size={22} color="#fbf4f4" />}
      <p className="ml-2 text-white">{name}</p>
    </div>
  )
}

export default FolderComponent
