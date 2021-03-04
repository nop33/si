import React from "react"
import { graphql } from "gatsby"

import PageLayout from "../components/page-layout"
import Grid from "../components/sections/grid"
import BaseSection from "../components/sections/base"
import FeaturedTagsList from "../components/featured-tags-list"
import Card from "../components/card"
import SEO from "../components/seo"

const BlogTagTemplate = ({ pageContext, data, location }) => {
  const { nodes, totalCount } = data.allMarkdownRemark
  const tags = data.site.siteMetadata?.featuredTags

  return (
    <div>
      <PageLayout
        title={`#${pageContext.tag}`}
        subtitle={`${totalCount} post${totalCount === 1 ? "" : "s"}`}
        location={location}
      >
        <SEO title={`${pageContext.tag} posts`} />
        <FeaturedTagsList tags={tags} />
        <BaseSection>
          <Grid>
            {nodes.map(post => {
              return (
                <Card
                  key={post.fields.slug}
                  url={post.fields.slug}
                  image={post.frontmatter.featuredImage.childImageSharp.fluid}
                  title={post.frontmatter.title}
                  subtitle={post.frontmatter.date}
                  content={post.frontmatter.description || post.excerpt}
                />
              )
            })}
          </Grid>
        </BaseSection>
      </PageLayout>
    </div>
  )
}

export default BlogTagTemplate

export const pageQuery = graphql`
  query subpageByTag($tag: String) {
    site {
      siteMetadata {
        title
        featuredTags
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
              fluid(maxWidth: 500, maxHeight: 290) {
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
