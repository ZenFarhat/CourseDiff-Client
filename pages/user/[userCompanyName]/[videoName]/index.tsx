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

const VideoDiffPage = () => {
  const [video, setVideo] = useState<VideosModel>()
  const [fileIndex, setCurrentFileIndex] = useState(0)
  const [code, setCurrentCode] = useState<codeDiffModel>()
  const [timeStamp, setTimeStamp] = useState("")

  const diffEditorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(null)

  const router = useRouter()
  const { userCompanyName, videoName } = router.query

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneDiffEditor, monaco: Monaco) => {
    diffEditorRef.current = editor
  }

  const handleGetVideo = async () => {
    if (!userCompanyName || !videoName) return
    await getVideoDetails(userCompanyName?.toString(), videoName.toString())
      .then((data) => {
        setVideo(data)
      })
      .catch((e) => {
        console.log(e)
      })
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
    const foundFileIndex = newFileData.files?.findIndex((item) => item.fileName === fileName)
    setCurrentFileIndex(foundFileIndex)
  }

  const addTimeStamp = () => {
    const newFileData = { ...video }
    if (!newFileData.files) return
    newFileData.files[fileIndex].codeDiffs.push({ codeDiff: "", timeStamp: timeStamp })
    setVideo(newFileData as VideosModel)
  }

  const handleDiffChange = () => {
    const newFileData = { ...video }
    if (!newFileData.files) return
    const timeStampIndex = newFileData?.files[fileIndex].codeDiffs.findIndex((item) => item.timeStamp === code?.timeStamp)
    newFileData.files[fileIndex].codeDiffs[timeStampIndex].codeDiff = diffEditorRef.current?.getModifiedEditor().getValue() || ""
    setVideo(newFileData as VideosModel)
  }

  const handleSave = async () => {
    if (!video || !videoName) return
    handleDiffChange()
    await updateVideo(video?.files[fileIndex].fileName, videoName?.toString(), video.files[fileIndex].codeDiffs)
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

  return (
    <div className="w-full h-full bg-gray-100 p-14">
      <div>
        <div className="flex w-full">
          {video?.files[fileIndex].codeDiffs.map((item, i) => {
            return <TimeStampButton text={item.timeStamp} onClick={setTimeStampCode} key={i} />
          })}
        </div>
        <input
          type="text"
          onChange={(e) => {
            setTimeStamp(e.target.value)
          }}
        />
        <BasicButton buttonText="Add Timestamp" onClick={addTimeStamp} />
      </div>
      <div>
        Editing: {video?.files[fileIndex].fileName} at {code?.timeStamp}
      </div>
      <div className="w-12/12 h-5/6 mx-auto flex items-center justify-center">
        <CodeDiffSidebar files={video?.files || null} getFileInfo={getFileInfo} />
        <DiffEditor original={code?.codeDiff} width="100%" height="100%" theme="vs-dark" onMount={handleEditorDidMount} />
      </div>
      <div className="w-full flex items-end justify-end">
        <BasicButton buttonText={"Save Changes"} onClick={handleSave} />
      </div>
    </div>
  )
}

export default VideoDiffPage
