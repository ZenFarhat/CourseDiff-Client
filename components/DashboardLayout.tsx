import React from "react"
import { logout } from "../firebase/authUtils"
import BasicButton from "./BasicButton"
import SideNav from "./SideNav"

interface DashBoardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = (props: DashBoardLayoutProps) => {
  const { children } = props

  return (
    <>
      <div className="flex h-screen">
        <SideNav />
        <div className="flex-auto grow">{children}</div>
      </div>
    </>
  )
}

export default DashboardLayout
