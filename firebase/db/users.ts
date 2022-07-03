import { db } from ".."
import { addDoc, collection, doc, getDoc } from "firebase/firestore"

const addNewUser = async (id: string) => {
  try {
    const docRef = doc(db, "users", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) return

    await addDoc(collection(db, "users", id), {
      name: "hi",
    })
  } catch (e: any) {
    console.log(e)
  }
}
