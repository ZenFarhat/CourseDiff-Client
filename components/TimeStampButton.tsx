import React from "react"

interface TimeStampButtonProps {
  text: string
  onClick: (value: string) => void
}

const TimeStampButton = (props: TimeStampButtonProps) => {
  const { text, onClick } = props

  return (
    <div
      className="mr-3 bg-blue-400 px-2 rounded text-white cursor-pointer hover:bg-blue-500"
      onClick={() => {
        onClick(text)
      }}
    >
      {text}
    </div>
  )
}

export default TimeStampButton
