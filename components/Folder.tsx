import { Folder, FolderOpen } from "phosphor-react"
import { useState } from "react"
import { getFolder } from "../firebase/db/files"
import { FolderModel } from "../models/userCollectionModel.interface"
import { snackbarHandler$ } from "../rxjs"

interface ListFolderProps {
  name: string
  onContextMenu: (value: string) => void
  docId: string
  creatingFolder: boolean
  folderInfo: { name: string; parentFolderId: string }
  handleAddFolder: () => void
  onChange: (value: string) => void
}

const ListFolder = (props: ListFolderProps) => {
  const { name, onContextMenu, docId, creatingFolder, folderInfo, handleAddFolder, onChange } = props
  const [folderData, setFolderData] = useState<FolderModel>()
  const [expanded, setExpanded] = useState(false)

  const handleFolderClick = () => {
    setExpanded(!expanded)
    getFolder(docId)
      .then((data) => {
        setFolderData(data)
        console.log(data)
      })
      .catch((e) => {
        console.log(e)
        snackbarHandler$.next({ variant: "error", content: "Error fetching folder." })
      })
  }

  return (
    <>
      <div
        onContextMenu={() => {
          onContextMenu(docId)
        }}
        className="flex items-center cursor-pointer hover:bg-blue-700 z-50 w-full"
        onClick={handleFolderClick}
      >
        {expanded ? <FolderOpen size={22} color="#fbf4f4" /> : <Folder size={22} color="#fbf4f4" />}
        <p className="ml-2 text-white">{name}</p>
      </div>
      <div>
        {folderData &&
          expanded &&
          folderData.children.map((item, i) => {
            return (
              <>
                <div key={i} className="mr-5">
                  <ListFolder name={item.name} key={i} docId={item.docId || ""} onContextMenu={onContextMenu} creatingFolder={creatingFolder} folderInfo={folderInfo} handleAddFolder={handleAddFolder} onChange={onChange} />
                </div>
                {creatingFolder && folderInfo.parentFolderId === item.docId && (
                  <input
                    type="text"
                    className="focus:outline-none bg-blue-800 text-white w-full"
                    autoFocus
                    onChange={(e) => {
                      onChange(e.target.value)
                    }}
                    onKeyDown={(e) => {
                      e.key === "Enter" && handleAddFolder()
                    }}
                  />
                )}
              </>
            )
          })}
      </div>
    </>
  )
}

export default ListFolder
