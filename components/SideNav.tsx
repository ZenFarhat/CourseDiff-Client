import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { useAuth } from '../contexts/AuthContext'
import { logout } from '../firebase/auth'
import BasicButton from './BasicButton'

const SideNav = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="w-64 flex flex-col bg-gray-900 items-center justify-between py-4"> </div>
  }

  return (
    <div className="w-64 flex flex-col bg-gray-900 items-center justify-between py-4">
      <div className="flex items-center justify-center flex-col">
        <div className="rounded-full w-32 h-32 bg-white"></div>
        <p className="text-white my-5 text-xl">Hey, {user?.displayName}</p>
        <p className="text-s italic text-white">{user?.companyName}</p>
      </div>
      <BasicButton buttonText="Log out" onClick={logout} />
    </div>
  )
}

export default SideNav
