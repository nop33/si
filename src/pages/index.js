import React from "react"

import Hero from "../components/hero"
import Intro from "../components/sections/intro"
import Mission from "../components/sections/mission"
import ThreeColumns from "../components/sections/three-columns"
import News from "../components/sections/news"
import BaseSection from "../components/sections/base-section"
import WideSection from "../components/sections/wide-section"

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <BaseSection>
        <Intro></Intro>
      </BaseSection>
      <BaseSection>
        <Mission></Mission>
      </BaseSection>
      <WideSection>
        <ThreeColumns></ThreeColumns>
      </WideSection>
      <WideSection>
        <News></News>
      </WideSection>
    </div>
  )
}

export default Home
