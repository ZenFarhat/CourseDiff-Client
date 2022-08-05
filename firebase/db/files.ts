import { FolderModel } from "./../../models/userCollectionModel.interface"
import { db } from ".."
import { doc, getDoc, collection, addDoc, updateDoc } from "firebase/firestore"
import { snackbarHandler$ } from "../../rxjs"

const dbName = "userFilesAndFolders"

export const addRootFolderToVideo = async () => {
  try {
    const docRef = collection(db, dbName)
    const newDoc = await addDoc(docRef, {
      parentFolder: null,
      children: [],
    })
    return newDoc.id
  } catch (e) {
    console.log(e)
  }
}

export const addNewFolder = async (parentFolderId: string, folderName: string) => {
  try {
    const docRef = collection(db, dbName)
    const newDoc = await addDoc(docRef, {
      parentFolder: parentFolderId,
      type: "folder",
      name: folderName,
      children: [],
    })

    const parentDocRef = doc(db, dbName, parentFolderId)
    const parentDoc = await getDoc(parentDocRef)
    if (!parentDoc.exists()) return
    const data = parentDoc.data() as FolderModel
    data.children.push({ docId: newDoc.id, type: "folder", name: folderName })
    await updateDoc(parentDocRef, { ...data })
    snackbarHandler$.next({ variant: "success", content: "Folder added!" })
  } catch (e) {
    console.log(e)
    snackbarHandler$.next({ variant: "error", content: "Failed to add folder" })
  }
}

export const addNewFile = async (parentFolderId: string, fileName: string) => {
  try {
    const docRef = doc(db, dbName, parentFolderId)
    const folderDoc = await getDoc(docRef)
    if (!folderDoc.exists()) return
    const data = folderDoc.data() as FolderModel
    data.children.push({ type: "file", name: fileName, codeDiffs: [] })
    await updateDoc(docRef, { ...data })
    snackbarHandler$.next({ variant: "success", content: "File added!" })
  } catch (e) {
    console.log(e)
    snackbarHandler$.next({ variant: "error", content: "Failed to add file" })
  }
}

export const getFolder = async (docId: string) => {
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
