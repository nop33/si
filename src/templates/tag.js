import React from "react"
import { graphql } from "gatsby"

import PageLayout from "../components/page-layout"
import Grid from "../components/sections/grid"
import BaseSection from "../components/sections/base"
import TagsList from "../components/tags-list"

const BlogTagTemplate = ({ pageContext, data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { nodes, totalCount } = data.allMarkdownRemark
  const tags = data.tagsGroup.group

  return (
    <div>
      <PageLayout
        title={`#${pageContext.tag}`}
        subtitle={`${totalCount} post${totalCount === 1 ? "" : "s"}`}
        location={location}
      >
        <TagsList tags={tags} />
        <BaseSection>
          <Grid posts={nodes} />
        </BaseSection>
      </PageLayout>
    </div>
  )
}

export default BlogTagTemplate

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {
        fields: { contentType: { eq: "blog" } }
        frontmatter: { tags: { in: [$tag] } }
      }
      sort: { fields: [frontmatter___date], order: ASC }
      limit: 2000
    ) {
      totalCount
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    tagsGroup: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "blog" } } }
      limit: 2000
    ) {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`
