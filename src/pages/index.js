import React from "react"

import Intro from "../components/sections/intro"
import ThreeColumns from "../components/sections/three-columns"
import News from "../components/sections/news"
import Projects from "../components/sections/projects"
import BaseSection from "../components/sections/base"
import PageLayout from "../components/page-layout"

const Home = ({ data, location }) => {
  const pageData = data.allMarkdownRemark.nodes[0].frontmatter

  return (
    <div>
      <PageLayout
        title={pageData.header.title}
        subtitle={pageData.header.subtitle}
        location={location}
      >
        <BaseSection>
          <Intro
            content={pageData.introSection.content}
            link={pageData.introSection.link}
          />
        </BaseSection>
        <BaseSection noTopPadding>
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

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/custom-page/home.md/" } }
    ) {
      nodes {
        frontmatter {
          title
          seo {
            title
            description
          }
          header {
            title
            subtitle
          }
          introSection {
            link {
              text
              url
            }
            content
          }
        }
      }
    }
  }
`
