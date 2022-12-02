import React from "react"
import { graphql } from "gatsby"

import PageLayout from "../components/page-layout"
import Seo from "../components/seo"
import BaseSection from "../components/sections/base"
import Card from "../components/card"
import CardsWithText from "../components/sections/cards-with-text"
import { updateSrcSet } from "../utils"

const JobsPage = ({ data, location }) => {
  const pageData = data.jobsPage.nodes[0].frontmatter
  const { nodes: jobs, totalCount } = data.jobs

  return (
    <div>
      <PageLayout
        title={pageData.title}
        subtitle={`${totalCount} open position${totalCount === 1 ? "" : "s"}`}
        location={location}
      >
        <Seo
          title={pageData.seo?.title || pageData.title}
          description={pageData.seo?.description}
        />
        <div>{pageData.intro}</div>
        {jobs.map(job => {
          return (
            <div>
              <h2>{job.title}</h2>
            </div>
          )
        })}
      </PageLayout>
    </div>
  )
}

export default JobsPage

export const pageQuery = graphql`
  query {
    jobsPage: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/custom-page/jobs.md/" } }
    ) {
      nodes {
        frontmatter {
          seo {
            title
            description
          }
          title
          intro
        }
      }
    }
    jobs: allMarkdownRemark(
      filter: {
        fields: { contentType: { eq: "job" } }
        frontmatter: { hide: { ne: true } }
      }
    ) {
      totalCount
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          teaserText
        }
      }
    }
  }
`
