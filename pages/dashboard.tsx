import type { NextPage } from "next"
import { useEffect, useState } from "react"
import BasicButton from "../components/BasicButton"
import SubmitVideoForm from "../components/SubmitVideoForm"
import VideoDashboardTile from "../components/VideoDashboardTile"
import { useAuth } from "../contexts/AuthContext"
import { UserInterface } from "../models/userCollectionModel.interface"
import { modalHandler$, refreshDataSub$ } from "../rxjs"

const Dashboard: NextPage = () => {
  const { user } = useAuth()
  const [userVideos, setUserVideos] = useState<UserInterface>()

  const fetchProfile = () => {}

  const handleDelete = async (videoName: string) => {}

  useEffect(() => {
    console.log(user?.displayName)
    fetchProfile()
    const refreshSub = refreshDataSub$.subscribe({
      next(value) {
        value && fetchProfile()
      },
    })

    return () => refreshSub.unsubscribe()
  }, [])

  return (
    <div className="w-full h-full bg-gray-100 p-20">
      <div>
        <h1 className="text-4xl mb-5">Your Diffs</h1>
        <div className="w-full h-1 bg-gray-900 rounded-full"></div>
      </div>
      <div className="my-5">
        <BasicButton
          buttonText="Add video"
          onClick={() => {
            modalHandler$.next({ open: true, contents: <SubmitVideoForm /> })
          }}
        />
      </div>
      <div className="w-full flex items-start flex-wrap">
        {userVideos?.videos.map((video, i) => {
          return <VideoDashboardTile videoName={video.videoName} key={i} deleteVideo={handleDelete} />
        })}
      </div>
    </div>
  )
}

export default Dashboard
