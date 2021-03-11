import React from "react"
import { graphql } from "gatsby"

import PageLayout from "../components/page-layout"
import BaseSection from "../components/sections/base"
import Person from "../components/person"
import SocialLinks from "../components/social-links"
import SEO from "../components/seo"

const MemberTemplate = ({ data, location }) => {
  const personData = data.markdownRemark.frontmatter
  const content = data.markdownRemark.html
  const excerpt = data.markdownRemark.excerpt
  const desktopImage = personData.photo.desktop.fixed
  const mobileImage = personData.photo.mobile.fixed
  const sources = [
    mobileImage,
    {
      ...desktopImage,
      media: `(min-width: 768px)`,
    },
  ]

  const header = (
    <div>
      <Person photo={sources} name={personData.name} />
      {(personData.links.website ||
        personData.links.twitter ||
        personData.links.linkedin) && (
        <SocialLinks
          centered
          wide
          bottomSpacing
          website={personData.links.website}
          twitter={personData.links.twitter}
          linkedin={personData.links.linkedin}
        />
      )}
    </div>
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

export const pageQuery = graphql`query memberBySlug($id: String!) {
  markdownRemark(id: {eq: $id}) {
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
        desktop: childImageSharp {
          gatsbyImageData(width: 250, height: 250, layout: FIXED)
        }
        mobile: childImageSharp {
          fixed(width: 150, height: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      links {
        website
        twitter
        linkedin
      }
    }
  }
}
`
