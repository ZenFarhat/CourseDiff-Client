import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import { VideoApi } from "../../../../api/VideoApi"
import { codeDiffModel, FilesArrayModel } from "../../../../models/userCollectionModel.interface"
import { DiffEditor, Monaco } from "@monaco-editor/react"
import CodeDiffSidebar from "../../../../components/CodeDiffSidebar"
import { refreshDiffData$ } from "../../../../rxjs"
import { FileApi } from "../../../../api/FileApi"
import BasicButton from "../../../../components/BasicButton"
import TimeStampButton from "../../../../components/TimeStampButton"
import * as monaco from "monaco-editor"

const VideoDiffPage = () => {
  const [userData, setUserData] = useState<FilesArrayModel[]>()
  const [file, setCurrentFile] = useState<FilesArrayModel>()
  const [code, setCurrentCode] = useState<codeDiffModel>()
  const [timeStamp, setTimeStamp] = useState("")
  const diffEditorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(null)

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneDiffEditor, monaco: Monaco) => {
    diffEditorRef.current = editor
  }

  const router = useRouter()
  const { userDisplayName, videoName } = router.query

  const videoApi = new VideoApi()
  const fileApi = new FileApi()

  const handleGetVideo = () => {
    if (userDisplayName && videoName) {
      videoApi.getVideo(userDisplayName.toString(), encodeURIComponent(videoName.toString())).then((data) => {
        setUserData(data)
      })
    }
  }

  const getFileInfo = (fileName: string) => {
    if (!userData) return
    const item = userData?.find((item) => item.fileName === fileName)
    setCurrentFile(item)
    setCurrentCode(item?.codeDiffs[0])
  }

  const addTimeStamp = () => {
    if (!videoName || !file) return
    fileApi.addTimeStampToFile({ codeDiff: "", timeStamp: timeStamp }, encodeURIComponent(videoName.toString()), file?.fileName).then((data) => {
      refreshDiffData$.next(true)
      setCurrentFile(data)
    })
  }

  const setTimeStampCode = (timeStamp: string) => {
    const foundCodeDiff = file?.codeDiffs.find((item) => item.timeStamp === timeStamp)
    setCurrentCode(foundCodeDiff)
  }

  const saveCodeAtTimeStamp = () => {
    if (!videoName || !file || !code || !diffEditorRef.current) return
    fileApi.updateCodeAtTimeStamp({ timeStamp: code?.timeStamp, codeDiff: diffEditorRef.current.getModifiedEditor().getValue() }, encodeURIComponent(videoName?.toString()), file?.fileName).then((data) => {
      const foundCode = data.codeDiffs.find((item) => item.timeStamp === code.timeStamp)
      setCurrentCode(foundCode)
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

  if (!userData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-2xl">{"Data not found :("}</p>
      </div>
    )
  }

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
        <CodeDiffSidebar files={userData} getFileInfo={getFileInfo} />
        <DiffEditor original={code?.codeDiff} width="100%" height="100%" theme="vs-dark" language={`${file?.fileName.substring(file.fileName.indexOf(".") + 1)}`} onMount={handleEditorDidMount} />
      </div>
      <div className="w-full flex items-end justify-end">
        <BasicButton buttonText={`Save for ${file?.fileName} at ${code?.timeStamp}`} onClick={saveCodeAtTimeStamp} />
      </div>
    </div>
  )
}

export default VideoDiffPage
