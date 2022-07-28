import React, { useState } from "react"
import { FilesArrayModel } from "../models/userCollectionModel.interface"

import { MagnifyingGlass } from "phosphor-react"
import Folder from "../components/Folder"
import BasicButton from "./BasicButton"

interface CodeDiffSidebarProps {
  files: FilesArrayModel[]
  getFileInfo: (value: string) => void
  addFile: (fileName: string, refId: string) => void
  deleteFile: (value: string) => void
  handleSearch: (value: string) => void
}

const CodeDiffSidebar = (props: CodeDiffSidebarProps) => {
  const { files, addFile, handleSearch } = props
  const [fileName, setFileName] = useState("")

  return (
    <div className="w-1/6 bg-blue-900 h-full p-2">
      <div className="flex justify-center items-center mb-5">
        <MagnifyingGlass size={36} className="bg-gray-100 rounded-tl-xl rounded-bl-xl" />
        <input
          type="text"
          placeholder="Find Timstamp"
          className="bg-gray-100 text-gray-900 text-sm rounded-tr-xl rounded-br-xl w-full p-2"
          onChange={(e) => {
            handleSearch(e.target.value)
          }}
        />
      </div>
      <div>
        {files[0]?.children?.map((item, i) => {
          return (
            <div key={i} style={{ cursor: "pointer" }}>
              {item.type === "folder" ? (
                <div>
                  <Folder refId={item.id} data={files} currentFolderName={item.name} />
                </div>
              ) : (
                <div>{item.name}</div>
              )}
              <input
                type="text"
                onChange={(e) => {
                  setFileName(e.target.value)
                }}
              />
              <BasicButton
                onClick={() => {
                  addFile(fileName, item.id)
                }}
                buttonText="Add"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CodeDiffSidebar
