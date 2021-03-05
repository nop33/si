import React from "react"
import { graphql } from "gatsby"

import { toHTML } from "../utils"

import PageLayout from "../components/page-layout"
import BaseSection from "../components/sections/base"
import SideBySide from "../components/sections/side-by-side"
import Tabs from "../components/tabs"
import ColumnsWithButtons from "../components/sections/columns-with-buttons"
import SEO from "../components/seo"

import { generateIdFromTitle } from "../utils"

const GetInvolvedPage = ({ data, location }) => {
  const pageData = data.allMarkdownRemark.nodes[0].frontmatter
  const workWithUsSectionId = generateIdFromTitle(
    pageData.workWithUsSection.title
  )
  const donateSectionId = generateIdFromTitle(pageData.donateSection.title)

  const tabTitles = [
    pageData.workWithUsSection.title,
    pageData.donateSection.title,
    ...pageData.textSections.map(section => section.title),
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
      />
      <Tabs titles={tabTitles}></Tabs>
      <BaseSection id={workWithUsSectionId}>
        <SideBySide title={pageData.workWithUsSection.title} isWide>
          <ColumnsWithButtons
            columnsData={pageData.workWithUsSection.columnsWithButtons}
          />
        </SideBySide>
      </BaseSection>
      <BaseSection id={donateSectionId}>
        <SideBySide title={pageData.donateSection.title} isWide>
          <div
            dangerouslySetInnerHTML={{
              __html: toHTML(pageData.donateSection.intro),
            }}
          ></div>
          <ColumnsWithButtons
            columnsData={pageData.donateSection.columnsWithButtons}
          />
        </SideBySide>
      </BaseSection>
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
  )
}

export default GetInvolvedPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/custom-page/get-involved.md/" } }
    ) {
      nodes {
        frontmatter {
          seo {
            title
            description
          }
          header {
            title
            subtitle
          }
          workWithUsSection {
            title
            columnsWithButtons {
              title
              content
              button {
                text
                url
              }
            }
          }
          donateSection {
            title
            intro
            columnsWithButtons {
              title
              content
              button {
                text
                url
              }
            }
          }
          textSections {
            title
            content
          }
        }
      }
    }
  }
`