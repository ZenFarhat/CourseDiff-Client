import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { VideoApi } from "../../../../api/VideoApi"
import { FilesArrayModel } from "../../../../models/userCollectionModel.interface"
import { DiffEditor } from "@monaco-editor/react"
import CodeDiffSidebar from "../../../../components/CodeDiffSidebar"
import { refreshDiffData$ } from "../../../../rxjs"
import { FileApi } from "../../../../api/FileApi"
import BasicButton from "../../../../components/BasicButton"

const VideoDiffPage = () => {
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<FilesArrayModel[]>()
  const [file, setCurrentFile] = useState<FilesArrayModel>()
  const [timeStamp, setTimeStamp] = useState("")

  const router = useRouter()
  const { userDisplayName, videoName } = router.query

  const videoApi = new VideoApi()
  const fileApi = new FileApi()

  const handleGetVideo = () => {
    if (userDisplayName && videoName) {
      videoApi.getVideo(userDisplayName.toString(), encodeURIComponent(videoName.toString())).then((data) => {
        setUserData(data)
        setCurrentFile(data[0])
      })
    }
  }

  const getFileInfo = (fileName: string) => {
    if (!userData) return
    const item = userData?.findIndex((item) => item.fileName === fileName)
    setCurrentFile(userData[item])
  }

  const addTimeStamp = () => {
    if (!videoName || !file) return
    fileApi.addTimeStampToFile({ codeDiff: "", timeStamp: timeStamp }, encodeURIComponent(videoName.toString()), file?.fileName).then(() => {
      refreshDiffData$.next(true)
    })
  }

  useEffect(() => {
    handleGetVideo()
    setLoading(false)

    const sub = refreshDiffData$.subscribe({
      next(value) {
        value && handleGetVideo()
      },
    })

    return () => sub.unsubscribe()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!userData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-2xl">{"Data not found :("}</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-gray-100 p-20">
      <div>
        {file?.codeDiffs.map((item, i) => {
          return <div key={i}>{item.timeStamp}</div>
        })}
        <input
          type="text"
          placeholder="hh:mm:ss"
          onChange={(e) => {
            setTimeStamp(e.target.value)
          }}
        />
        <BasicButton buttonText="Add Timestamp" onClick={addTimeStamp} />
      </div>
      <div></div>
      <div className="w-12/12 h-full mx-auto flex items-center justify-center">
        <CodeDiffSidebar files={userData} getFileInfo={getFileInfo} />
        <DiffEditor original={file?.codeDiffs[0].codeDiff} width="100%" height="100%" />
      </div>
    </div>
  )
}

export default VideoDiffPage
