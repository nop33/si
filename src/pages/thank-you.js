import React from "react"
import { graphql } from "gatsby"

import PageLayout from "../components/page-layout"
import BaseSection from "../components/sections/base"
import ArrowedLink from "../components/arrowed-link"

const ThankYouPage = ({ data, location }) => {
  const pageData = data.allMarkdownRemark.nodes[0].frontmatter

  return (
    <PageLayout
      title={pageData.header.title}
      subtitle={pageData.header.subtitle}
      location={location}
    >
      <BaseSection>
        <ArrowedLink direction="left" to="/">
          Back to the home page
        </ArrowedLink>
      </BaseSection>
    </PageLayout>
  )
}

export default ThankYouPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/custom-page/thank-you.md/" } }
    ) {
      nodes {
        frontmatter {
          header {
            title
            subtitle
          }
        }
      }
    }
  }
`
