import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";

import { toHTML } from "../utils"

import PageLayout from "../components/page-layout"
import BaseSection from "../components/sections/base"
import SideBySide from "../components/sections/side-by-side"
import Tabs from "../components/tabs"
import SEO from "../components/seo"

import { generateIdFromTitle } from "../utils"

const SubpageTemplate = ({ data, location }) => {
  const pageData = data.markdownRemark.frontmatter
  const mobileFeaturedImage = pageData.featuredImage?.mobile?.fluid
  const desktopFeaturedImage = pageData.featuredImage?.desktop?.fluid
  const seoFeaturedImage = pageData.featuredImage?.seo?.resize

  const sources = [
    mobileFeaturedImage,
    {
      ...desktopFeaturedImage,
      media: `(min-width: 768px)`,
    },
  ]

  return (
    <PageLayout
      title={pageData.header.title}
      subtitle={pageData.header.subtitle}
      location={location}
    >
      <SEO
        title={pageData.seo.title || pageData.header.title}
        description={pageData.seo.description || pageData.header.subtitle}
        image={seoFeaturedImage}
      />
      {desktopFeaturedImage && (
        <GatsbyImage image={sources} alt={`${pageData.title} featured image`} />
      )}
      <Tabs titles={pageData.textSections.map(section => section.title)}></Tabs>
      {pageData.textSections.map(textSection => {
        const id = generateIdFromTitle(textSection.title)
        return (
          <BaseSection id={id} key={id}>
            <SideBySide title={textSection.title}>
              <div
                dangerouslySetInnerHTML={{
                  __html: toHTML(textSection.content),
                }}
              ></div>
            </SideBySide>
          </BaseSection>
        )
      })}
    </PageLayout>
  );
}

export default SubpageTemplate

export const pageQuery = graphql`query subpageBySlug($id: String!) {
  markdownRemark(id: {eq: $id}) {
    id
    frontmatter {
      title
      description
      seo {
        title
        description
      }
      header {
        title
        subtitle
      }
      featuredImage {
        desktop: childImageSharp {
          gatsbyImageData(
            transformOptions: {fit: COVER, cropFocus: CENTER}
            layout: FULL_WIDTH
          )
        }
        mobile: childImageSharp {
          fluid(maxWidth: 768, maxHeight: 600, fit: COVER, cropFocus: CENTER) {
            ...GatsbyImageSharpFluid
          }
        }
        seo: childImageSharp {
          resize(width: 1200) {
            src
            height
            width
          }
        }
      }
      textSections {
        content
        title
      }
    }
  }
}
`
