import React from "react"
import { useAuth } from "../contexts/AuthContext"
import SideNav from "./SideNav"

const DiffEditorAuthWrapper = (props: { children: React.ReactNode }) => {
  const { children } = props
  const { user } = useAuth()

  if (user) {
    return <div className="w-full h-full bg-gray-100 p-14">{children}</div>
  }

  return <div className="w-full h-screen bg-gray-100 p-14">{children}</div>
}

export default DiffEditorAuthWrapper
