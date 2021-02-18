import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import Card from "../card"

const News = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        limit: 3
        filter: { fields: { contentType: { eq: "blog" } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
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

  const posts = data.allMarkdownRemark.nodes

  return (
    <div className="cards-section">
      <h2>Our latest news</h2>

      <div className="cards-wrapper">
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const featuredImgFluid =
            post.frontmatter.featuredImage.childImageSharp.fluid

          return (
            <Card key={post.fields.slug}>
              <Link to={post.fields.slug}>
                <article itemScope itemType="http://schema.org/Article">
                  <Img fluid={featuredImgFluid} />
                  <header>
                    <h3>
                      <span itemProp="headline">{title}</span>
                    </h3>
                    <small>{post.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
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
      <Link className="see-more-link" to="/blog">
        See more
      </Link>
    </div>
  )
}

export default News
