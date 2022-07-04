import { refreshDataSub$ } from "./../../rxjs/index"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "./../index"
import { auth } from "./../index"
import { getUserInfo } from "./users"

export const deleteVideo = async (videoName: string) => {
  if (!auth.currentUser) return
  try {
    const data = await getUserInfo(auth.currentUser?.uid)
    const videoIndex = data.videos.findIndex((item) => item.videoName === videoName)
    data.videos.splice(videoIndex, 1)
    const userRef = doc(db, "users", auth.currentUser.uid)
    await updateDoc(userRef, { ...data })
    refreshDataSub$.next(true)
  } catch (e) {
    console.log(e)
  }
}

export const addVideo = async (videoName: string) => {
  if (!auth.currentUser) return
  try {
    const data = await getUserInfo(auth.currentUser?.uid)
    const videoIndex = data.videos.findIndex((item) => item.videoName === videoName)
    if (videoIndex !== -1) return
    const userRef = doc(db, "users", auth.currentUser.uid)
    data.videos.push({ videoName: videoName, files: [{ fileName: "index.html", codeDiffs: [{ timeStamp: "0:00", codeDiff: "<h1>Hello World</h1>" }] }] })
    await updateDoc(userRef, { ...data })
    refreshDataSub$.next(true)
  } catch (e) {
    console.log(e)
  }
}
