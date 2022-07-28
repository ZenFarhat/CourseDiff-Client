import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import { codeDiffModel, VideosModel } from "../../../models/userCollectionModel.interface"
import { DiffEditor, Monaco } from "@monaco-editor/react"
import CodeDiffSidebar from "../../../components/CodeDiffSidebar"
import { refreshDiffData$, snackbarHandler$ } from "../../../rxjs"
import BasicButton from "../../../components/BasicButton"
import * as monaco from "monaco-editor"
import { getVideoDetails, updateVideo } from "../../../firebase/db/videos"
import DashBoardLoader from "../../../components/DashBoardLoader"
import ComponentRequiresAuth from "../../../components/ComponentRequiresAuth"
import { getFileExtension } from "../../../utils/getFileExtension"
import AddTimestampInput from "../../../components/AddTimestampInput"

const VideoDiffPage = () => {
  const [video, setVideo] = useState<VideosModel>()
  const [fileIndex, setCurrentFileIndex] = useState(0)
  const [code, setCurrentCode] = useState<codeDiffModel>()
  const [searchValue, setSearchValue] = useState("")
  const [codeLanguage, setCodeLanguage] = useState("")
  const [loading, setLoading] = useState(true)

  const diffEditorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(null)

  const router = useRouter()
  const { companyName, videoName } = router.query

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
    diffEditorRef.current?.getModifiedEditor().setValue("")
    setCurrentFileIndex(newFileData.files.findIndex((item) => item.fileName === fileName))
    const file = newFileData.files.find((item) => item.fileName === fileName)
    setCurrentCode(file?.codeDiffs[0])

    setCodeLanguage(getFileExtension(fileName) || "")
  }

  const addTimeStamp = (timeStamp: string) => {
    if (!video) return
    const newFileData: VideosModel = { ...video }
    if (newFileData.files[fileIndex].codeDiffs.find((item) => item.timeStamp === timeStamp)) return snackbarHandler$.next({ content: "Timestamp exists on this file", variant: "warning" })
    newFileData.files[fileIndex].codeDiffs.push({ codeDiff: "", timeStamp: timeStamp })
    setCurrentCode(newFileData.files[fileIndex].codeDiffs[newFileData.files[fileIndex].codeDiffs.length - 1])
    setVideo(newFileData)
  }

  const handleDiffChange = () => {
    if (!video) return
    const newFileData: VideosModel = { ...video }
    if (fileIndex === -1 || fileIndex === undefined) return setVideo({ ...newFileData })
    const timeStampIndex = newFileData?.files[fileIndex]?.codeDiffs.findIndex((item) => item.timeStamp === code?.timeStamp)
    newFileData.files[fileIndex].codeDiffs[timeStampIndex].codeDiff = diffEditorRef.current?.getModifiedEditor().getValue() || ""
  }

  const handleSave = async () => {
    if (!video || !videoName) return
    handleDiffChange()
    await updateVideo(videoName.toString(), video)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    snackbarHandler$.next({ content: "Url copied!", variant: "success" })
  }

  const addFile = (fileName: string) => {
    if (!video) return
    const newFileData: VideosModel = { ...video }
    if (newFileData.files.find((item) => item.fileName === fileName)) return snackbarHandler$.next({ content: "File already exists!", variant: "warning" })
    newFileData.files.push({ fileName: fileName, codeDiffs: [{ timeStamp: "0s", codeDiff: "" }] })
    setVideo(newFileData)
  }

  const handleGetVideo = async () => {
    if (!companyName || !videoName) return
    await getVideoDetails(companyName?.toString(), videoName.toString())
      .then((data) => {
        if (!data) return
        setVideo(data)
        setCodeLanguage(getFileExtension(data.files[0].fileName) || "")
        setCurrentCode(data.files[fileIndex].codeDiffs[data.files[fileIndex].codeDiffs.length - 1])
        setLoading(false)
      })
      .catch((e) => {
        console.log(e)
        setLoading(false)
      })
  }

  const deleteFile = (fileName: string) => {
    if (!video) return
    const newFileData: VideosModel = { ...video }
    const fileIndex = newFileData.files.findIndex((item) => item.fileName === fileName)
    newFileData.files.splice(fileIndex, 1)
    setVideo(newFileData)
    setCurrentFileIndex(0)
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  useEffect(() => {
    handleGetVideo()
    const sub = refreshDiffData$.subscribe({
      next(value) {
        value && handleGetVideo()
      },
    })

    return () => {
      sub.unsubscribe()
    }
  }, [])

  if (loading) {
    return <DashBoardLoader />
  }

  return (
    <div className="h-screen p-2 bg-gray-200 flex flex-col justify-around">
      <div className="w-3/6">
        <ComponentRequiresAuth>
          <AddTimestampInput onClick={addTimeStamp} />
        </ComponentRequiresAuth>
      </div>
      <div className="flex w-full mb-2"></div>
      <div className="h-full flex items-center justify-center">
        <CodeDiffSidebar files={video?.files} getFileInfo={getFileInfo} addFile={addFile} deleteFile={deleteFile} handleSearch={handleSearch} />
        <DiffEditor original={code?.codeDiff || ""} width="100%" height="100%" theme="vs-dark" onMount={handleEditorDidMount} language={codeLanguage} />
      </div>
      <ComponentRequiresAuth>
        <div className="mt-5">
          <BasicButton buttonText="Share link" onClick={handleCopy} />
          <BasicButton buttonText="Save Changes" onClick={handleSave} />
        </div>
      </ComponentRequiresAuth>
    </div>
  )
}

export default VideoDiffPage
