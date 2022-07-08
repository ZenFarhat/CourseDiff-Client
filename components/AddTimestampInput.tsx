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
      console.log(formik.values.timeStamp)
      onClick(formik.values.timeStamp)
    },
    validationSchema: yup.object({
      timeStamp: timeStampValidation,
    }),
  })

  return (
    <form className="flex justify-center items-end w-6/12" onSubmit={formik.handleSubmit}>
      <FormInputField type="text" label="Timestamp" id="timeStamp" placeholder="000h00m00s" onChange={formik.handleChange} errorMessage={formik.errors.timeStamp} value={formik.values.timeStamp} />
      <div className="mb-11">
        <BasicButtonSmall buttonText="Add Timestamp" type="submit" />
      </div>
    </form>
  )
}

export default AddTimestampInput
