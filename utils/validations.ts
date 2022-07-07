import * as Yup from "yup"

export const emailValidation = Yup.string().email("Invalid email").required("Email required")

export const passwordValidation = Yup.string().min(8, "Require minimum 8 characters").max(40, "Maximum 40 characters").required("Password is required")

export const passwordConfirmValidation = (referenceName: string) =>
  Yup.string()
    .oneOf([Yup.ref(referenceName), null], "Password not match")
    .required("Please confirm your password")

export const displayNameValidation = Yup.string().min(2, "Requires 3 characters minimum").required("Please enter a display name")

export const videoNameValidation = Yup.string().min(3, "Requires 3 characters minimum").required("Please enter a video name")

// do not allow spaces
export const companyNameValidation = Yup.string()
  .min(3, "Requires 3 characters minimum")
  .required("Please enter a company name")
  .test("no-spaces", "No spaces allowed", (value) => !value?.includes(" "))
