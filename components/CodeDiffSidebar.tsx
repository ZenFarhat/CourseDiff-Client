import React, { useState } from "react"
import { FolderChildrenModel } from "../models/userCollectionModel.interface"

import { MagnifyingGlass } from "phosphor-react"
import ComponentRequiresAuth from "./ComponentRequiresAuth"
import ContextMenu from "./ContextMenu"

interface CodeDiffSidebarProps {
  files: FolderChildrenModel[]
  rootId: string
}

const CodeDiffSidebar = (props: CodeDiffSidebarProps) => {
  const { files, rootId } = props

  return (
    <div className="w-1/6 bg-blue-900 h-full p-2">
      <div className="flex justify-center items-center mb-5">
        <MagnifyingGlass size={36} className="bg-gray-100 rounded-tl-xl rounded-bl-xl" />
        <input type="text" placeholder="Find Timstamp" className="bg-gray-100 text-gray-900 text-sm rounded-tr-xl rounded-br-xl w-full p-2" onChange={(e) => {}} />
      </div>
      <div>
        {files?.map((item, i) => {
          return (
            <div key={i} id={item.id} className={`${item.type === "folder" ? "bg-yellow-100" : "bg-blue-200"} cursor-pointer`}>
              {item.name}
            </div>
          )
        })}
      </div>
      <ComponentRequiresAuth>
        <ContextMenu />
      </ComponentRequiresAuth>
    </div>
  )
}

export default CodeDiffSidebar
