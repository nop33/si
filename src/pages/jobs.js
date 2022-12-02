import React from "react"
import { graphql } from "gatsby"

import PageLayout from "../components/page-layout"
import Seo from "../components/seo"
import BaseSection from "../components/sections/base"
import { toHTML } from "../utils"
import { textContent } from "../components/sections/cards-with-text.module.scss"
import ArrowedLink from "../components/arrowed-link"

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
        <BaseSection className="narrow">
          <div
            className={textContent}
            dangerouslySetInnerHTML={{
              __html: toHTML(pageData.intro),
            }}
          ></div>
        </BaseSection>
        <BaseSection className="narrow" noTopPadding>
          <h2>{pageData.openPositionsSection.title}</h2>
          {jobs.length > 0
            ? jobs.map((job, index) => (
                <div key={`${job.frontmatter.title}-${index}`}>
                  <h3>{job.frontmatter.title}</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: toHTML(job.frontmatter.teaserText),
                    }}
                  ></div>
                  <ArrowedLink
                    direction="right"
                    to={job.fields.slug}
                    text={pageData.openPositionsSection.seeDetailsLinkText}
                  />
                </div>
              ))
            : pageData.openPositionsSection.noOpenPositionsPlaceholder}
        </BaseSection>
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
          openPositionsSection {
            title
            noOpenPositionsPlaceholder
            seeDetailsLinkText
          }
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
