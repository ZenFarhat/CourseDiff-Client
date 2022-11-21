import { DiffEditor, Monaco } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

import BasicButton from '../../../components/BasicButton'
import DashBoardLoader from '../../../components/DashBoardLoader'
import { getVideoDetails } from '../../../firebase/db/videos'
import { IUserVideo } from '../../../models/userCollectionModel.interface'
import { refreshDiffData$ } from '../../../rxjs'
import { getFileExtension } from '../../../utils/getFileExtension'

const VideoDiffPage = () => {
  const [videoInfo, setVideoInfo] = useState<IUserVideo>()
  const [fileIndex, setFileIndex] = useState(0)
  const [historyIndex, setHistoryIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [fileFilter, setFileFilter] = useState("")

  const diffEditorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(null)

  const router = useRouter()
  const { companyName, videoName } = router.query

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneDiffEditor, monaco: Monaco) => {
    diffEditorRef.current = editor
  }

  const handleGetVideo = async () => {
    if (!companyName || !videoName) return
    await getVideoDetails(companyName?.toString(), videoName.toString())
      .then((data) => {
        if (!data) return
        setVideoInfo(data)
        setLoading(false)
      })
      .catch((e) => {
        console.log(e)
        setLoading(false)
      })
  }

  const handleSearch = (value: string) => {
    setFileFilter(value)
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
    <div className="h-screen">
      <div className="fixed bottom-0 z-50 w-full">
        <div>
          <input
            placeholder="Search file"
            className="mx-4 p-2 w-1/6 rounded-t-xl focus:outline-none"
            onChange={(e) => {
              setFileFilter(e.target.value)
            }}
          />
        </div>
        <div className=" bg-blue-900 w-full">
          {videoInfo?.files?.map((item, i) => {
            return (
              item.filePath.toLowerCase().includes(fileFilter.toLowerCase()) && (
                <button
                  key={i}
                  onClick={() => {
                    setFileIndex(i)
                    setHistoryIndex(0)
                  }}
                  className="m-1 bg-blue-500 p-1 rounded-xl"
                >
                  {item.filePath}
                </button>
              )
            )
          })}
          <div>
            {videoInfo?.files[fileIndex]?.history?.map((item, i) => {
              return (
                <button key={i} onClick={() => setHistoryIndex(i)} className="m-1 bg-blue-500 p-1 rounded-xl">
                  {item.timeStamp}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <DiffEditor className="h-screen" language={getFileExtension(videoInfo?.files[fileIndex].filePath || "")} original={videoInfo?.files[fileIndex]?.history[historyIndex]?.code} theme="vs-dark" onMount={handleEditorDidMount} />
    </div>
  )
}

export default VideoDiffPage
