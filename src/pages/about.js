import React from "react"
import { graphql } from "gatsby"
import remark from "remark"
import remarkHTML from "remark-html"
import Image from "gatsby-image"

import PageLayout from "../components/page-layout"
import BaseSection from "../components/sections/base"
import SideBySide from "../components/sections/side-by-side"
import Tabs from "../components/tabs"
import Team from "../components/team"

import { generateIdFromTitle } from "../utils"

const AboutPage = ({ data, location }) => {
  const toHTML = value => remark().use(remarkHTML).processSync(value).toString()

  const pageData = data.allMarkdownRemark.nodes[0].frontmatter
  const introSectionId = generateIdFromTitle(pageData.introSection.title)
  const teamSectionId = generateIdFromTitle(pageData.teamSection.title)
  const herbertSimonSectionId = generateIdFromTitle(
    pageData.herbertSimonSection.title
  )

  const tabTitles = [
    pageData.introSection.title,
    ...pageData.textSections.map(section => section.title),
    pageData.teamSection.title,
    pageData.herbertSimonSection.title,
  ]

  return (
    <div>
      <PageLayout title={pageData.header.title} location={location}>
        <Tabs titles={tabTitles}></Tabs>
        <BaseSection id={introSectionId}>
          <SideBySide title={pageData.introSection.title}>
            <div
              dangerouslySetInnerHTML={{
                __html: toHTML(pageData.introSection.content),
              }}
            ></div>
          </SideBySide>
        </BaseSection>
        {pageData.textSections.map(textSection => {
          const id = generateIdFromTitle(textSection.title)
          return (
            <BaseSection id={id} key={id}>
              <SideBySide title={textSection.title}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: toHTML(textSection.content),
                  }}
                ></div>
              </SideBySide>
            </BaseSection>
          )
        })}
        <BaseSection id={teamSectionId}>
          <SideBySide title={pageData.teamSection.title}>
            <Team />
          </SideBySide>
        </BaseSection>
        <div id={herbertSimonSectionId}>
          <Image
            fluid={pageData.herbertSimonSection.photo.childImageSharp.fluid}
          />
        </div>
        <BaseSection>
          <SideBySide title={pageData.herbertSimonSection.title}>
            <div
              dangerouslySetInnerHTML={{
                __html: toHTML(pageData.herbertSimonSection.content),
              }}
            ></div>
          </SideBySide>
        </BaseSection>
      </PageLayout>
    </div>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/custom-page/about.md/" } }
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
          }
          introSection {
            title
            content
          }
          textSections {
            title
            content
          }
          teamSection {
            title
            content
          }
          herbertSimonSection {
            title
            content
            photo {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
