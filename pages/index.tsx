import type { NextPage } from "next"

import Nav from "../home/Nav"
import Hero from "../home/Hero"
import About from "../home/About"

const Home: NextPage = () => {
  return (
    <div className="h-screen w-screen">
      <Nav />
      <Hero />
      <About />
    </div>
  )
}

export default Home
