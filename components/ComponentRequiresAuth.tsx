import { useRouter } from "next/router"
import React from "react"
import { useAuth } from "../contexts/AuthContext"

const ComponentRequiresAuth = (props: { children: React.ReactNode }) => {
  const { children } = props
  const { user } = useAuth()
  const router = useRouter()
  const { companyName } = router.query

  if (user && user.companyName === companyName?.toString()) {
    return <>{children}</>
  }

  return null
}

export default ComponentRequiresAuth
