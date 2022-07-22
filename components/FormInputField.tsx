import React, { ChangeEvent } from "react"

interface FormInputFieldProps {
  type: string
  label?: string
  id: string
  onChange: (e: ChangeEvent<any>) => void
  required?: true
  placeholder: string
  value: string
  errorMessage?: string
  disabled?: boolean
  roundedLeft?: boolean
  roundedRight?: boolean
}

const FormInputField = (props: FormInputFieldProps) => {
  const { type, label, id, onChange, required, placeholder, value, errorMessage, disabled, roundedLeft, roundedRight } = props

  const generateRounded = () => {
    if (roundedLeft) {
      return "rounded-tl-xl rounded-bl-xl"
    }
    if (roundedRight) {
      return "rounded-tr-xl rounded-br-xl"
    }
    return "rounded-xl"
  }

  const ErrorMessage = () => {
    return (
      <p className="text-red-500" style={{ height: "26px" }}>
        {errorMessage && errorMessage}
      </p>
    )
  }

  return (
    <div className="mb-4 w-full">
      {label && (
        <label htmlFor={id} className="block mb-2 text-sm font-medium">
          {label}
        </label>
      )}
      <input onBlur={onChange} onChange={onChange} value={value} type={type || "text"} id={id} name={id} className={"bg-gray-100 text-gray-900 text-sm w-full p-2 " + generateRounded()} placeholder={placeholder} required={required} disabled={disabled} />
      <ErrorMessage />
    </div>
  )
}

export default FormInputField
