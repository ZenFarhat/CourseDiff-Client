import { db } from ".."
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { UserInterface } from "../../models/userCollectionModel.interface"
import { loadingHandler$, refreshDataSub$ } from "../../rxjs"

export const getUserInfo = async (id: string): Promise<UserInterface> => {
  const docRef = doc(db, "users", id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data() as UserInterface
  } else {
    await setDoc(doc(db, "users", id), {
      uid: id,
      companyName: null,
      videos: [
        {
          videoName: "html/css crash course",
          files: [
            {
              fileName: "index.html",
              codeDiffs: [{ timeStamp: "0:00", codeDiff: "<h1>Hello World</h1>" }],
            },
          ],
        },
      ],
    })

    const docRefNew = doc(db, "users", id)
    const docSnapNew = await getDoc(docRefNew)

    return docSnapNew.data() as UserInterface
  }
}

export const updateCompanyName = async (id: string, companyName: string) => {
  try {
    loadingHandler$.next(true)
    const userRef = doc(db, "users", id)
    await updateDoc(userRef, {
      companyName: companyName,
    })
    refreshDataSub$.next(true)
    loadingHandler$.next(false)
  } catch (e) {
    loadingHandler$.next(false)
  }
}
