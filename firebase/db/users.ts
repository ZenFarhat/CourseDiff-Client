import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'

import { db } from '..'
import { UserInterface } from '../../models/userCollectionModel.interface'
import { loadingHandler$, refreshDataSub$, snackbarHandler$ } from '../../rxjs'

export const getUserInfo = async (id: string): Promise<UserInterface> => {
  const docRef = doc(db, "users", id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data() as UserInterface
  } else {
    await setDoc(doc(db, "users", id), {
      uid: id,
      companyName: null,
    })

    const docRefNew = doc(db, "users", id)
    const docSnapNew = await getDoc(docRefNew)

    return docSnapNew.data() as UserInterface
  }
}

const checkIfCompanyNameExists = async (companyName: string): Promise<boolean> => {
  const querySnapshot = await getDocs(collection(db, "users"))

  let foundData: boolean = false

  querySnapshot.forEach((doc) => {
    if (!doc.data().companyName) return
    if (doc.data().companyName.toLowerCase() === companyName.toLowerCase()) {
      foundData = true
    }
  })

  loadingHandler$.next(false)
  return foundData
}

export const updateCompanyName = async (id: string, companyName: string) => {
  try {
    loadingHandler$.next(true)
    const userRef = doc(db, "users", id)
    const companyNameExists = await checkIfCompanyNameExists(companyName)
    console.log(companyNameExists)
    if (companyNameExists) return snackbarHandler$.next({ variant: "error", content: "Company name already exists!" })
    await updateDoc(userRef, {
      companyName: companyName,
    })
    refreshDataSub$.next(true)
    loadingHandler$.next(false)
  } catch (e) {
    loadingHandler$.next(false)
    console.log(e)
  }
}
