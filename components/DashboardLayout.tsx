import React from "react"
import SideNav from "./SideNav"
import ComponentRequiresAuth from "./ComponentRequiresAuth"

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
