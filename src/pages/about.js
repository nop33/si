import React from "react"
import { graphql } from "gatsby"

import Image from "gatsby-image"

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
  const sponsorsSectionId = generateIdFromTitle(pageData.sponsorsSection.title)

  const tabTitles = [
    pageData.introSection.title,
    ...pageData.textSections.map(section => section.title),
    pageData.teamSection.title,
    pageData.herbertSimonSection.title,
    pageData.sponsorsSection.title,
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
        <Image
          fluid={pageData.herbertSimonSection.photo.childImageSharp.fluid}
          alt={pageData.herbertSimonSection.title}
        />
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
      <BaseSection id={sponsorsSectionId}>
        <SideBySide title={pageData.sponsorsSection.title}>
          {pageData.sponsorsSection.sponsors.map(sponsor => {
            return (
              <Image
                fixed={sponsor.logo.childImageSharp.fixed}
                alt={sponsor.title}
                key={sponsor.title}
              />
            )
          })}
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
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          sponsorsSection {
            title
            sponsors {
              title
              logo {
                childImageSharp {
                  fixed(width: 250, quality: 95, grayscale: true) {
                    ...GatsbyImageSharpFixed_noBase64
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
