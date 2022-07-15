import { useRouter } from "next/router"
import React from "react"
import BasicButton from "../components/BasicButton"

const Hero = () => {
  const router = useRouter()

  return (
    <section className="flex items-center justify-center py-80 bg-blue-50">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-5">CourseDiff</h1>
        <h2 className="text-3xl md:text-4xl text-pink-500 font-semibold mb-11">Let your students debug their code without the hassle</h2>
        <BasicButton
          buttonText="Get Started"
          onClick={() => {
            router.push("/signup")
          }}
        />
      </div>
    </section>
  )
}

export default Hero
