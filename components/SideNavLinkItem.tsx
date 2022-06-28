import { useRouter } from "next/router"
import React from "react"

interface SideNavLinkItemProps {
  text: string
  route: string
}

const SideNavLinkItem = (props: SideNavLinkItemProps) => {
  const { text, route } = props
  const router = useRouter()

  const handleRedirect = () => {
    router.push(`/dashboard/${route}`)
  }

  return (
    <div className="w-full py-2 px-8 text-white cursor-pointer text-center hover:bg-blue-600 transition-colors uppercase border-t-white border-b-white border-b border-t" onClick={handleRedirect}>
      {text}
    </div>
  )
}

export default SideNavLinkItem
