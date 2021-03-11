import React from "react"
import { graphql } from "gatsby"

import PageLayout from "../components/page-layout"
import SEO from "../components/seo"
import FeaturedTagsList from "../components/featured-tags-list"
import BaseSection from "../components/sections/base"
import CardsWithText from "../components/sections/cards-with-text"
import Card from "../components/card"

const ProjectsPage = ({ data, location }) => {
  const pageData = data.projectsPage.nodes[0].frontmatter
  const { nodes, totalCount } = data.projects
  const categories = data.tagsGroup.group.map(tag => tag.fieldValue)

  return (
    <div>
      <PageLayout
        title={pageData.header.title}
        subtitle={`${totalCount} project${totalCount === 1 ? "" : "s"}`}
        location={location}
      >
        <SEO
          title={pageData.seo.title || pageData.header.title}
          description={pageData.seo.description || pageData.header.subtitle}
        />
        <FeaturedTagsList isProjectCategories tags={categories} />
        {pageData.projectsByCategories.map(projectsByCategory => {
          const projects = nodes.filter(
            project =>
              project.frontmatter.category === projectsByCategory.category
          )
          const projectCards = projects.map(project => {
            return (
              <Card
                key={project.fields.slug}
                url={project.fields.slug}
                image={project.frontmatter.featuredImage.childImageSharp.fluid}
                title={
                  project.frontmatter.card.title ||
                  project.frontmatter.header.title
                }
                subtitle={project.frontmatter.tags.join(" / ")}
                content={
                  project.frontmatter.card.description ||
                  project.frontmatter.header.subtitle
                }
              />
            )
          })

          return (
            <BaseSection>
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
          header {
            title
            subtitle
          }
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
          header {
            title
            subtitle
          }
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
