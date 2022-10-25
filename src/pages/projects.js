import React from "react"
import { graphql } from "gatsby"

import PageLayout from "../components/page-layout"
import Seo from "../components/seo"
import FeaturedTagsList from "../components/featured-tags-list"
import BaseSection from "../components/sections/base"
import Card from "../components/card"
import CardsWithText from "../components/sections/cards-with-text"
import { updateSrcSet } from "../utils"

const ProjectsPage = ({ data, location }) => {
  const pageData = data.projectsPage.nodes[0].frontmatter
  const { nodes, totalCount } = data.projects
  const categories = data.tagsGroup.group.map(tag => tag.fieldValue)

  return (
    <div>
      <PageLayout
        title={pageData.title}
        subtitle={`${totalCount} project${totalCount === 1 ? "" : "s"}`}
        location={location}
      >
        <Seo
          title={pageData.seo?.title || pageData.title}
          description={pageData.seo?.description || pageData.subtitle}
        />
        <FeaturedTagsList isProjectCategories tags={categories} />
        {pageData.projectsByCategories.map(projectsByCategory => {
          const projects = nodes.filter(
            project =>
              project.frontmatter.category === projectsByCategory.category
          )
          const projectCards = projects.map(project => {
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
                subtitle={project.frontmatter.tags?.join(" / ")}
                content={
                  project.frontmatter.card?.description ||
                  project.frontmatter.subtitle
                }
              />
            )
          })

          return (
            <BaseSection key={`section_${projectsByCategory.title}`}>
              <CardsWithText
                orientation="cards-full-width"
                title={projectsByCategory.title}
                description={projectsByCategory.description}
                cards={projectCards}
                headingWeight={2}
              />
            </BaseSection>
          )
        })}
      </PageLayout>
    </div>
  )
}

export default ProjectsPage

export const pageQuery = graphql`
  query {
    projectsPage: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/custom-page/projects.md/" } }
    ) {
      nodes {
        frontmatter {
          seo {
            title
            description
          }
          title
          subtitle
          projectsByCategories {
            category
            title
            description
          }
        }
      }
    }
    projects: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "project" } } }
    ) {
      totalCount
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          subtitle
          card {
            title
            description
          }
          category
          tags
          featuredImage {
            childImageSharp {
              fluid(
                maxWidth: 500
                maxHeight: 290
                fit: COVER
                cropFocus: CENTER
              ) {
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
      group(field: frontmatter___category) {
        fieldValue
      }
    }
  }
`
