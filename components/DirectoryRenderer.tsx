import { Folder, FolderOpen } from "phosphor-react"
import { useState } from "react"
import { getFolder } from "../firebase/db/files"
import { FolderModel } from "../models/userCollectionModel.interface"
import { snackbarHandler$ } from "../rxjs"
import { sortDirectories } from "../utils/sortDirectories"

interface DirectoryRendererProps {
  name: string
  onContextMenu: (value: string) => void
  docId: string
  creatingDirectory: boolean
  folderInfo: { name: string; parentFolderId: string }
  handleAddFolder: () => void
  onChange: (value: string) => void
  type: string
}

const DirectoryRenderer = (props: DirectoryRendererProps) => {
  const { name, onContextMenu, docId, creatingDirectory, folderInfo, handleAddFolder, onChange, type } = props
  const [folderData, setFolderData] = useState<FolderModel>()
  const [expanded, setExpanded] = useState(false)

  const handleFolderClick = () => {
    setExpanded(!expanded)
    getFolder(docId)
      .then((data) => {
        setFolderData(data)
      })
      .catch((e) => {
        console.log(e)
        snackbarHandler$.next({ variant: "error", content: "Error fetching folder." })
      })
  }

  const ChooseDirectoryType = () => {
    if (type === "folder") {
      return (
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
      )
    } else {
      return <div>{name}</div>
    }
  }

  return (
    <>
      <ChooseDirectoryType />
      <div>
        {folderData &&
          expanded &&
          sortDirectories(folderData.children).map((item, i) => {
            return (
              <>
                <div key={i} className="mr-5">
                  <DirectoryRenderer type={item.type} name={item.name} key={i} docId={item.docId || ""} onContextMenu={onContextMenu} creatingDirectory={creatingDirectory} folderInfo={folderInfo} handleAddFolder={handleAddFolder} onChange={onChange} />
                </div>
                {creatingDirectory && folderInfo.parentFolderId === item.docId && (
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

export default DirectoryRenderer
