import { auth } from ".."
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { UserLoginModel } from "../../models/userLogin.interface"
import { UserSignupDetailsModel } from "../../models/userSignUpDetails.interface"
import { loadingHandler$, snackbarHandler$ } from "../../rxjs"

export const signIn = async (userLoginModel: UserLoginModel) => {
  loadingHandler$.next(true)
  try {
    await signInWithEmailAndPassword(auth, userLoginModel.email, userLoginModel.password)
    loadingHandler$.next(false)
  } catch (e) {
    console.log(e)
    loadingHandler$.next(false)
    snackbarHandler$.next({ variant: "error", content: "Error logging in!" })
  }
}

export const signUp = async (userSignUpDetailsModel: UserSignupDetailsModel) => {
  loadingHandler$.next(true)
  try {
    await createUserWithEmailAndPassword(auth, userSignUpDetailsModel.email, userSignUpDetailsModel.password)
    const currentUser = auth.currentUser
    if (currentUser) {
      await updateProfile(currentUser, { displayName: userSignUpDetailsModel.displayName })
      loadingHandler$.next(false)
    }
    loadingHandler$.next(false)
  } catch (e) {
    console.log(e)
    loadingHandler$.next(false)
    snackbarHandler$.next({ variant: "error", content: "Error signing up!" })
  }
}

export const logout = async () => {
  await auth.signOut()
}
