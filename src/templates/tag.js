import React from "react"
import { graphql } from "gatsby"

import PageLayout from "../components/page-layout"
import Seo from "../components/seo"
import FeaturedTagsList from "../components/FeaturedTagsList"
import BaseSection from "../components/sections/BaseSection"
import Card from "../components/card"
import Grid from "../components/sections/grid"

import featuredTags from "../content/_configuration/featured-tags.yaml"

const BlogTagTemplate = ({ pageContext, data, location }) => {
  const { nodes, totalCount } = data.allMarkdownRemark

  return (
    <div>
      <PageLayout
        title={`#${pageContext.tag}`}
        subtitle={`${totalCount} post${totalCount === 1 ? "" : "s"}`}
        location={location}
      >
        <Seo title={`${pageContext.tag} posts`} />
        <FeaturedTagsList type="blog" tags={featuredTags.blogTags} />
        <BaseSection>
          <Grid>
            {nodes.map(post => {
              return (
                <Card
                  key={`grid_card_${post.fields.slug}`}
                  url={post.fields.slug}
                  image={
                    post.frontmatter?.featuredImage?.childImageSharp?.fluid
                  }
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
    allMarkdownRemark(
      filter: {
        fields: { contentType: { eq: "blog" } }
        frontmatter: { tags: { in: [$tag] } }
      }
      sort: { frontmatter: { date: DESC } }
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
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
      }
    }
  }
`
