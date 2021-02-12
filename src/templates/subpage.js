import React from "react"
import { graphql } from "gatsby"
import remark from "remark"
import remarkHTML from "remark-html"

import PageLayout from "../components/page-layout"
import BaseSection from "../components/base-section"
import SideBySide from "../components/sections/side-by-side"
import Tabs from "../components/tabs"

import { generateIdFromTitle } from "../utils"

const SubpageTemplate = ({ data, location }) => {
  const pageData = data.markdownRemark.frontmatter
  const toHTML = value => remark().use(remarkHTML).processSync(value).toString()

  return (
    <div>
      <PageLayout title={pageData.title} location={location}>
        <Tabs sections={pageData.textSections}></Tabs>
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
        textSections {
          content
          title
        }
      }
    }
  }
`
