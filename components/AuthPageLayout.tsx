import { FormikConfig, useFormik } from "formik"
import { useRouter } from "next/router"
import React from "react"

interface AuthPageLayoutProps {
  children: React.ReactNode
  redirectText?: string
  redirectPath?: string
  onSubmit: () => void
}

const AuthPageLayout = (props: AuthPageLayoutProps) => {
  const { children, onSubmit, redirectText, redirectPath } = props
  const router = useRouter()

  return (
    <div className="h-screen flex items-center justify-center w-screen bg-gray-900 flex-col">
      <p
        className="cursor-pointer underline text-blue-500 hover:text-blue-300"
        onClick={() => {
          router.push("/")
        }}
      >
        Go Back Home
      </p>
      <form className="w-96 flex items-center justify-evenly border-black border-solid border-2 h-fit flex-col rounded-xl shadow-xl p-8 bg-white" onSubmit={onSubmit}>
        {children}
        {redirectText && (
          <p
            className="underline text-blue-700 cursor-pointer hover:text-blue-500 mt-3.5"
            onClick={() => {
              router.push(`/${redirectPath}`)
            }}
          >
            {redirectText}
          </p>
        )}
      </form>
    </div>
  )
}

export default AuthPageLayout
