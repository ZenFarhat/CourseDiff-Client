import { refreshDiffData$ } from "./../../rxjs/index"
import { getUserInfo } from "./users"
import { auth } from "./../index"
import { db } from ".."
import { doc, updateDoc } from "firebase/firestore"

export const addFileToUser = async (videoName: string, fileName: string) => {
  if (!auth.currentUser) return
  try {
    const currentUser = await getUserInfo(auth.currentUser.uid)
    const videoIndex = currentUser.videos.findIndex((item) => item.videoName === videoName)
    currentUser.videos[videoIndex].files.push({ fileName: fileName, codeDiffs: [{ timeStamp: "0:00", codeDiff: `${fileName}` }] })
    const userRef = doc(db, "users", auth.currentUser.uid)
    await updateDoc(userRef, { ...currentUser })
    refreshDiffData$.next(true)
  } catch (e) {
    console.log(e)
  }
}
