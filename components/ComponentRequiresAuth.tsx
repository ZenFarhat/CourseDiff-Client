import React from "react"
import { useAuth } from "../contexts/AuthContext"

const ComponentRequiresAuth = (props: { children: React.ReactNode }) => {
  const { children } = props
  const { user } = useAuth()

  if (user) {
    return <>{children}</>
  }

  return null
}

export default ComponentRequiresAuth
