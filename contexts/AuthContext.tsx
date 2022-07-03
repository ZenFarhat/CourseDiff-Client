import React, { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"

import { UserDetailsModel } from "../models/userDetails.interface"

interface AuthContextProps {
  user: UserDetailsModel | null
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserDetailsModel | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName || "",
        })
      } else {
        setUser(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return <AuthContext.Provider value={{ user }}>{loading ? null : children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
