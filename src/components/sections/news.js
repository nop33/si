import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
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

          return (
            <Card key={post.fields.slug}>
              <article itemScope itemType="http://schema.org/Article">
                <header>
                  <h3>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
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
