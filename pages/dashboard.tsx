import { useEffect, useState } from 'react'

import BasicButton from '../components/BasicButton'
import CompanyNameForm from '../components/CompanyNameForm'
import DashBoardLoader from '../components/DashBoardLoader'
import SubmitVideoForm from '../components/SubmitVideoForm'
import VideoDashboardTile from '../components/VideoDashboardTile'
import { useAuth } from '../contexts/AuthContext'
import { getUserInfo } from '../firebase/db'
import { deleteVideo } from '../firebase/db/videos'
import { UserInterface } from '../models/userCollectionModel.interface'
import { modalHandler$, refreshDataSub$ } from '../rxjs'

import type { NextPage } from "next"

const Dashboard: NextPage = () => {
  const { user, updateCompanyContext } = useAuth()
  const [userVideos, setUserVideos] = useState<UserInterface>()
  const [loading, setLoading] = useState(true)

  const fetchProfile = async () => {
    if (!user) return
    getUserInfo(user?.uid)
      .then((data) => {
        setUserVideos(data)
        if (!data.companyName) return setLoading(false)
        updateCompanyContext(data.companyName)
        setLoading(false)
      })
      .catch((e) => {
        console.log(e)
        setLoading(false)
      })
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
    return <DashBoardLoader />
  }

  return (
    <div className="w-full h-full bg-gray-100 p-20">
      <div>
        <h1 className="text-4xl mb-5">Your Videos</h1>
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
        <CompanyNameForm />
      )}
    </div>
  )
}

export default Dashboard
