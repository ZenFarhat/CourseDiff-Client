import React from "react"
import { Spinner } from "phosphor-react"

const DashBoardLoader = () => {
  return (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <Spinner size={96} color="black" className="animate-spin" />
    </div>
  )
}

export default DashBoardLoader
