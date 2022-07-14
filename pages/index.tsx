import type { NextPage } from "next"

import Nav from "../homeSections/Nav"
import Hero from "../homeSections/Hero"
import About from "../homeSections/About"

const Home: NextPage = () => {
  return (
    <div className="h-screen">
      <Nav />
      <Hero />
      <About />
    </div>
  )
}

export default Home
