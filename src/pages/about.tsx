import React from "react"
import { graphql } from "gatsby"

import Image from "gatsby-image"

import { toHTML } from "../utils"

import PageLayout from "../components/page-layout"
import BaseSection from "../components/sections/BaseSection"
import SideBySide from "../components/sections/SideBySide"
import Tabs from "../components/tabs"
import Seo from "../components/seo"

import { generateIdFromTitle, updateSrcSet } from "../utils"
import Team from "../components/team"

const AboutPage = ({ data, location }) => {
  const pageData = data.allMarkdownRemark.nodes[0].frontmatter
  const teamSectionId = generateIdFromTitle(pageData.teamSection.title)
  const herbertSimonSectionId = generateIdFromTitle(
    pageData.herbertSimonSection.title
  )

  const tabTitles = [
    ...pageData.textSections.map(section => section.title),
    pageData.teamSection.title,
    pageData.herbertSimonSection.title,
  ]

  const herbertImage =
    pageData.herbertSimonSection.photo?.childImageSharp?.fluid
  if (herbertImage) {
    herbertImage.srcSet = updateSrcSet(herbertImage.srcSet, 1920)
  }

  return (
    <PageLayout
      title={pageData.title}
      subtitle={pageData.subtitle}
      location={location}
    >
      <Seo
        title={pageData.seo?.title || pageData.title}
        description={pageData.seo?.description || pageData.subtitle}
      />
      <Tabs titles={tabTitles}></Tabs>
      {pageData.textSections.map(textSection => {
        const id = generateIdFromTitle(textSection.title)
        return (
          <BaseSection id={id} key={id}>
            <SideBySide title={textSection.title}>
              <div
                dangerouslySetInnerHTML={{
                  __html: textSection.content.html,
                }}
              ></div>
            </SideBySide>
          </BaseSection>
        )
      })}
      <BaseSection id={teamSectionId}>
        <SideBySide title={pageData.teamSection.title} isWide>
          <Team groups={pageData.teamSection.groups} />
        </SideBySide>
      </BaseSection>
      <div id={herbertSimonSectionId}>
        <Image fluid={herbertImage} alt={pageData.herbertSimonSection.title} />
      </div>
      <BaseSection id="herbert-simon">
        <SideBySide title={pageData.herbertSimonSection.title} elevateTitle>
          <div
            dangerouslySetInnerHTML={{
              __html: toHTML(pageData.herbertSimonSection.content),
            }}
          ></div>
        </SideBySide>
      </BaseSection>
    </PageLayout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/custom-page/about.md/" } }
    ) {
      nodes {
        frontmatter {
          seo {
            title
            description
          }
          title
          subtitle
          textSections {
            title
            content {
              html
            }
          }
          teamSection {
            title
            groups {
              name
              title
            }
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
