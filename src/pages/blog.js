import React from "react"
import { graphql, Link } from "gatsby"

import { updateSrcSet } from "../utils"

import PageLayout from "../components/page-layout"
import Seo from "../components/seo"
import FeaturedTagsList from "../components/featured-tags-list"
import BaseSection from "../components/sections/base"
import Card from "../components/card"
import Grid from "../components/sections/grid"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRssSquare } from "@fortawesome/free-solid-svg-icons"

import featuredTags from "../content/_configuration/featured-tags.yaml"

const BlogIndex = ({ data, location }) => {
  const pageData = data.blogPage.nodes[0].frontmatter
  const { nodes, totalCount } = data.posts

  const subtitle = (
    <div>
      <div style={{ marginBottom: "var(--spacing-2" }}>{`${totalCount} post${
        totalCount === 1 ? "" : "s"
      }`}</div>
      <Link className="golden" to="/rss.xml">
        <FontAwesomeIcon icon={faRssSquare} size="lg" />
      </Link>
    </div>
  )

  return (
    <div>
      <PageLayout
        title={pageData.title}
        location={location}
        subtitle={subtitle}
      >
        <Seo
          title={pageData.seo?.title || pageData.title}
          description={pageData.seo?.description}
        />
        <FeaturedTagsList isBlogTags tags={featuredTags.blogTags} />
        <BaseSection>
          <Grid>
            {nodes.map(post => {
              const postImage =
                post.frontmatter?.featuredImage?.childImageSharp?.fluid
              if (postImage) {
                postImage.srcSet = updateSrcSet(postImage.srcSet, 750)
              }
              return (
                <Card
                  key={`card_${post.fields.slug}`}
                  url={post.fields.slug}
                  image={postImage}
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
      filter: {
        fields: { contentType: { eq: "blog" } }
        frontmatter: { hide: { ne: true } }
      }
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
