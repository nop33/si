import React from "react"
import { graphql } from "gatsby"

import PageLayout from "../components/page-layout"
import Seo from "../components/seo"
import FeaturedTagsList from "../components/FeaturedTagsList"
import BaseSection from "../components/sections/BaseSection"
import Card from "../components/card"
import Grid from "../components/sections/grid"
import { updateSrcSet } from "../utils"

const ProjectsGroupTemplate = ({ pageContext, data, location }) => {
  const { nodes, totalCount } = data.allMarkdownRemark
  const tags = data.tagsGroup.group.map(tag => tag.fieldValue)

  return (
    <div>
      <PageLayout
        title={pageContext.tag}
        subtitle={`${totalCount} post${totalCount === 1 ? "" : "s"}`}
        location={location}
      >
        <Seo title={`${pageContext.tag} posts`} />
        <FeaturedTagsList type="projectCategories" tags={tags} />
        <BaseSection>
          <Grid>
            {nodes.map(project => {
              const projectImage =
                project.frontmatter?.featuredImage?.childImageSharp?.fluid
              if (projectImage) {
                projectImage.srcSet = updateSrcSet(projectImage?.srcSet, 750)
              }

              return (
                <Card
                  key={`project_page_card_${project.fields.slug}`}
                  url={project.fields.slug}
                  image={projectImage}
                  title={
                    project.frontmatter.card?.title || project.frontmatter.title
                  }
                  subtitle={project.frontmatter.date}
                  content={project.frontmatter.description || project.excerpt}
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
  query projectByCategory($tag: String) {
    allMarkdownRemark(
      filter: {
        fields: { contentType: { eq: "blog" } }
        frontmatter: { category: { in: [$tag] } }
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
          date(formatString: "MMMM DD, YYYY")
          title
          category
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
      group(field: { frontmatter: { category: SELECT } }) {
        fieldValue
      }
    }
  }
`
