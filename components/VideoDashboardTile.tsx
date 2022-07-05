import { useRouter } from "next/router"
import React from "react"
import { useAuth } from "../contexts/AuthContext"
import BasicButton from "./BasicButton"

interface VideoDashboardTileProps {
  videoName: string
  deleteVideo: (videoName: string) => void
}

const VideoDashboardTile = (props: VideoDashboardTileProps) => {
  const { videoName, deleteVideo } = props
  const { user } = useAuth()

  const router = useRouter()

  const handleVideoClick = () => {
    router.push(`/user/${user?.companyName}/${encodeURIComponent(videoName)}`)
  }

  return (
    <div className="flex items-center flex-col">
      <div className="w-32 h-32 bg-blue-400 border-4 border-blue-900 text-white m-5 rounded-xl cursor-pointer flex justify-center items-center" onClick={handleVideoClick}>
        {videoName}
      </div>
      <BasicButton
        buttonText="Delete Video"
        onClick={() => {
          deleteVideo(videoName.toString())
        }}
      />
    </div>
  )
}

export default VideoDashboardTile
