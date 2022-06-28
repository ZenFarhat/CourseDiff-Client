import { useRouter } from "next/router"
import React from "react"
import BasicButton from "../components/BasicButton"
import { useAuth } from "../contexts/AuthContext"

const Nav = () => {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <nav className="mx-auto flex justify-between items-center py-4 px-8 container">
      <p>CourseDiff</p>
      <BasicButton
        buttonText={user ? "Go to Dashboard" : "Go to login"}
        onClick={() => {
          user ? router.push("/dashboard") : router.push("/login")
        }}
      />
    </nav>
  )
}

export default Nav
