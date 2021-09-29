import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import { updateSrcSet } from "../utils"

import Authors from "../components/authors"
import PageLayout from "../components/page-layout"
import BaseSection from "../components/sections/base"
import ArrowedLink from "../components/arrowed-link"
import TagsList from "../components/tags-list"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const { previous, next } = data
  const mobileFeaturedImage = post.frontmatter.featuredImage?.mobile?.fluid
  const desktopFeaturedImage = post.frontmatter.featuredImage?.desktop?.fluid
  const seoFeaturedImage = post.frontmatter.featuredImage?.seo?.resize
  const authors = post.frontmatter.authors

  if (desktopFeaturedImage) {
    desktopFeaturedImage.srcSet = updateSrcSet(
      desktopFeaturedImage.srcSet,
      1920
    )
  }
  const sources = [
    mobileFeaturedImage,
    {
      ...desktopFeaturedImage,
      media: `(min-width: 768px)`,
    },
  ]
  const tags = post.frontmatter?.tags

  const subtitle = (
    <div>
      <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
      <span> · </span>
      <span>{post.fields.readingTime.text}</span>
      {authors && <Authors authors={authors} />}
    </div>
  )

  return (
    <PageLayout
      location={location}
      title={post.frontmatter.title}
      subtitle={subtitle}
    >
      <SEO
        title={post.frontmatter.seo?.title || post.frontmatter.title}
        description={
          post.frontmatter.seo?.description ||
          post.frontmatter.description ||
          post.excerpt
        }
        image={seoFeaturedImage}
      />
      {desktopFeaturedImage && (
        <Image
          fluid={sources}
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
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        readingTime {
          text
        }
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        authors {
          name
          page
          externalLink
          externalName
        }
        seo {
          title
          description
        }
        featuredImage {
          desktop: childImageSharp {
            fluid(
              maxWidth: 1920
              maxHeight: 600
              fit: COVER
              cropFocus: CENTER
            ) {
              ...GatsbyImageSharpFluid
            }
          }
          mobile: childImageSharp {
            fluid(
              maxWidth: 768
              maxHeight: 600
              fit: COVER
              cropFocus: CENTER
            ) {
              ...GatsbyImageSharpFluid
            }
          }
          seo: childImageSharp {
            resize(width: 1200) {
              src
              height
              width
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
