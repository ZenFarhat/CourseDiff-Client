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
      <div style={{ backgroundColor: "#F2DC9A" }} onClick={handleFolderClick}>
        {currentFolderName}
      </div>
      <div style={{ display: hidden ? "none" : "block", backgroundColor: "#00c3ff" }}>
        {folderContents?.children.map((item) => {
          return item.type === "folder" ? <Folder refId={item.Id} data={data} currentFolderName={item.name} /> : <div>{item.name}</div>
        })}
      </div>
    </>
  )
}

export default Folder
