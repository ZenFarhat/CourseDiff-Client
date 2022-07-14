import React from "react"
import PriceCard from "../components/homeComponents/PriceCard"

const About = () => {
  return (
    <section className="bg-gray-900 py-12">
      <div className="w-11/12 mx-auto">
        <div className="container mx-auto flex flex-wrap justify-between">
          <div className="lg:w-2/6 mb-11">
            <h1 className="text-white text-2xl flex-1 mb-12 leading-relaxed">Level up your {"students'"} learning experience with CourseDiff.</h1>
            <h2 className="text-white text-xl mt-5 leading-relaxed">Join other content creators who aim to provide an overall better, smoother learning experience</h2>
          </div>
          <div className="lg:w-3/6 flex flex-wrap items-start justify-star">
            <PriceCard plan="Quarterly plan" price="$75" monthlyPriceText="Paid quarterly" billingFrequency="$25 p/mo" variant={1} />
            <PriceCard plan="Yearly plan" price="$240" monthlyPriceText="Paid annualy" billingFrequency="$20 p/mo" variant={2} />
            <PriceCard plan="Monthly plan" price="$28" monthlyPriceText="Paid monthly" billingFrequency="Let's take it one month at a time" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
