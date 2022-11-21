import { useFormik } from 'formik'
import * as yup from 'yup'

import { useAuth } from '../contexts/AuthContext'
import { updateCompanyName } from '../firebase/db'
import { companyNameValidation } from '../utils/validations'
import BasicButton from './BasicButton'
import FormInputField from './FormInputField'

const CompanyNameForm = () => {
  const { user } = useAuth()

  const updateCompany = async (companyName: string) => {
    if (!user) return
    try {
      await updateCompanyName(user?.uid, companyName)
    } catch (e) {
      console.log(e)
    }
  }

  const formik = useFormik({
    initialValues: {
      companyName: "",
    },
    onSubmit: () => {
      updateCompany(formik.values.companyName)
    },
    validationSchema: yup.object({
      companyName: companyNameValidation,
    }),
  })

  return (
    <form onSubmit={formik.handleSubmit} className="md: w-4/6">
      <p className="mb-5">IMPORTANT!</p>
      <p className="mb-5">{"It looks like you haven't set up a company name, please set one up to continue"}</p>
      <p className="mb-5">This is the text that will appear on your urls, ie codecorder.com/companyName/video</p>
      <FormInputField type="text" label="Company name" id="companyName" placeholder="Company Name" onChange={formik.handleChange} errorMessage={formik.errors.companyName} value={formik.values.companyName} />
      <BasicButton type="submit" buttonText="Submit company name" />
    </form>
  )
}

export default CompanyNameForm
