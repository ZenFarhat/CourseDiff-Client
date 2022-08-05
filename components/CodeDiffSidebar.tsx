import React, { useRef, useState } from "react"
import { FolderChildrenModel } from "../models/userCollectionModel.interface"

import { MagnifyingGlass } from "phosphor-react"
import ComponentRequiresAuth from "./ComponentRequiresAuth"
import ContextMenu from "./ContextMenu"
import { addNewFile, addNewFolder } from "../firebase/db/files"
import { snackbarHandler$ } from "../rxjs"
import ListFolder from "./DirectoryRenderer"
import DirectoryRenderer from "./DirectoryRenderer"
import { sortDirectories } from "../utils/sortDirectories"

interface CodeDiffSidebarProps {
  files: FolderChildrenModel[]
  rootId: string
}

interface DirectoryDetails {
  name: string
  parentFolderId: string
  directoryType: string
}

const CodeDiffSidebar = (props: CodeDiffSidebarProps) => {
  const { files, rootId } = props

  const [creatingDirectory, setCreatingDirectory] = useState(false)
  const [directoryInfo, setDirectoryInfo] = useState<DirectoryDetails>({ name: "", parentFolderId: rootId, directoryType: "" })

  const createFolder = () => {
    setCreatingDirectory(true)
    setDirectoryInfo({ ...directoryInfo, directoryType: "folder" })
  }

  const createFile = () => {
    setCreatingDirectory(true)
    setDirectoryInfo({ ...directoryInfo, directoryType: "file" })
  }

  const handleAddFolder = () => {
    if (directoryInfo.directoryType === "folder") {
      addNewFolder(directoryInfo.parentFolderId, directoryInfo.name).then(() => {
        setCreatingDirectory(false)
      })
    } else if (directoryInfo.directoryType === "file") {
      addNewFile(directoryInfo.parentFolderId, directoryInfo.name).then(() => {
        setCreatingDirectory(false)
      })
    }
    setDirectoryInfo({ name: "", parentFolderId: rootId, directoryType: "" })
  }

  const onContextMenu = (value: string) => {
    setDirectoryInfo({ ...directoryInfo, parentFolderId: value })
  }

  const onChange = (value: string) => {
    setDirectoryInfo({ ...directoryInfo, name: value })
  }

  console.log(directoryInfo.parentFolderId)

  return (
    <div className="w-1/6 bg-blue-900 h-full p-2">
      <div className="flex justify-center items-center mb-5">
        <MagnifyingGlass size={36} className="bg-gray-100 rounded-tl-xl rounded-bl-xl" />
        <input type="text" placeholder="Find Timstamp" className="bg-gray-100 text-gray-900 text-sm rounded-tr-xl rounded-br-xl w-full p-2" onChange={(e) => {}} />
      </div>
      <div>
        {sortDirectories(files).map((item, i) => {
          return (
            <>
              <DirectoryRenderer type={item.type} creatingDirectory={creatingDirectory} name={item.name} key={i} docId={item.docId || ""} onContextMenu={onContextMenu} handleAddFolder={handleAddFolder} directoryInfo={directoryInfo} onChange={onChange} />
              {creatingDirectory && directoryInfo.parentFolderId === item.docId && (
                <input
                  type="text"
                  className="focus:outline-none bg-blue-800 text-white w-full"
                  autoFocus
                  onChange={(e) => {
                    setDirectoryInfo({ ...directoryInfo, name: e.target.value })
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
      {creatingDirectory && directoryInfo.parentFolderId === rootId && (
        <input
          type="text"
          className="focus:outline-none bg-blue-800 text-white w-full"
          autoFocus
          onChange={(e) => {
            setDirectoryInfo({ ...directoryInfo, name: e.target.value })
          }}
          onKeyDown={(e) => {
            e.key === "Enter" && handleAddFolder()
          }}
        />
      )}
      <ComponentRequiresAuth>
        <ContextMenu createFile={createFile} createFolder={createFolder} />
      </ComponentRequiresAuth>
    </div>
  )
}

export default CodeDiffSidebar
