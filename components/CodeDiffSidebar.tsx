import { useFormik } from "formik"

import React from "react"
import { FilesArrayModel } from "../models/userCollectionModel.interface"

import BasicButtonSmall from "./BasicButtonSmall"
import ComponentRequiresAuth from "./ComponentRequiresAuth"
import FormInputField from "./FormInputField"
import * as yup from "yup"
import { fileValidation } from "../utils/validations"
import { FileSearch, Trash } from "phosphor-react"

interface CodeDiffSidebarProps {
  files: FilesArrayModel[] | null
  getFileInfo: (value: string) => void
  addFile: (value: string) => void
  deleteFile: (value: string) => void
  handleSearch: (value: string) => void
}

const CodeDiffSidebar = (props: CodeDiffSidebarProps) => {
  const { files, getFileInfo, addFile, deleteFile, handleSearch } = props

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
      <div className="flex justify-center items-center">
        <FileSearch size={32} className="bg-white rounded-tl-xl rounded-bl-xl" />
        <input
          type="text"
          placeholder="Find Timstamp"
          className="bg-gray-50 text-gray-900 text-sm rounded-tr-xl rounded-br-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
          onChange={(e) => {
            handleSearch(e.target.value)
          }}
        />
      </div>
      <div>
        {files?.map((item, i) => {
          return (
            <div
              className="w-full py-2 text-white cursor-pointer hover:bg-blue-800 flex justify-between items-center"
              key={i}
              onClick={() => {
                getFileInfo(item.fileName)
              }}
            >
              {item.fileName}
              <ComponentRequiresAuth>
                <Trash
                  size={25}
                  color="white"
                  onClick={() => {
                    deleteFile(item.fileName)
                  }}
                />
              </ComponentRequiresAuth>
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
