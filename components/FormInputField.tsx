import React, { ChangeEvent } from "react"

interface FormInputFieldProps {
  type: string
  label: string
  id: string
  onChange: (e: ChangeEvent<any>) => void
  required?: true
  placeholder: string
  value: string
  errorMessage?: string
  disabled?: boolean
}

const FormInputField = (props: FormInputFieldProps) => {
  const { type, label, id, onChange, required, placeholder, value, errorMessage, disabled } = props

  const ErrorMessage = () => {
    return (
      <p className="text-red-500" style={{ height: "26px" }}>
        {errorMessage && errorMessage}
      </p>
    )
  }

  return (
    <div className="mb-4 w-5/6">
      <label htmlFor={id} className="block mb-2 text-sm font-medium">
        {label}
      </label>
      <input onBlur={onChange} onChange={onChange} value={value} type={type || "text"} id={id} name={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required={required} disabled={disabled} />
      <ErrorMessage />
    </div>
  )
}

export default FormInputField
