import React from "react"
import { graphql } from "gatsby"

import PageLayout from "../components/page-layout"
import BaseSection from "../components/sections/base"
import Person from "../components/person"
import SEO from "../components/seo"

const MemberTemplate = ({ data, location }) => {
  const personData = data.markdownRemark.frontmatter
  const content = data.markdownRemark.html
  const excerpt = data.markdownRemark.excerpt

  const header = (
    <Person
      photo={personData.photo.childImageSharp.fixed}
      name={personData.name}
    />
  )

  return (
    <PageLayout
      title={personData.name}
      subtitle={personData.role}
      location={location}
      backLink="/about#our-team"
    >
      <SEO
        title={personData.seo.title || personData.name}
        description={personData.seo.description || excerpt}
      />
      <BaseSection className="narrow">
        <div>
          {header}
          <section
            dangerouslySetInnerHTML={{ __html: content }}
            itemProp="articleBody"
          />
        </div>
      </BaseSection>
    </PageLayout>
  )
}

export default MemberTemplate

export const pageQuery = graphql`
  query memberBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt(pruneLength: 160)
      frontmatter {
        name
        role
        seo {
          title
          description
        }
        photo {
          childImageSharp {
            fixed(width: 250, height: 250) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
