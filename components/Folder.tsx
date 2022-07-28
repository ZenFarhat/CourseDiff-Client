import { useState } from "react"
import { FilesArrayModel } from "../models/userCollectionModel.interface"

interface FolderProps {
  refId: string
  data: FilesArrayModel[]
  currentFolderName: string
}

const Folder = (props: FolderProps) => {
  const [folderContents, setFolderContents] = useState<FilesArrayModel>()
  const [hidden, setHidden] = useState(true)
  const { refId, data, currentFolderName } = props

  const handleFolderClick = () => {
    setFolderContents(data.find((item) => item.refId === refId))
    setHidden((value) => !value)
  }

  return (
    <>
      <div className="bg-yellow-100" onClick={handleFolderClick}>
        {currentFolderName}
      </div>
      <div style={{ display: hidden ? "none" : "block" }} className="bg-blue-50">
        {folderContents?.children.map((item) => {
          return item.type === "folder" ? <Folder refId={item.id} data={data} currentFolderName={item.name} /> : <div>{item.name}</div>
        })}
      </div>
    </>
  )
}

export default Folder
