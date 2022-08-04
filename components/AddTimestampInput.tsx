import { useFormik } from "formik"
import React from "react"
import BasicButtonSmall from "./BasicButtonSmall"
import * as yup from "yup"
import { timeStampValidation } from "../utils/validations"
import FormInputField from "./FormInputField"

interface AddTimeStampInputProps {
  onClick: (value: string) => void
}

const AddTimestampInput = (props: AddTimeStampInputProps) => {
  const { onClick } = props
  const formik = useFormik({
    initialValues: {
      timeStamp: "",
    },
    onSubmit: () => {
      onClick(formik.values.timeStamp)
    },
    validationSchema: yup.object({
      timeStamp: timeStampValidation,
    }),
  })

  return (
    <form className="flex justify-center items-center" onSubmit={formik.handleSubmit}>
      <div>
        <FormInputField type="text" id="timeStamp" placeholder="000h00m00s" onChange={formik.handleChange} errorMessage={formik.errors.timeStamp} value={formik.values.timeStamp} />
      </div>
      <div className="mb-11 flex-1">
        <BasicButtonSmall buttonText="Add Timestamp" type="submit" />
      </div>
    </form>
  )
}

export default AddTimestampInput
