import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import { codeDiffModel, FilesArrayModel, VideosModel } from "../../../../models/userCollectionModel.interface"
import { DiffEditor, Monaco } from "@monaco-editor/react"
import CodeDiffSidebar from "../../../../components/CodeDiffSidebar"
import { refreshDiffData$ } from "../../../../rxjs"
import BasicButton from "../../../../components/BasicButton"
import TimeStampButton from "../../../../components/TimeStampButton"
import * as monaco from "monaco-editor"
import { getVideoDetails } from "../../../../firebase/db/videos"

const VideoDiffPage = () => {
  const [file, setCurrentFile] = useState<FilesArrayModel>()
  const [code, setCurrentCode] = useState<codeDiffModel>()
  const [video, setVideo] = useState<VideosModel | null>()
  const [timeStamp, setTimeStamp] = useState("")
  const diffEditorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(null)

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneDiffEditor, monaco: Monaco) => {
    diffEditorRef.current = editor
  }

  const router = useRouter()
  const { userCompanyName, videoName } = router.query

  const getFileInfo = (fileName: string) => {
    if (!video) return
    const item = video.files?.find((item) => item.fileName === fileName)
    setCurrentFile(item)
    setCurrentCode(item?.codeDiffs[0])
  }

  const addTimeStamp = () => {}

  const setTimeStampCode = (timeStamp: string) => {
    const foundCodeDiff = file?.codeDiffs.find((item) => item.timeStamp === timeStamp)
    setCurrentCode(foundCodeDiff)
  }

  const handleGetVideo = async () => {
    if (!userCompanyName || !videoName) return
    await getVideoDetails(userCompanyName?.toString(), videoName.toString())
      .then((data) => {
        console.log(data)
        setVideo(data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const saveCodeAtTimeStamp = () => {}

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
          {file?.codeDiffs.map((item, i) => {
            return <TimeStampButton text={item.timeStamp} onClick={setTimeStampCode} key={i} />
          })}
        </div>
        <input
          type="text"
          placeholder="hh:mm:ss"
          onChange={(e) => {
            setTimeStamp(e.target.value)
          }}
        />
        <BasicButton buttonText="Add Timestamp" onClick={addTimeStamp} />
      </div>
      <div>
        Editing: {file?.fileName} at {code?.timeStamp}
      </div>
      <div className="w-12/12 h-5/6 mx-auto flex items-center justify-center">
        <CodeDiffSidebar files={video?.files || null} getFileInfo={getFileInfo} />
        <DiffEditor original={code?.codeDiff} width="100%" height="100%" theme="vs-dark" language={`${file?.fileName.substring(file.fileName.indexOf(".") + 1)}`} onMount={handleEditorDidMount} />
      </div>
      <div className="w-full flex items-end justify-end">
        <BasicButton buttonText={`Save for ${file?.fileName} at ${code?.timeStamp}`} onClick={saveCodeAtTimeStamp} />
      </div>
    </div>
  )
}

export default VideoDiffPage
