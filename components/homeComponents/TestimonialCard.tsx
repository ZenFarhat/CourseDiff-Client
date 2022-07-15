import React, { useRef } from "react"
import Image from "next/image"
import { useInView } from "framer-motion"
import { delay } from "rxjs"

interface TestimonialCardProps {
  stat: string
  statDesc: string
  quote: string
  founderName: string
  founderUrl: string
  bgVariant: string
}

const TestimonialCard = (props: TestimonialCardProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { stat, statDesc, quote, founderName, founderUrl, bgVariant } = props

  return (
    <div
      className="my-10 w-10/12 md:w-5/12 lg:w-3/12 py-4 bg-white shadow-2xl rounded-3xl text-center flex flex-col justify-between"
      style={{
        transform: isInView ? "none" : "translateX(-100px)",
        opacity: isInView ? 1 : 0,
        transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1s`,
      }}
      ref={ref}
    >
      <div className="w-full mx-auto">
        <Image src="/logo.jpg" width="100%" height="100%" alt="companyLogo" className="object-contain" />
      </div>
      <div className={`flex justify-between items-center w-full py-4 px-2 text-white text-xl md:text-2xl lg:text-4xl font-bold mb-10 ` + bgVariant}>
        <p>{stat}</p>
        <p>{statDesc}</p>
      </div>
      <div className="mb-5 p-5">
        <p className="text-gray-500 italic">{`"${quote}"`}</p>
      </div>
      <div>
        <p className="font-bold text-gray-500 mb-2">{founderName}</p>
        <p className=" text-gray-500 italic">{founderUrl}</p>
      </div>
    </div>
  )
}

export default TestimonialCard
