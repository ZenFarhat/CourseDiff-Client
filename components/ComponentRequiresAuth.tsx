import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"

const ComponentRequiresAuth = (props: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)

  const { children } = props
  const { user } = useAuth()
  const router = useRouter()
  const { companyName } = router.query

  useEffect(() => {
    console.log(user, companyName)
    setLoading(false)
  }, [])

  if (loading) {
    return <></>
  }

  if (user && user.companyName === companyName?.toString()) {
    return <>{children}</>
  }

  return null
}

export default ComponentRequiresAuth
