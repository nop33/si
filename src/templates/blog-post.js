import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import PageLayout from "../components/page-layout"
import BaseSection from "../components/sections/base"
import ArrowedLink from "../components/arrowed-link"
import TagsList from "../components/tags-list"
// import SEO from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  // const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const featuredImage = post.frontmatter.featuredImage?.childImageSharp?.fluid
  const tags = post.frontmatter?.tags

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
      {featuredImage && (
        <Image
          fluid={featuredImage}
          alt={`${post.frontmatter.title} featured image`}
        />
      )}
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
        {tags && <TagsList tags={tags} />}
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
                <ArrowedLink
                  to={previous.fields.slug}
                  rel="prev"
                  direction="left"
                >
                  {previous.frontmatter.title}
                </ArrowedLink>
              )}
            </li>
            <li>
              {next && (
                <ArrowedLink to={next.fields.slug} rel="next" direction="right">
                  {next.frontmatter.title}
                </ArrowedLink>
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
        tags
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
