import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import { codeDiffModel, FolderModel, VideosModel } from "../../../models/userCollectionModel.interface"
import { DiffEditor, Monaco } from "@monaco-editor/react"
import CodeDiffSidebar from "../../../components/CodeDiffSidebar"
import { refreshDiffData$, snackbarHandler$ } from "../../../rxjs"
import * as monaco from "monaco-editor"
import { getVideoDetails, updateVideo } from "../../../firebase/db/videos"
import DashBoardLoader from "../../../components/DashBoardLoader"

const VideoDiffPage = () => {
  const [folderData, setFolderData] = useState<{ folderData: FolderModel; rootFolderDocumentId: string }>()
  const [fileIndex, setCurrentFileIndex] = useState(0)
  const [code, setCurrentCode] = useState<codeDiffModel>()
  const [codeLanguage, setCodeLanguage] = useState("")
  const [loading, setLoading] = useState(true)

  const diffEditorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(null)

  const router = useRouter()
  const { companyName, videoName } = router.query

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneDiffEditor, monaco: Monaco) => {
    diffEditorRef.current = editor
  }

  const handleGetFolder = async () => {
    if (!companyName || !videoName) return
    await getVideoDetails(companyName?.toString(), videoName.toString())
      .then((data) => {
        if (!data) return
        setFolderData(data)
        setLoading(false)
      })
      .catch((e) => {
        console.log(e)
        setLoading(false)
      })
  }

  useEffect(() => {
    handleGetFolder()
    const sub = refreshDiffData$.subscribe({
      next(value) {
        value && handleGetFolder()
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
    <div className="h-screen bg-gray-200 flex flex-col justify-around">
      <div className="h-full flex items-center justify-center">
        <CodeDiffSidebar files={folderData?.folderData.children || []} rootId={folderData?.rootFolderDocumentId || ""} />
        <DiffEditor original={code?.codeDiff || ""} width="100%" height="100%" theme="vs-dark" onMount={handleEditorDidMount} language={codeLanguage} />
      </div>
    </div>
  )
}

export default VideoDiffPage
