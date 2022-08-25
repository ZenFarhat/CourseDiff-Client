import { useId, useState } from "react"
import { getFolder } from "../firebase/db/files"
import { FolderModel } from "../models/userCollectionModel.interface"
import { snackbarHandler$ } from "../rxjs"
import { sortDirectories } from "../utils/sortDirectories"
import FileComponent from "./FileComponent"
import FolderComponent from "./FolderComponent"

interface DirectoryRendererProps {
  name: string
  onContextMenuCapture: (value: string) => void
  docId: string
  creatingDirectory: boolean
  directoryInfo: { name: string; parentFolderId: string }
  handleAddFolder: () => void
  onChange: (value: string) => void
  type: string
}

const DirectoryRenderer = (props: DirectoryRendererProps) => {
  const { name, onContextMenuCapture, docId, creatingDirectory, directoryInfo, handleAddFolder, onChange, type } = props
  const id = useId()
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

  const handleFileClick = () => {
    console.log(name)
  }

  return (
    <div className="z-50">
      {
        <div
          onContextMenuCapture={() => {
            onContextMenuCapture(docId)
          }}
        >
          {type === "folder" ? <FolderComponent name={name} expanded={expanded} handleFolderClick={handleFolderClick} /> : <FileComponent name={name} handleFileClick={handleFileClick} />}
        </div>
      }
      <div>
        {folderData &&
          expanded &&
          sortDirectories(folderData.children).map((item, i) => {
            return (
              <div key={i + docId}>
                <div className="ml-2">
                  <DirectoryRenderer type={item.type} name={item.name} docId={item.docId || ""} onContextMenuCapture={onContextMenuCapture} creatingDirectory={creatingDirectory} directoryInfo={directoryInfo} handleAddFolder={handleAddFolder} onChange={onChange} />
                </div>
                {creatingDirectory && directoryInfo.parentFolderId === item.docId && (
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
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default DirectoryRenderer
