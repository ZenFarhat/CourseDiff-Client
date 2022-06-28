import { auth } from ".."
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { UserLoginModel } from "../../models/userLogin.interface"
import { UserSignupDetailsModel } from "../../models/userSignUpDetails.interface"

export const signIn = async (userLoginModel: UserLoginModel) => {
  await signInWithEmailAndPassword(auth, userLoginModel.email, userLoginModel.password)
}

export const signUp = async (userSignUpDetailsModel: UserSignupDetailsModel) => {
  await createUserWithEmailAndPassword(auth, userSignUpDetailsModel.email, userSignUpDetailsModel.password)
  const currentUser = auth.currentUser
  if (currentUser) {
    await updateProfile(currentUser, { displayName: userSignUpDetailsModel.displayName })
  }
  return
}

export const logout = () => {
  return auth.signOut()
}
