import React, { useEffect, useState } from "react"
import useClickOutside from "../hooks/useClickOutside"

const ContextMenu = () => {
  const [xyPos, setXypos] = useState({ x: 0, y: 0 })
  const { ref, isComponentVisible, setIsComponentVisible } = useClickOutside(false)

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
      <p>New File</p>
      <p>New Folder</p>
    </div>
  )
}

export default ContextMenu
