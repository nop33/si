import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import Card from "../card"

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        limit: 3
        filter: { fields: { contentType: { eq: "project" } } }
      ) {
        nodes {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            description
            area
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  `)

  const projects = data.allMarkdownRemark.nodes

  return (
    <div className="cards-section">
      <h2>Our Projects</h2>

      <div className="cards-wrapper">
        {projects.map(project => {
          const title = project.frontmatter.title || project.fields.slug
          const featuredImgFluid =
            project.frontmatter.featuredImage.childImageSharp.fluid

          return (
            <Card key={project.fields.slug}>
              <Link to={project.fields.slug} itemProp="url">
                <article itemScope itemType="http://schema.org/Article">
                  <Img fluid={featuredImgFluid} />
                  <header>
                    <h3>
                      <span itemProp="headline">{title}</span>
                    </h3>
                    <small>{project.frontmatter.area}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          project.frontmatter.description || project.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </Link>
            </Card>
          )
        })}
      </div>
      <Link className="see-more-link" to="/projects">
        See more
      </Link>
    </div>
  )
}

export default Projects
