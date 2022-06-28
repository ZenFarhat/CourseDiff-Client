import { useRouter } from "next/router"
import React, { useState } from "react"
import { FileApi } from "../api/FileApi"
import { FilesArrayModel, VideosModel } from "../models/userCollectionModel.interface"
import { refreshDiffData$ } from "../rxjs"

import BasicButton from "./BasicButton"

interface CodeDiffSidebarProps {
  files: FilesArrayModel[]
  setCurrentCode: (value: string) => void
}

const CodeDiffSidebar = (props: CodeDiffSidebarProps) => {
  const [fileName, setFileName] = useState("")
  const router = useRouter()
  const { files, setCurrentCode } = props

  const { videoName } = router.query

  const fileApi = new FileApi()

  const addFile = () => {
    if (!videoName) return
    fileApi.addFile({ fileName: fileName, codeDiffs: [{ timeStamp: "0:00", codeDiff: "" }] }, videoName.toString()).then(() => {
      refreshDiffData$.next(true)
    })
  }

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
        {files.map((item, i) => {
          return (
            <div
              className="w-full py-1 text-white cursor-pointer hover:bg-blue-800"
              key={i}
              onClick={() => {
                setCurrentCode(item.fileName)
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
