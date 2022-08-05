import { Folder, FolderOpen } from "phosphor-react"
import { useState } from "react"
import { getFolder } from "../firebase/db/files"
import { FolderModel } from "../models/userCollectionModel.interface"
import { snackbarHandler$ } from "../rxjs"

interface ListFolderProps {
  name: string
  onContextMenu: () => void
  docId: string
}

const ListFolder = (props: ListFolderProps) => {
  const { name, onContextMenu, docId } = props
  const [folderData, setFolderData] = useState<FolderModel>()
  const [expanded, setExpanded] = useState(false)

  const handleFolderClick = () => {
    if (folderData) return setExpanded(!expanded)
    getFolder(docId)
      .then((data) => {
        setFolderData(data)
        setExpanded(true)
      })
      .catch((e) => {
        console.log(e)
        snackbarHandler$.next({ variant: "error", content: "Error fetching folder." })
      })
  }

  return (
    <>
      <div onContextMenu={onContextMenu} className="flex items-center cursor-pointer hover:bg-blue-700 z-50 w-full" onClick={handleFolderClick}>
        {expanded ? <FolderOpen size={22} color="#fbf4f4" /> : <Folder size={22} color="#fbf4f4" />}
        <p className="ml-2 text-white">{name}</p>
      </div>
      <div>
        {folderData &&
          expanded &&
          folderData.children.map((item, i) => {
            return (
              <div key={i} className="pr-6">
                {item.name}
              </div>
            )
          })}
      </div>
    </>
  )
}

export default ListFolder
