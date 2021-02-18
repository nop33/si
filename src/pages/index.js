import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import CenteredNarrow from "../components/sections/centered-narrow"
import ThreeColumns from "../components/sections/three-columns"
import News from "../components/sections/news"
import Projects from "../components/sections/projects"
import BaseSection from "../components/base-section"
import HomeLayout from "../components/home-layout"

const Home = () => {
  return (
    <div>
      <HomeLayout>
        <BaseSection>
          <CenteredNarrow>
            <div className="font-size-3">
              <p>
                The Simon Institute for Longterm Governance (SI) is somewhere
                between a research lab and a training centre, founded and
                nourished by a community of researchers and policy-makers.
              </p>
              <p>
                We are building the knowledge and community to improve the
                global governance of catastrophic risks.
              </p>
              <p>
                Our work is guided by a vision of governance tools and practices
                that account for future generations, facilitated by advances in
                research and attitudes.
              </p>
              <p>
                As we're a non-profit, we can afford to focus on the longterm.
              </p>

              <Link to="/about">More about us</Link>
            </div>
          </CenteredNarrow>
        </BaseSection>
        <BaseSection>
          <ThreeColumns></ThreeColumns>
        </BaseSection>
        <hr></hr>
        <BaseSection>
          <News></News>
        </BaseSection>
        <BaseSection>
          <Projects></Projects>
        </BaseSection>
      </HomeLayout>
    </div>
  )
}

export default Home
