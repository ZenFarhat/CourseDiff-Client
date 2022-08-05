import React, { useEffect, useState } from "react"
import useClickOutside from "../hooks/useClickOutside"

interface ContextMenuProps {
  createFolder: () => void
  createFile: () => void
}

const ContextMenu = (props: ContextMenuProps) => {
  const [xyPos, setXypos] = useState({ x: 0, y: 0 })
  const { ref, isComponentVisible, setIsComponentVisible } = useClickOutside(false)
  const { createFolder, createFile } = props

  const customContextMenu = (e: MouseEvent) => {
    e.preventDefault()
    setIsComponentVisible(true)
    setXypos({ ...xyPos, x: e.x, y: e.y })
  }

  useEffect(() => {
    document.addEventListener("contextmenu", customContextMenu)

    return () => {
      document.removeEventListener("contextmenu", customContextMenu)
    }
  }, [])

  return (
    <div className="fixed bg-white p-2 shadow-2xl rounded-xl transition-opacity cursor-pointer z-50" style={{ display: isComponentVisible ? "block" : "none", top: xyPos.y, left: xyPos.x, opacity: isComponentVisible ? "1" : "0" }} ref={ref}>
      <p
        onClick={() => {
          createFile()
          setIsComponentVisible(false)
        }}
      >
        New File
      </p>
      <p
        onClick={() => {
          createFolder()
          setIsComponentVisible(false)
        }}
      >
        New Folder
      </p>
    </div>
  )
}

export default ContextMenu
