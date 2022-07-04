import { useFormik } from "formik"
import React from "react"
import { videoNameValidation } from "../utils/validations"
import BasicButton from "./BasicButton"
import FormInputField from "./FormInputField"
import * as yup from "yup"

import { addVideo } from "../firebase/db/videos"
import { modalHandler$ } from "../rxjs"

const SubmitVideoForm = () => {
  const formik = useFormik({
    initialValues: {
      videoName: "",
    },
    onSubmit: async () => {
      await addVideo(formik.values.videoName)
      modalHandler$.next({ open: false, contents: <></> })
    },
    validationSchema: yup.object({
      videoName: videoNameValidation,
    }),
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormInputField type="text" label="Video name" id="videoName" placeholder="Video name.." onChange={formik.handleChange} errorMessage={formik.errors.videoName} value={formik.values.videoName} />
      <BasicButton type="submit" buttonText="Submit video name" />
    </form>
  )
}

export default SubmitVideoForm
