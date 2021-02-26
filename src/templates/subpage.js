import React from "react"
import { graphql } from "gatsby"
import remark from "remark"
import remarkHTML from "remark-html"
import Image from "gatsby-image"

import PageLayout from "../components/page-layout"
import BaseSection from "../components/sections/base"
import SideBySide from "../components/sections/side-by-side"
import Tabs from "../components/tabs"

import { generateIdFromTitle } from "../utils"

const SubpageTemplate = ({ data, location }) => {
  const pageData = data.markdownRemark.frontmatter
  const toHTML = value => remark().use(remarkHTML).processSync(value).toString()
  const featuredImage = pageData.featuredImage?.childImageSharp?.fluid

  return (
    <div>
      <PageLayout title={pageData.title} location={location}>
        {featuredImage && <Image fluid={featuredImage} />}
        <Tabs
          titles={pageData.textSections.map(section => section.title)}
        ></Tabs>
        {pageData.textSections.map(textSection => {
          const id = generateIdFromTitle(textSection.title)
          return (
            <BaseSection id={id} key={id}>
              {/* <SideBySide>
                {featuredImage && <Image fluid={featuredImage} />}
              </SideBySide> */}

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
      </PageLayout>
    </div>
  )
}

export default SubpageTemplate

export const pageQuery = graphql`
  query subpageBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            fluid(
              maxWidth: 1920
              maxHeight: 600
              fit: COVER
              cropFocus: CENTER
            ) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        textSections {
          content
          title
        }
      }
    }
  }
`
