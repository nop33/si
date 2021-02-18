import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
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

          return (
            <Card key={project.fields.slug}>
              <article itemScope itemType="http://schema.org/Article">
                <header>
                  <h3>
                    <Link to={project.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
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
