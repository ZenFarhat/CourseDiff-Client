import { FolderModel } from "./../../models/userCollectionModel.interface"
import { auth } from "./../index"
import { db } from ".."
import { doc, getDoc, collection, addDoc } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"

export const addRootFolderToVideo = async (): Promise<string> => {
  if (!auth.currentUser) return ""
  try {
    const docRef = collection(db, "userFilesAndFolders")
    const newDoc = await addDoc(docRef, {
      parentFolder: null,
      children: [],
    })
    return newDoc.id
  } catch (e) {
    console.log(e)
    return ""
  }
}

export const getFolder = async (docId: string): Promise<FolderModel | undefined> => {
  try {
    const docRef = doc(db, "userFilesAndFolders", docId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data() as FolderModel
    }
  } catch (e) {
    console.log(e)
  }
}
