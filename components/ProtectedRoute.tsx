import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const router = useRouter()
  const { children } = props
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [router, user])

  return <>{user ? children : null}</>
}

export default ProtectedRoute
