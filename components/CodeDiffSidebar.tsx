import { useFormik } from "formik"

import React, { useId } from "react"
import { FilesArrayModel } from "../models/userCollectionModel.interface"

import ComponentRequiresAuth from "./ComponentRequiresAuth"
import FormInputField from "./FormInputField"
import * as yup from "yup"
import { fileValidation } from "../utils/validations"
import { MagnifyingGlass, Plus, Trash } from "phosphor-react"
import Folder from "../components/Folder"

interface CodeDiffSidebarProps {
  files: FilesArrayModel[]
  getFileInfo: (value: string) => void
  addFile: (value: string) => void
  deleteFile: (value: string) => void
  handleSearch: (value: string) => void
}

const CodeDiffSidebar = (props: CodeDiffSidebarProps) => {
  const { files, getFileInfo, addFile, deleteFile, handleSearch } = props
  const id = useId()

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
      <div className="flex justify-center items-center mb-5">
        <MagnifyingGlass size={36} className="bg-gray-100 rounded-tl-xl rounded-bl-xl" />
        <input
          type="text"
          placeholder="Find Timstamp"
          className="bg-gray-100 text-gray-900 text-sm rounded-tr-xl rounded-br-xl w-full p-2"
          onChange={(e) => {
            handleSearch(e.target.value)
          }}
        />
      </div>
      <ComponentRequiresAuth>
        <div className="flex">
          <FormInputField type="text" id="fileName" placeholder="[file].[extension]" onChange={formik.handleChange} errorMessage={formik.errors.fileName} value={formik.values.fileName} roundedLeft />
          <form onSubmit={formik.handleSubmit}>
            <button>
              <Plus size={36} color="#676BF0" style={{ backgroundColor: "#393C5B" }} className="rounded-tr-xl rounded-br-xl" />
            </button>
          </form>
        </div>
      </ComponentRequiresAuth>
      <div>
        {files[0]?.children?.map((item, i) => {
          return (
            <div key={id} style={{ cursor: "pointer" }}>
              {item.type === "folder" ? <Folder refId={item.Id} data={files} currentFolderName={item.name} /> : <div>{item.name}</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CodeDiffSidebar
