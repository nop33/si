import React from "react"
import { graphql } from "gatsby"

import { GatsbyImage } from "gatsby-plugin-image";

import { toHTML } from "../utils"

import PageLayout from "../components/page-layout"
import BaseSection from "../components/sections/base"
import SideBySide from "../components/sections/side-by-side"
import Tabs from "../components/tabs"
import Team from "../components/team"
import SEO from "../components/seo"

import { generateIdFromTitle } from "../utils"

const AboutPage = ({ data, location }) => {
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
    <PageLayout
      title={pageData.header.title}
      subtitle={pageData.header.subtitle}
      location={location}
    >
      <SEO
        title={pageData.seo.title || pageData.header.title}
        description={pageData.seo.description || pageData.header.subtitle}
      />
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
        <SideBySide title={pageData.teamSection.title} isWide>
          <Team />
        </SideBySide>
      </BaseSection>
      <div id={herbertSimonSectionId}>
        <GatsbyImage
          image={pageData.herbertSimonSection.photo.childImageSharp.gatsbyImageData}
          alt={pageData.herbertSimonSection.title} />
      </div>
      <BaseSection>
        <SideBySide title={pageData.herbertSimonSection.title} elevateTitle>
          <div
            dangerouslySetInnerHTML={{
              __html: toHTML(pageData.herbertSimonSection.content),
            }}
          ></div>
        </SideBySide>
      </BaseSection>
    </PageLayout>
  );
}

export default AboutPage

export const pageQuery = graphql`{
  allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/custom-page/about.md/"}}) {
    nodes {
      frontmatter {
        seo {
          title
          description
        }
        header {
          title
          subtitle
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
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  }
}
`
