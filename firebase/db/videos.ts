import { codeDiffModel, UserInterface, VideosModel } from "./../../models/userCollectionModel.interface"
import { refreshDataSub$, refreshDiffData$ } from "./../../rxjs/index"
import { collection, doc, getDocs, updateDoc } from "firebase/firestore"
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

export const getVideoDetails = async (companyName: string, videoName: string): Promise<VideosModel | undefined> => {
  const querySnapshot = await getDocs(collection(db, "users"))

  let foundData: VideosModel | undefined

  querySnapshot.forEach((doc) => {
    if (doc.data().companyName === companyName) {
      const data = doc.data() as UserInterface
      foundData = data.videos.find((item) => item.videoName === videoName)
    }
  })

  return foundData
}

export const updateVideo = async (fileName: string, videoName: string, data: codeDiffModel[]) => {
  if (!auth.currentUser) return
  try {
    const currentUser = await getUserInfo(auth.currentUser.uid)
    const videoIndex = currentUser.videos.findIndex((item) => item.videoName === videoName)
    const fileIndex = currentUser.videos[videoIndex].files.findIndex((item) => item.fileName === fileName)
    currentUser.videos[videoIndex].files[fileIndex].codeDiffs = data
    const userRef = doc(db, "users", auth.currentUser.uid)
    await updateDoc(userRef, { currentUser })
    refreshDiffData$.next(true)
  } catch (e) {
    console.log(e)
  }
}
