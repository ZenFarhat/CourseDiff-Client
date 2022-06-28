import React, { useEffect, useState } from "react"
import { ModalModel } from "../models/modalModel.interface"
import { modalHandler$ } from "../rxjs"
import BasicButton from "./BasicButton"

const ModalLayout = () => {
  const [modalState, setModalState] = useState<ModalModel>({ open: false, contents: <></> })

  useEffect(() => {
    const modalSub = modalHandler$.subscribe({
      next: (value) => setModalState(value),
    })

    return () => {
      modalSub.unsubscribe()
    }
  }, [])

  return (
    <div className="fixed w-screen h-screen bg-gray-800 bg-opacity-70 bottom-0 flex justify-center items-center z-50" style={{ display: modalState.open ? "flex" : "none" }}>
      <div className="bg-white w-5/6 h-3/5 rounded-xl md:w-3/6 p-4">
        <div className="flex justify-end items-center">
          <BasicButton
            buttonText="Close"
            onClick={() => {
              modalHandler$.next({ contents: <></>, open: false })
            }}
          />
        </div>
        <div>{modalState.contents}</div>
      </div>
    </div>
  )
}

export default ModalLayout
