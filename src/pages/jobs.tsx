import React from "react"
import { graphql, PageProps } from "gatsby"

import PageLayout from "../components/page-layout"
import Seo from "../components/seo"
import BaseSection from "../components/sections/BaseSection"
import { generateIdFromTitle, toHTML } from "../utils"
import ArrowedLink from "../components/arrowed-link"
import styled from "styled-components"

interface JobsPageProps extends PageProps {
  data: {
    jobsPage: {
      nodes: {
        frontmatter: {
          seo: {
            title: string
            description: string
          }
          title: string
          openPositionsSection: {
            title: string
            noOpenPositionsPlaceholder: string
            seeDetailsLinkText: string
          }
        }
      }[]
    }
    jobs: {
      totalCount: number
      nodes: {
        fields: {
          slug: string
        }
        frontmatter: {
          title: string
          teaserText: string
        }
      }[]
    }
  }
}

const JobsPage = ({ data, location }: JobsPageProps) => {
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
        <BaseSection className="narrow" id="intro">
          <Intro
            dangerouslySetInnerHTML={{
              __html: toHTML(pageData.intro),
            }}
          ></Intro>
        </BaseSection>
        <BaseSection
          className="narrow"
          noTopPadding
          id={generateIdFromTitle(pageData.openPositionsSection.title)}
        >
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

const Intro = styled.div`
  font-size: var(--fontSize-3);
`
