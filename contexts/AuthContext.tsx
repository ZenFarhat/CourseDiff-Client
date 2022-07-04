import React, { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"

import { UserDetailsModel } from "../models/userDetails.interface"
import { getUserInfo } from "../firebase/db"

interface AuthContextProps {
  user: UserDetailsModel | null
  updateCompanyContext: (value: string) => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserDetailsModel | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName || "",
          companyName: "",
        })
        await getUserInfo(user.uid)
      } else {
        setUser(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const updateCompanyContext = (name: string) => {
    if (!user) return
    setUser({ ...user, companyName: name })
  }

  return <AuthContext.Provider value={{ user, updateCompanyContext }}>{loading ? null : children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
