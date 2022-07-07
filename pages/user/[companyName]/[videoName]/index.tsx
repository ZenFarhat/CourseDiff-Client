import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import { codeDiffModel, VideosModel } from "../../../../models/userCollectionModel.interface"
import { DiffEditor, Monaco } from "@monaco-editor/react"
import CodeDiffSidebar from "../../../../components/CodeDiffSidebar"
import { refreshDiffData$ } from "../../../../rxjs"
import BasicButton from "../../../../components/BasicButton"
import TimeStampButton from "../../../../components/TimeStampButton"
import * as monaco from "monaco-editor"
import { getVideoDetails, updateVideo } from "../../../../firebase/db/videos"
import DashBoardLoader from "../../../../components/DashBoardLoader"
import { useAuth } from "../../../../contexts/AuthContext"
import ComponentRequiresAuth from "../../../../components/ComponentRequiresAuth"

const VideoDiffPage = () => {
  const [video, setVideo] = useState<VideosModel>()
  const [fileIndex, setCurrentFileIndex] = useState(0)
  const [code, setCurrentCode] = useState<codeDiffModel>()
  const [timeStamp, setTimeStamp] = useState("")
  const [loading, setLoading] = useState(true)

  const diffEditorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(null)

  const router = useRouter()
  const { companyName, videoName } = router.query
  const { user } = useAuth()

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneDiffEditor, monaco: Monaco) => {
    diffEditorRef.current = editor
  }

  const setTimeStampCode = (timeStamp: string) => {
    const newFileData = { ...video }
    if (!newFileData.files) return
    const foundCodeDiff = newFileData.files[fileIndex].codeDiffs.find((item) => item.timeStamp === timeStamp)
    setCurrentCode(foundCodeDiff)
  }

  const getFileInfo = (fileName: string) => {
    if (!video) return
    const newFileData = { ...video }
    setCurrentFileIndex(newFileData.files.findIndex((item) => item.fileName === fileName))
    const file = newFileData.files.find((item) => item.fileName === fileName)
    setCurrentCode(file?.codeDiffs[0])
  }

  const addTimeStamp = () => {
    const newFileData = { ...video }
    if (!newFileData.files) return
    newFileData.files[fileIndex].codeDiffs.push({ codeDiff: "", timeStamp: timeStamp })
    setVideo(newFileData as VideosModel)
  }

  const handleDiffChange = () => {
    if (!video) return
    const newFileData: VideosModel = { ...video }
    const timeStampIndex = newFileData?.files[fileIndex].codeDiffs.findIndex((item) => item.timeStamp === code?.timeStamp)
    newFileData.files[fileIndex].codeDiffs[timeStampIndex].codeDiff = diffEditorRef.current?.getModifiedEditor().getValue() || ""
    setVideo({ ...newFileData })
  }

  const handleSave = async () => {
    if (!video || !videoName) return
    handleDiffChange()
    await updateVideo(video?.files[fileIndex].fileName, videoName?.toString(), video.files[fileIndex].codeDiffs)
  }

  const handleGetVideo = async () => {
    if (!companyName || !videoName) return
    await getVideoDetails(companyName?.toString(), videoName.toString())
      .then((data) => {
        if (!data) return
        setVideo(data)
        setCurrentCode(data.files[fileIndex].codeDiffs[0])
        setLoading(false)
      })
      .catch((e) => {
        console.log(e)
        setLoading(false)
      })
  }

  useEffect(() => {
    handleGetVideo()
    const sub = refreshDiffData$.subscribe({
      next(value) {
        value && handleGetVideo()
      },
    })

    return () => sub.unsubscribe()
  }, [])

  if (loading) {
    return <DashBoardLoader />
  }

  return (
    <div className="h-screen p-8 bg-gray-200">
      <div>
        <div className="flex w-full">
          {video?.files[fileIndex].codeDiffs.map((item, i) => {
            return <TimeStampButton text={item.timeStamp} onClick={setTimeStampCode} key={i} />
          })}
        </div>
        <ComponentRequiresAuth>
          <input
            type="text"
            onChange={(e) => {
              setTimeStamp(e.target.value)
            }}
          />
          <BasicButton buttonText="Add Timestamp" onClick={addTimeStamp} />
        </ComponentRequiresAuth>
      </div>
      <div>
        {user ? "Editing" : "Viewing"}: {video?.files[fileIndex].fileName} at {code?.timeStamp}
      </div>
      <div className="w-12/12 h-5/6 mx-auto flex items-center justify-center">
        <CodeDiffSidebar files={video?.files || null} getFileInfo={getFileInfo} />
        <DiffEditor original={code?.codeDiff} width="100%" height="100%" theme="vs-dark" onMount={handleEditorDidMount} />
      </div>
      <ComponentRequiresAuth>
        <div className="w-full flex items-end justify-between">
          <BasicButton
            buttonText="Go back to dashboard"
            onClick={() => {
              router.push("/dashboard")
            }}
          />
          <BasicButton buttonText={"Save Changes"} onClick={handleSave} />
        </div>
      </ComponentRequiresAuth>
    </div>
  )
}

export default VideoDiffPage
