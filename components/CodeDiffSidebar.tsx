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
  const [folderInfo, setFolderInfo] = useState<DirectoryDetails>({ name: "", parentFolderId: rootId, directoryType: "" })

  const createFolder = () => {
    setCreatingDirectory(true)
    setFolderInfo({ ...folderInfo, directoryType: "folder" })
  }

  const createFile = () => {
    setCreatingDirectory(true)
    setFolderInfo({ ...folderInfo, directoryType: "file" })
  }

  const handleAddFolder = () => {
    if (folderInfo.directoryType === "folder") {
      addNewFolder(folderInfo.parentFolderId, folderInfo.name).then(() => {
        setCreatingDirectory(false)
      })
    } else if (folderInfo.directoryType === "file") {
      addNewFile(folderInfo.parentFolderId, folderInfo.name).then(() => {
        setCreatingDirectory(false)
      })
    }
    setFolderInfo({ name: "", parentFolderId: rootId, directoryType: "" })
  }

  const onContextMenu = (value: string) => {
    setFolderInfo({ ...folderInfo, parentFolderId: value })
  }

  const onChange = (value: string) => {
    setFolderInfo({ ...folderInfo, name: value })
  }

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
              <DirectoryRenderer type={item.type} creatingDirectory={creatingDirectory} name={item.name} key={i} docId={item.docId || ""} onContextMenu={onContextMenu} handleAddFolder={handleAddFolder} folderInfo={folderInfo} onChange={onChange} />
              {creatingDirectory && folderInfo.parentFolderId === item.docId && (
                <input
                  type="text"
                  className="focus:outline-none bg-blue-800 text-white w-full"
                  autoFocus
                  onChange={(e) => {
                    setFolderInfo({ ...folderInfo, name: e.target.value })
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
      {creatingDirectory && folderInfo.parentFolderId === rootId && (
        <input
          type="text"
          className="focus:outline-none bg-blue-800 text-white w-full"
          autoFocus
          onChange={(e) => {
            setFolderInfo({ ...folderInfo, name: e.target.value })
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
