import { useRouter } from "next/router"
import React, { useState } from "react"
import { FilesArrayModel } from "../models/userCollectionModel.interface"

import BasicButton from "./BasicButton"

interface CodeDiffSidebarProps {
  files: FilesArrayModel[] | null
  getFileInfo: (value: string) => void
}

const CodeDiffSidebar = (props: CodeDiffSidebarProps) => {
  const [fileName, setFileName] = useState("")
  const { files, getFileInfo } = props

  const addFile = () => {}
  console.log(files)

  return (
    <div className="w-1/6 bg-blue-900 h-full p-2">
      <div className="">
        <input
          className="w-3/6"
          onChange={(e) => {
            setFileName(e.target.value)
          }}
        />
        <BasicButton buttonText="Add File" onClick={addFile} />
      </div>
      <div>
        {files?.map((item, i) => {
          return (
            <div
              className="w-full py-1 text-white cursor-pointer hover:bg-blue-800"
              key={i}
              onClick={() => {
                getFileInfo(item.fileName)
              }}
            >
              {item.fileName}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CodeDiffSidebar
