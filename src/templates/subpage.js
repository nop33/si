import React from "react"
import { graphql } from "gatsby"

import SubpageLayout from "../components/subpage-layout"

const SubpageTemplate = ({ data }) => {
  const subpage = data.markdownRemark

  return (
    <div>
      <SubpageLayout title={subpage.frontmatter.title}></SubpageLayout>
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
      }
    }
  }
`
