import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import ThreeCards from "./three-cards"

const News = () => {
  const projectsData = useStaticQuery(graphql`
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

  return (
    <ThreeCards
      cardsData={projectsData.allMarkdownRemark.nodes}
      sectionTitle="Our projects"
      seeMoreLink="/projects"
    ></ThreeCards>
  )
}

export default News
