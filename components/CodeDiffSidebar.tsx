import React, { useRef, useState } from "react"
import { FolderChildrenModel } from "../models/userCollectionModel.interface"

import { MagnifyingGlass } from "phosphor-react"
import ComponentRequiresAuth from "./ComponentRequiresAuth"
import ContextMenu from "./ContextMenu"
import { addNewFolder } from "../firebase/db/files"
import { snackbarHandler$ } from "../rxjs"
import ListFolder from "./Folder"

interface CodeDiffSidebarProps {
  files: FolderChildrenModel[]
  rootId: string
}

interface FolderDetails {
  name: string
  parentFolderId: string
}

const CodeDiffSidebar = (props: CodeDiffSidebarProps) => {
  const { files, rootId } = props

  const [creatingFolder, setCreatingFolder] = useState(false)
  const [folderInfo, setFolderInfo] = useState<FolderDetails>({ name: "", parentFolderId: rootId })

  const inputRef = useRef<HTMLInputElement>(null)

  const createFolder = () => {
    setCreatingFolder(true)
  }

  const handleAddFolder = () => {
    if (!folderInfo) return
    addNewFolder(folderInfo?.parentFolderId, folderInfo?.name)
      .then(() => {
        snackbarHandler$.next({ variant: "success", content: "Folder Added!" })
        setCreatingFolder(false)
        setFolderInfo({ name: "", parentFolderId: rootId })
      })
      .catch((e) => {
        snackbarHandler$.next({ variant: "error", content: "Failed to add folder!" })
      })
  }

  return (
    <div className="w-1/6 bg-blue-900 h-full p-2">
      <div className="flex justify-center items-center mb-5">
        <MagnifyingGlass size={36} className="bg-gray-100 rounded-tl-xl rounded-bl-xl" />
        <input type="text" placeholder="Find Timstamp" className="bg-gray-100 text-gray-900 text-sm rounded-tr-xl rounded-br-xl w-full p-2" onChange={(e) => {}} />
      </div>
      <div>
        {files?.map((item, i) => {
          return (
            <>
              {item.type === "folder" && (
                <>
                  <ListFolder
                    name={item.name}
                    key={i}
                    docId={item.docId || ""}
                    onContextMenu={() => {
                      setFolderInfo({ ...folderInfo, parentFolderId: item.docId || "" })
                    }}
                  />
                </>
              )}
              {creatingFolder && folderInfo.parentFolderId === item.docId && (
                <input
                  type="text"
                  ref={inputRef}
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
      {creatingFolder && folderInfo.parentFolderId === rootId && (
        <input
          type="text"
          ref={inputRef}
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
        <ContextMenu creatingFolder={createFolder} />
      </ComponentRequiresAuth>
    </div>
  )
}

export default CodeDiffSidebar
