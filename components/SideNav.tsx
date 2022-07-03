import { useRouter } from "next/router"
import React from "react"
import { logout } from "../firebase/auth"
import BasicButton from "./BasicButton"

const SideNav = () => {
  const router = useRouter()

  return (
    <div className="w-64 flex flex-col bg-gray-900 items-center justify-between py-4">
      <div>
        <div className="rounded-full w-32 h-32 bg-white"></div>
      </div>
      <BasicButton
        buttonText="Go Back"
        onClick={() => {
          router.back()
        }}
      />
      <BasicButton buttonText="Log out" onClick={logout} />
    </div>
  )
}

export default SideNav
