import React from "react"
import { graphql } from "gatsby"

import PageLayout from "../components/page-layout"
import Grid from "../components/sections/grid"
import BaseSection from "../components/sections/base"
import FeaturedTagsList from "../components/featured-tags-list"
import Card from "../components/card"
import SEO from "../components/seo"

const ProjectsGroupTemplate = ({ pageContext, data, location }) => {
  const { nodes, totalCount } = data.allMarkdownRemark
  const tags = data.tagsGroup.group.map(tag => tag.fieldValue)

  return (
    <div>
      <PageLayout
        title={pageContext.tag}
        subtitle={`${totalCount} project${totalCount === 1 ? "" : "s"}`}
        location={location}
      >
        <SEO title={`${pageContext.tag} projects`} />
        <FeaturedTagsList isProjectTags tags={tags} />
        <BaseSection>
          <Grid>
            {nodes.map(project => {
              return (
                <Card
                  key={project.fields.slug}
                  url={project.fields.slug}
                  image={
                    project.frontmatter.featuredImage.childImageSharp.fluid
                  }
                  title={
                    project.frontmatter.card.title ||
                    project.frontmatter.header.title
                  }
                  subtitle={project.frontmatter.category}
                  content={
                    project.frontmatter.card.description ||
                    project.frontmatter.header.subtitle ||
                    project.excerpt
                  }
                />
              )
            })}
          </Grid>
        </BaseSection>
      </PageLayout>
    </div>
  )
}

export default ProjectsGroupTemplate

export const pageQuery = graphql`
  query projectByTag($tag: String) {
    site {
      siteMetadata {
        title
        featuredTags
      }
    }
    allMarkdownRemark(
      filter: {
        fields: { contentType: { eq: "project" } }
        frontmatter: { tags: { in: [$tag] } }
      }
      limit: 2000
    ) {
      totalCount
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          header {
            title
            subtitle
          }
          card {
            title
            description
          }
          category
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
      filter: { fields: { contentType: { eq: "project" } } }
      limit: 2000
    ) {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`