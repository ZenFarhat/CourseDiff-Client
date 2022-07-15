import { useInView } from "framer-motion"
import React, { useRef } from "react"
import TestimonialCard from "../components/homeComponents/TestimonialCard"

const Testimonials = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div
      className="bg-blue-50 flex justify-around items-stretch flex-wrap py-32 px-4"
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1s",
      }}
    >
      <TestimonialCard stat="300+" statDesc="Videos Annotated" quote="This platform has enabled me to make all my videos much easier to follow along for my students" founderName="John F." founderUrl="youtube.com/johnF" bgVariant="bg-red-500" />
      <TestimonialCard stat="400,000+" statDesc="Students daily" quote="Imagine trying to debug over 400,000 students' code. Coursediff allows me to do it all in one place and gives me more time to create better content." founderName="John F." founderUrl="youtube.com/johnF" bgVariant="bg-orange-500" />
      <TestimonialCard stat="100+" statDesc="Happy students" quote="The feedback from my students is incredible." founderName="John F." founderUrl="youtube.com/johnF" bgVariant="bg-purple-500" />
    </div>
  )
}

export default Testimonials
