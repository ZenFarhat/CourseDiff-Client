import { useInView } from 'framer-motion'
import React, { useRef } from 'react'

import TestimonialCard from '../components/homeComponents/TestimonialCard'

const Testimonials = () => {
  const ref = useRef(null)

  return (
    <div className="bg-blue-50 flex justify-around items-stretch flex-wrap py-24 px-4 overflow-hidden" ref={ref}>
      <TestimonialCard stat="300+" statDesc="Videos Annotated" quote="This platform has enabled me to make all my videos much easier to follow along for my students. I recommend CodeCorder for anyone with a large video base." founderName="John F." founderUrl="youtube.com/johnF" bgVariant="bg-red-500" />
      <TestimonialCard stat="400,000+" statDesc="Students daily" quote="Imagine trying to debug over 400,000 students' code. CodeCorder allows me to do it all in one place and gives me more time to create better content." founderName="John F." founderUrl="youtube.com/johnF" bgVariant="bg-orange-500" />
      <TestimonialCard stat="100+" statDesc="Happy students" quote="The feedback from my students is incredible. I'm now able to push out much more new course content now that I'm using CodeCorder. You'll definitely get a bang for your buck." founderName="John F." founderUrl="youtube.com/johnF" bgVariant="bg-purple-500" />
    </div>
  )
}

export default Testimonials
