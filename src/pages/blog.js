import React from "react"
import { graphql } from "gatsby"

import PageLayout from "../components/page-layout"
import Grid from "../components/sections/grid"
import Card from "../components/card"
import FeaturedTagsList from "../components/featured-tags-list"
import BaseSection from "../components/sections/base"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const pageData = data.blogPage.nodes[0].frontmatter
  const { nodes, totalCount } = data.posts
  const tags = data.site.siteMetadata?.featuredTags

  return (
    <div>
      <PageLayout
        title={pageData.header.title}
        subtitle={`${totalCount} post${totalCount === 1 ? "" : "s"}`}
        location={location}
      >
        <SEO
          title={pageData.seo.title || pageData.header.title}
          description={pageData.seo.description}
        />
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

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        featuredTags
      }
    }
    blogPage: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/custom-page/blog.md/" } }
    ) {
      nodes {
        frontmatter {
          seo {
            title
            description
          }
          header {
            title
          }
        }
      }
    }
    posts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "blog" } } }
      sort: { fields: [frontmatter___date], order: ASC }
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
