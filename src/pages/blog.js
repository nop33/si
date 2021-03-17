import React from "react"
import { graphql } from "gatsby"

import PageLayout from "../components/page-layout"
import SEO from "../components/seo"
import FeaturedTagsList from "../components/featured-tags-list"
import BaseSection from "../components/sections/base"
import Grid from "../components/sections/grid"
import Card from "../components/card"

import featuredTags from "../content/_configuration/featured-tags.yaml"

const BlogIndex = ({ data, location }) => {
  const pageData = data.blogPage.nodes[0].frontmatter
  const { nodes, totalCount } = data.posts

  return (
    <div>
      <PageLayout
        title={pageData.title}
        subtitle={`${totalCount} post${totalCount === 1 ? "" : "s"}`}
        location={location}
      >
        <SEO
          title={pageData.seo?.title || pageData.title}
          description={pageData.seo?.description}
        />
        <FeaturedTagsList isBlogTags tags={featuredTags.blogTags} />
        <BaseSection>
          <Grid>
            {nodes.map(post => {
              return (
                <Card
                  key={`card_${post.fields.slug}`}
                  url={post.fields.slug}
                  image={post.frontmatter?.featuredImage?.childImageSharp.fluid}
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
    blogPage: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/custom-page/blog.md/" } }
    ) {
      nodes {
        frontmatter {
          seo {
            title
            description
          }
          title
          subtitle
        }
      }
    }
    posts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "blog" } } }
      sort: { fields: [frontmatter___date], order: DESC }
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
  }
`
