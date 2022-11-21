import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'

import { addVideo } from '../firebase/db/videos'
import { modalHandler$ } from '../rxjs'
import { jsonInputValidation, videoNameValidation } from '../utils/validations'
import BasicButton from './BasicButton'
import FormInputField from './FormInputField'

const SubmitVideoForm = () => {
  const formik = useFormik({
    initialValues: {
      videoName: "",
      jsonData: "",
    },
    onSubmit: async () => {
      await addVideo(formik.values.videoName, JSON.parse(formik.values.jsonData))
      modalHandler$.next({ open: false, contents: <></> })
    },
    validationSchema: yup.object({
      videoName: videoNameValidation,
      jsonData: jsonInputValidation,
    }),
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormInputField type="text" label="Video name" id="videoName" placeholder="Video name.." onChange={formik.handleChange} errorMessage={formik.errors.videoName} value={formik.values.videoName} />
      <FormInputField type="text" label="JSON data" id="jsonData" placeholder="Paste codecorder contents here" onChange={formik.handleChange} errorMessage={formik.errors.jsonData} value={formik.values.jsonData} />
      <BasicButton type="submit" buttonText="Submit Video" />
    </form>
  )
}

export default SubmitVideoForm
