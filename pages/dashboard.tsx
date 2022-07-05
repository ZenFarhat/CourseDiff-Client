import type { NextPage } from "next"
import { Spinner } from "phosphor-react"
import { useEffect, useState } from "react"
import BasicButton from "../components/BasicButton"
import SubmitVideoForm from "../components/SubmitVideoForm"
import VideoDashboardTile from "../components/VideoDashboardTile"
import { useAuth } from "../contexts/AuthContext"
import { getUserInfo, updateCompanyName } from "../firebase/db"
import { deleteVideo } from "../firebase/db/videos"
import { UserInterface } from "../models/userCollectionModel.interface"
import { loadingHandler$, modalHandler$, refreshDataSub$ } from "../rxjs"

const Dashboard: NextPage = () => {
  const { user, updateCompanyContext } = useAuth()
  const [userVideos, setUserVideos] = useState<UserInterface>()
  const [companyName, setCompanyName] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchProfile = () => {
    if (!user) return
    getUserInfo(user?.uid)
      .then((data) => {
        setUserVideos(data)
        if (!data.companyName) return
        updateCompanyContext(data.companyName)
        setLoading(false)
      })
      .catch((e) => {
        console.log(e)
        setLoading(false)
      })
  }

  const updateCompany = async () => {
    if (!user) return
    try {
      await updateCompanyName(user?.uid, companyName)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchProfile()
    const refreshSub = refreshDataSub$.subscribe({
      next(value) {
        value && fetchProfile()
      },
    })

    return () => refreshSub.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <Spinner size={96} color="black" className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-gray-100 p-20">
      <div>
        <h1 className="text-4xl mb-5">Your Diffs</h1>
        <div className="w-full h-1 bg-gray-900 rounded-full"></div>
      </div>
      <div className="my-5">
        {userVideos?.companyName && (
          <BasicButton
            buttonText="Add video"
            onClick={() => {
              modalHandler$.next({ open: true, contents: <SubmitVideoForm /> })
            }}
          />
        )}
      </div>
      {userVideos?.companyName ? (
        <div className="w-full flex items-start flex-wrap">
          {userVideos?.videos.map((video, i) => {
            return <VideoDashboardTile videoName={video.videoName} key={i} deleteVideo={deleteVideo} />
          })}
        </div>
      ) : (
        <>
          <p>{"Looks like you don't have a company name yet, please update it here: (note that this will appear on your diff urls')"}</p>
          <input
            type="text"
            onChange={(e) => {
              setCompanyName(e.target.value)
            }}
          />
          <BasicButton onClick={updateCompany} buttonText="Update Company Name" />
        </>
      )}
    </div>
  )
}

export default Dashboard
