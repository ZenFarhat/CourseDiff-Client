import React from "react"
import Link from "next/link"

interface NavLinkProps {
  href: string
  label: string
}

const NavLink = (props: NavLinkProps) => {
  const { href, label } = props
  return (
    <Link href={`/${href}`}>
      <a className="mx-5 font-bold">{label}</a>
    </Link>
  )
}

export default NavLink
