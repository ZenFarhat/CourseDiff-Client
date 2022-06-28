import React from "react"

const About = () => {
  return (
    <section className="bg-gray-900 w-screen py-32">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="lg:w-2/6">
          <h1 className="text-white text-5xl flex-1 mb-12 leading-relaxed">
            Make code-alongs easier, <br /> make your students happier.
          </h1>
          <h2 className="text-white text-2xl mt-5 leading-relaxed">The perfect place to make time-stamped code-diffs</h2>
        </div>
        <div className="lg:w-2/6 flex flex-wrap items-start justify-start"></div>
      </div>
    </section>
  )
}

export default About
