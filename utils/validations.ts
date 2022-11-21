import * as Yup from 'yup'

const testForSlashes = (file: string) => {
  const regex = /\/|\\/
  return regex.test(file)
}

export const emailValidation = Yup.string().email("Invalid email").required("Email required")

export const passwordValidation = Yup.string().min(8, "Require minimum 8 characters").max(40, "Maximum 40 characters").required("Password is required")

export const passwordConfirmValidation = (referenceName: string) =>
  Yup.string()
    .oneOf([Yup.ref(referenceName), null], "Password not match")
    .required("Please confirm your password")

export const displayNameValidation = Yup.string().min(2, "Requires 3 characters minimum").required("Please enter a display name")

export const videoNameValidation = Yup.string()
  .min(3, "Requires 3 characters minimum")
  .required("Please enter a video name")
  .test("videoName", "No slashes in video names", (value) => !testForSlashes(value || ""))

export const companyNameValidation = Yup.string()
  .min(3, "Requires 3 characters minimum")
  .required("Please enter a company name")
  .test("no-spaces", "No spaces allowed", (value) => !value?.includes(" "))
  .test("no-slashes", "No slashes allowed", (value) => !testForSlashes(value || ""))

export const jsonInputValidation = Yup.string().test("json", "Invalid json", (value) => {
  try {
    JSON.parse(value || "")
    return true
  } catch (e) {
    return false
  }
})
