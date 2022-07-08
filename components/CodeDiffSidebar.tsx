import { useFormik } from "formik"

import React from "react"
import { FilesArrayModel } from "../models/userCollectionModel.interface"

import BasicButtonSmall from "./BasicButtonSmall"
import ComponentRequiresAuth from "./ComponentRequiresAuth"
import FormInputField from "./FormInputField"
import * as yup from "yup"
import { fileValidation } from "../utils/validations"

interface CodeDiffSidebarProps {
  files: FilesArrayModel[] | null
  getFileInfo: (value: string) => void
  addFile: (value: string) => void
}

const CodeDiffSidebar = (props: CodeDiffSidebarProps) => {
  const { files, getFileInfo, addFile } = props

  const formik = useFormik({
    initialValues: {
      fileName: "",
    },
    onSubmit: () => {
      addFile(formik.values.fileName)
    },
    validationSchema: yup.object({
      fileName: fileValidation,
    }),
  })

  return (
    <div className="w-1/6 bg-blue-900 h-full p-2">
      <div>
        {files?.map((item, i) => {
          return (
            <div
              className="w-full py-1 text-white cursor-pointer hover:bg-blue-800"
              key={i}
              onClick={() => {
                getFileInfo(item.fileName)
              }}
            >
              {item.fileName}
            </div>
          )
        })}
      </div>
      <ComponentRequiresAuth>
        <FormInputField type="text" label="File name" id="fileName" placeholder="[file].[extension]" onChange={formik.handleChange} errorMessage={formik.errors.fileName} value={formik.values.fileName} />
        <form className="w-full flex items-center justify-center" onSubmit={formik.handleSubmit}>
          <BasicButtonSmall buttonText="Add File" type="submit" />
        </form>
      </ComponentRequiresAuth>
    </div>
  )
}

export default CodeDiffSidebar
