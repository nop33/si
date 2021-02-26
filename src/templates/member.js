import React from "react"
import { graphql } from "gatsby"

import PageLayout from "../components/page-layout"
import BaseSection from "../components/sections/base"
import Person from "../components/person"

const MemberTemplate = ({ data, location }) => {
  const personData = data.markdownRemark.frontmatter
  const content = data.markdownRemark.html

  const header = <Person photo={personData.photo.childImageSharp.fixed} />

  return (
    <div>
      <PageLayout
        title={personData.name}
        subtitle={personData.role}
        location={location}
        backLink="/about#our-team"
      >
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
    </div>
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
      frontmatter {
        name
        role
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
