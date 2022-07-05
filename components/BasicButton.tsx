import React, { useEffect, useState } from "react"
import { loadingHandler$ } from "../rxjs"

interface BasicButtonProps {
  buttonText: string
  onClick?: () => void
  type?: "submit"
}

const BasicButton = (props: BasicButtonProps) => {
  const { buttonText, onClick, type } = props
  const [loading, setLoading] = useState(false)

  return (
    <button className="bg-blue-500 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded transition-colors" onClick={onClick} type={type} disabled={loading}>
      {buttonText}
    </button>
  )
}

export default BasicButton
