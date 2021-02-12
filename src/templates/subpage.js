import React from "react"
import { graphql } from "gatsby"
import remark from "remark"
import remarkHTML from "remark-html"

import SubpageLayout from "../components/subpage-layout"
import BaseSection from "../components/base-section"
import SideBySide from "../components/sections/side-by-side"

const SubpageTemplate = ({ data }) => {
  const pageData = data.markdownRemark.frontmatter
  const toHTML = value => remark().use(remarkHTML).processSync(value).toString()

  return (
    <div>
      <SubpageLayout title={pageData.title}>
        {pageData.textSections.map(textSection => {
          return (
            <BaseSection>
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
      </SubpageLayout>
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
        textSections {
          content
          title
        }
      }
    }
  }
`
