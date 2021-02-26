import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

import PageLayout from "../components/page-layout"
import BaseSection from "../components/sections/base"
// import SEO from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  // const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const featuredImage = post.frontmatter.featuredImage?.childImageSharp?.fluid

  return (
    <PageLayout
      location={location}
      title={post.frontmatter.title}
      subtitle={post.frontmatter.date}
    >
      {/* <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      /> */}
      {featuredImage && <Image fluid={featuredImage} />}
      <BaseSection className="narrow">
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
        </article>
      </BaseSection>
      <hr />
      <BaseSection>
        <nav className="blog-post-nav">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </BaseSection>
    </PageLayout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
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
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
