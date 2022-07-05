import React, { useEffect, useRef, useState } from "react"
import useClickOutside from "../hooks/useClickOutside"
import { SnackBarModel } from "../models/snackBarModel.interface"
import { snackbarHandler$ } from "../rxjs"
import styles from "../styles/snackbar.module.css"

const SnackBar = () => {
  const [snackBarState, setSnackBarState] = useState<SnackBarModel>({} as SnackBarModel)
  const [animation, setAnimation] = useState("")
  const { ref, isComponentVisible, setIsComponentVisible } = useClickOutside(false)

  useEffect(() => {
    const snackBarSub = snackbarHandler$.subscribe({
      next(value) {
        setIsComponentVisible(true)
        setSnackBarState(value)
        setAnimation(styles.animateSnackbar)
      },
    })

    console.log()

    return () => snackBarSub.unsubscribe()
  }, [])

  if (!isComponentVisible) {
    return <></>
  }

  if (snackBarState.variant === "error") {
    return (
      <div className={"fixed top-0 inset-x-0 bg-red-500 w-2/12 mx-auto mt-2 px-2 py-4 rounded-xl text-white text-center " + animation} ref={ref}>
        {snackBarState.content}
      </div>
    )
  }

  if (snackBarState.variant === "success") {
    return (
      <div className={"fixed top-0 inset-x-0 bg-green-500 w-2/12 mx-auto mt-2 px-4 py-4 rounded-xl text-white text-center " + animation} ref={ref}>
        {snackBarState.content}
      </div>
    )
  }

  return <></>
}

export default SnackBar
