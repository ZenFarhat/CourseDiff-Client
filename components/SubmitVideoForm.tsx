import { useFormik } from "formik"
import React from "react"
import { videoNameValidation } from "../utils/validations"
import BasicButton from "./BasicButton"
import FormInputField from "./FormInputField"
import * as yup from "yup"

import { useAuth } from "../contexts/AuthContext"
import { VideoApi } from "../api/VideoApi"
import { refreshDataSub$ } from "../rxjs"

const SubmitVideoForm = () => {
  const videoAPi = new VideoApi()

  const handleSubmit = () => {
    videoAPi.addVideo({ videoName: formik.values.videoName, files: [{ fileName: "index.html", codeDiffs: [{ timeStamp: "0:00", codeDiff: "Hello World" }] }] }).then(() => {
      refreshDataSub$.next(true)
    })
  }

  const formik = useFormik({
    initialValues: {
      videoName: "",
    },
    onSubmit: () => {
      handleSubmit()
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
