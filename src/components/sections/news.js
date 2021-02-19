import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import ThreeCards from "./three-cards"

const News = () => {
  const blogPostsData = useStaticQuery(graphql`
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

  return (
    <ThreeCards
      cardsData={blogPostsData.allMarkdownRemark.nodes}
      sectionTitle="Our latest news"
      seeMoreLink="/blog"
    ></ThreeCards>
  )
}

export default News
