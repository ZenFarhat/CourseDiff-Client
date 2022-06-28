import { useFormik } from "formik"
import React from "react"
import AuthPageLayout from "../components/AuthPageLayout"
import BasicButton from "../components/BasicButton"
import FormInputField from "../components/FormInputField"
import * as yup from "yup"
import { signUp } from "../firebase/authUtils"
import { displayNameValidation, emailValidation, passwordConfirmValidation, passwordValidation } from "../utils/validations"
import { useRouter } from "next/router"
import { UserApi } from "../api/UserApi"

const SignUp = () => {
  const userApi = new UserApi()

  const router = useRouter()
  const handleSignUp = async () => {
    try {
      userApi.checkIfUserExists(formik.values.displayName).then(() => {
        signUp(formik.values).then(() => {
          router.push("/dashboard")
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      displayName: "",
    },
    onSubmit: () => {
      handleSignUp()
    },
    validationSchema: yup.object({
      email: emailValidation,
      password: passwordValidation,
      displayName: displayNameValidation,
      confirmPassword: passwordConfirmValidation("password"),
    }),
  })

  return (
    <AuthPageLayout onSubmit={formik.handleSubmit} redirectText="Already a user? Log in here" redirectPath="login">
      <FormInputField type="email" label="Email" id="email" onChange={formik.handleChange} placeholder="Email..." value={formik.values.email} errorMessage={formik.errors.email} />
      <FormInputField type="text" label="Display Name" id="displayName" onChange={formik.handleChange} placeholder="Display name..." value={formik.values.displayName} errorMessage={formik.errors.displayName} />
      <FormInputField type="password" label="Password" id="password" onChange={formik.handleChange} placeholder="Password..." value={formik.values.password} errorMessage={formik.errors.password} />
      <FormInputField type="password" label="Confirm Password" id="confirmPassword" onChange={formik.handleChange} placeholder="Confirm password..." value={formik.values.confirmPassword} errorMessage={formik.errors.confirmPassword} />
      <BasicButton type="submit" buttonText="Sign up" />
    </AuthPageLayout>
  )
}

export default SignUp
