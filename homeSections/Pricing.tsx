import React from "react"
import PriceCard from "../components/homeComponents/PriceCard"

const Pricing = () => {
  return (
    <section className="bg-gray-900 py-12 overflow-hidden">
      <div className="w-11/12 mx-auto">
        <div className="container mx-auto flex flex-wrap justify-between">
          <div className="lg:w-2/6 mb-11">
            <h2 className="text-white text-2xl md:text-4xl mb-5">Level up your {"students'"} learning experience with CourseDiff.</h2>
            <h2 className="text-white text-xl  md:text-3xl mb-5">Join other content creators who aim to provide an overall better, smoother learning experience</h2>
            <h2 className="text-white text-xl  md:text-xl">Choose the plan that best fits you.</h2>
          </div>
          <div className="lg:w-3/6 flex flex-wrap items-start justify-star">
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
