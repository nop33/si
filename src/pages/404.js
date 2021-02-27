import React from "react"
import { graphql } from "gatsby"

import PageLayout from "../components/page-layout"
import BaseSection from "../components/sections/base"
import SEO from "../components/seo"
import ArrowedLink from "../components/arrowed-link"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <PageLayout location={location} title="404: Not Found" subtitle={siteTitle}>
      <SEO title="404: Not Found" />
      <BaseSection>
        <p>You just hit a route that does not exist... the sadness.</p>
        <ArrowedLink direction="left" to="/">
          Back to the home page
        </ArrowedLink>
      </BaseSection>
    </PageLayout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
