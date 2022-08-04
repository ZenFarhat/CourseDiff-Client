import React, { useState } from "react"
import { FolderChildrenModel } from "../models/userCollectionModel.interface"

import { MagnifyingGlass } from "phosphor-react"

interface CodeDiffSidebarProps {
  files: FolderChildrenModel[] | undefined
}

const CodeDiffSidebar = (props: CodeDiffSidebarProps) => {
  const { files } = props
  const [fileName, setFileName] = useState("")

  return (
    <div className="w-1/6 bg-blue-900 h-full p-2">
      <div className="flex justify-center items-center mb-5">
        <MagnifyingGlass size={36} className="bg-gray-100 rounded-tl-xl rounded-bl-xl" />
        <input type="text" placeholder="Find Timstamp" className="bg-gray-100 text-gray-900 text-sm rounded-tr-xl rounded-br-xl w-full p-2" onChange={(e) => {}} />
      </div>
      <div>
        {files?.map((item, i) => {
          return <div key={i}>{item.name}</div>
        })}
      </div>
    </div>
  )
}

export default CodeDiffSidebar
