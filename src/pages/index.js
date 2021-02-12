import React from "react"

import Hero from "../components/hero"
import CenteredNarrow from "../components/sections/centered-narrow"
import ThreeColumns from "../components/sections/three-columns"
import News from "../components/sections/news"
import BaseSection from "../components/base-section"
import HomeLayout from "../components/home-layout"

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <HomeLayout>
        <BaseSection>
          <CenteredNarrow>
            <p className="large-p">
              Public policy is the result of the interaction of a myriad of
              actors representing different interests. The Simon Institute for
              Longterm Governance (SI) increases the capacity of policy networks
              to anticipate global catastrophic risks and build resilience for
              civilization to flourish.
            </p>
          </CenteredNarrow>
        </BaseSection>
        <BaseSection>
          <CenteredNarrow>
            <h2>Our mission</h2>
            <p className="large-p">
              Increasing the capacity of policy networks to anticipate global
              catastrophic risks, build resilience and foster systemic learning
              for civilizations to flourish.
            </p>
          </CenteredNarrow>
        </BaseSection>
        <BaseSection>
          <ThreeColumns></ThreeColumns>
        </BaseSection>
        <BaseSection>
          <News></News>
        </BaseSection>
      </HomeLayout>
    </div>
  )
}

export default Home
