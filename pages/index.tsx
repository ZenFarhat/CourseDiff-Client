import type { NextPage } from "next"

import Nav from "../homeSections/Nav"
import Hero from "../homeSections/Hero"
import Pricing from "../homeSections/Pricing"
import Testimonials from "../homeSections/Testimonials"

const Home: NextPage = () => {
  return (
    <div className="h-screen">
      <Nav />
      <Hero />
      <Pricing />
      <Testimonials />
    </div>
  )
}

export default Home
