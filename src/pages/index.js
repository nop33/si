import React from "react"
import { Link } from "gatsby"

import CenteredNarrow from "../components/sections/centered-narrow"
import ThreeColumns from "../components/sections/three-columns"
import News from "../components/sections/news"
import Projects from "../components/sections/projects"
import BaseSection from "../components/base-section"
import PageLayout from "../components/page-layout"

const Home = ({ location }) => {
  return (
    <div>
      <PageLayout
        title="Supporting policy-making for future generations"
        subtitle="Public policy is the result of the interaction of a myriad of actors representing different interests.
        We improve their cooperation with future generations."
        location={location}
      >
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
      </PageLayout>
    </div>
  )
}

export default Home
