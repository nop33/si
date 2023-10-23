import React from "react"
import { graphql } from "gatsby"

import PageLayout from "../components/page-layout"
import Seo from "../components/seo"
import BaseSection from "../components/sections/BaseSection"
import Card from "../components/card"
import CardsWithText from "../components/sections/cards-with-text"
import { constructProjectCategoryUrl, updateSrcSet } from "../utils"

const ProjectsPage = ({ data, location }) => {
  const pageData = data.projectsPage.nodes[0].frontmatter
  const { nodes } = data.projects

  return (
    <div>
      <PageLayout title={pageData.title} subtitle={""} location={location}>
        <Seo
          title={pageData.seo?.title || pageData.title}
          description={pageData.seo?.description || pageData.subtitle}
        />

        {pageData.projectsByCategories.map((projectsByCategory, index) => {
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
                subtitle={project.frontmatter.date}
                content={project.frontmatter.description || project.excerpt}
              />
            )
          })

          return (
            <>
              <BaseSection
                key={`section_${projectsByCategory.title}`}
                id={`section_${projectsByCategory.title}`}
              >
                <CardsWithText
                  orientation="cards-full-width"
                  title={projectsByCategory.title}
                  description={projectsByCategory.description}
                  cards={projectCards.slice(0, 3)}
                  headingWeight={2}
                  link={
                    projectCards.length > 3
                      ? {
                          url: constructProjectCategoryUrl(
                            projectsByCategory.category
                          ),
                          title: "See all",
                        }
                      : undefined
                  }
                />
              </BaseSection>

              {index + 1 < pageData.projectsByCategories.length && <hr></hr>}
            </>
          )
        })}
      </PageLayout>
    </div>
  )
}

export default ProjectsPage

export const pageQuery = graphql`
  {
    projectsPage: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/custom-page/our-work.md/" } }
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
      filter: {
        fields: { contentType: { eq: "blog" } }
        frontmatter: { category: { ne: "" } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
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
  }
`
