import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'

import { db } from './..'
import { auth } from './..'
import { IUserVideo, IVideoFile, UserInterface } from './../../models/userCollectionModel.interface'
import { refreshDataSub$, refreshDiffData$, snackbarHandler$ } from './../../rxjs'
import { getUserInfo } from './users'

export const deleteVideo = async (videoName: string) => {
  if (!auth.currentUser) return
  try {
    const data = await getUserInfo(auth.currentUser?.uid)
    const videoIndex = data.videos.findIndex((item) => item.videoName === videoName)
    data.videos.splice(videoIndex, 1)
    const userRef = doc(db, "users", auth.currentUser.uid)
    await updateDoc(userRef, { ...data })
    refreshDataSub$.next(true)
    snackbarHandler$.next({ variant: "success", content: `Deleted video ${videoName}!` })
  } catch (e) {
    console.log(e)
    snackbarHandler$.next({ variant: "error", content: `Error deleting video ${videoName}` })
  }
}

export const addVideo = async (videoName: string, fileData: IVideoFile[]) => {
  if (!auth.currentUser) return
  try {
    const data = await getUserInfo(auth.currentUser?.uid)
    const videoIndex = data.videos.findIndex((item) => item.videoName.toLowerCase() === videoName.toLowerCase())
    if (videoIndex !== -1) return snackbarHandler$.next({ variant: "error", content: `Video ${videoName} already exists!` })
    const userRef = doc(db, "users", auth.currentUser.uid)
    data.videos.push({ videoName: videoName, files: fileData })
    await updateDoc(userRef, { ...data })
    refreshDataSub$.next(true)
    snackbarHandler$.next({ variant: "success", content: `Video ${videoName} added!` })
  } catch (e) {
    console.log(e)
    snackbarHandler$.next({ variant: "error", content: `Error adding video, check your json.` })
  }
}

export const getVideoDetails = async (companyName: string, videoName: string) => {
  const querySnapshot = await getDocs(collection(db, "users"))

  let foundData: IUserVideo | undefined

  querySnapshot.forEach((doc) => {
    if (doc.data().companyName === companyName) {
      const data = doc.data() as UserInterface
      foundData = data.videos.find((item) => item.videoName === videoName)
    }
  })

  return foundData
}

export const updateVideo = async (videoName: string, data: IUserVideo) => {
  if (!auth.currentUser) return
  try {
    const currentUser = await getUserInfo(auth.currentUser.uid)
    const videoIndex = currentUser.videos.findIndex((item) => item.videoName === videoName)
    currentUser.videos[videoIndex] = data
    await setDoc(doc(db, "users", auth.currentUser.uid), currentUser)
    snackbarHandler$.next({ content: "Video saved!", variant: "success" })
  } catch (e) {
    console.log(e)
    snackbarHandler$.next({ content: "Error saving the video.", variant: "error" })
  }
}
