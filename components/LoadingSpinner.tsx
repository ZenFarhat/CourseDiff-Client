import { Spinner } from "phosphor-react"
import React, { useEffect, useState } from "react"
import { loadingHandler$ } from "../rxjs"

const LoadingSpinner = () => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadingSub = loadingHandler$.subscribe({
      next(value) {
        setLoading(value)
      },
    })

    return () => loadingSub.unsubscribe()
  }, [])

  if (!loading) {
    return <></>
  }

  return (
    <div className="w-screen h-screen fixed top-0 bg-black/50 flex items-center justify-center">
      <Spinner size={96} className="animate-spin" color="#fbf4f4" />
    </div>
  )
}

export default LoadingSpinner
