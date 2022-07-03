import { useFormik } from "formik"
import { useRouter } from "next/router"
import React from "react"
import AuthPageLayout from "../components/AuthPageLayout"
import BasicButton from "../components/BasicButton"
import FormInputField from "../components/FormInputField"
import { signIn } from "../firebase/auth"
import * as yup from "yup"
import { emailValidation } from "../utils/validations"

const Login = () => {
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      handleLogin()
    },
    validationSchema: yup.object({
      email: emailValidation,
    }),
  })

  const handleLogin = () => {
    signIn(formik.values)
      .then(() => {
        router.push("/dashboard")
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <AuthPageLayout onSubmit={formik.handleSubmit} redirectText="New user? Sign up instead" redirectPath="signup">
      <FormInputField type="email" placeholder="Email" label="Your email" id="email" onChange={formik.handleChange} value={formik.values.email} errorMessage={formik.errors.email} />
      <FormInputField type="password" placeholder="Password" label="Your password" id="password" onChange={formik.handleChange} value={formik.values.password} errorMessage={formik.errors.password} />
      <BasicButton type="submit" buttonText="Log In" />
    </AuthPageLayout>
  )
}

export default Login
