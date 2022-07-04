import { db } from ".."
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { UserInterface } from "../../models/userCollectionModel.interface"

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

    console.log(docSnapNew.data())
    return docSnapNew.data() as UserInterface
  }
}

export const updateCompanyName = async (id: string, companyName: string) => {
  const userRef = doc(db, "users", id)
  await updateDoc(userRef, {
    companyName: companyName,
  })
}
