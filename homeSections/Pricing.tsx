import React, { useRef } from "react"
import PriceCard from "../components/homeComponents/PriceCard"
import Image from "next/image"
import { useInView } from "framer-motion"

const Pricing = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="bg-gray-900 py-14 overflow-hidden">
      <div className="w-11/12 mx-auto">
        <div className="container mx-auto flex flex-wrap justify-between">
          <div className="lg:w-2/6 mb-11 flex flex-col">
            <h2 className="text-white text-2xl md:text-4xl mb-5">Level up your {"students'"} learning experience with CourseDiff.</h2>
            <h2 className="text-white text-xl  md:text-3xl mb-5">Join other content creators who aim to provide an overall better, smoother learning experience</h2>
            <h2 className="text-white text-xl  md:text-xl">Choose the plan that best fits you.</h2>
            <div
              className="mx-auto mt-10 origin-top hidden md:block"
              ref={ref}
              style={{
                transform: isInView ? "none" : "rotate(90deg)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
              }}
            >
              <Image src="/curvedArrow.svg" width={200} height={200} alt="curved-arrow text-pink-500" />
            </div>
            <div className="mx-auto mt-10 origin-top block md:hidden">
              <Image src="/curvedArrowDown.svg" width={150} height={150} alt="curved-arrow text-pink-500" />
            </div>
          </div>
          <div className="lg:w-3/6 flex flex-wrap items-stretch justify-start">
            <PriceCard plan="Quarterly plan" price="$270" monthlyPriceText="Paid quarterly" billingFrequency="$90 p/mo" variant={1} />
            <PriceCard plan="Yearly plan" price="$1,020" monthlyPriceText="Paid annualy" billingFrequency="$85 p/mo" variant={2} />
            <PriceCard plan="Monthly plan" price="$99" monthlyPriceText="Paid monthly" billingFrequency="Let's take it one month at a time" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing
