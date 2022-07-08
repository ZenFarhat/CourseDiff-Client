import * as Yup from "yup"

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

const isValidTime = (time: string) => {
  const regex = /^([1-9]{1}([0-9]+)?h)?([1-5]{1}([0-9]{1})?m)?([1-5]{1}([0-9]{1})?s)?$/
  return regex.test(time)
}

export const timeStampValidation = Yup.string()
  .required("Please enter a timestamp")
  .test("valid-timestamp", "Please check if this is a valid timstamp", (value) => isValidTime(value as string))

const isValidFile = (file: string) => {
  const regex = /\..*[^\.]$/
  return regex.test(file)
}

export const fileValidation = Yup.string()
  .required("Please enter a file name")
  .test("valid-file", "invalid file name", (value) => isValidFile(value as string))
