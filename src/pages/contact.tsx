import React from "react"
import { graphql } from "gatsby"

import { toHTML } from "../utils"

import PageLayout from "../components/page-layout"
import Seo from "../components/seo"
import BaseSection from "../components/sections/BaseSection"
import SideBySide from "../components/sections/SideBySide"
import Tabs from "../components/tabs"
import ColumnsWithButtons from "../components/sections/columns-with-buttons"
import ContactForm from "../components/contact-form"
import StayInTouch from "../components/stay-in-touch"

import { generateIdFromTitle } from "../utils"

const ContactPage = ({ data, location }) => {
  const pageData = data.allMarkdownRemark.nodes[0].frontmatter
  const workWithUsSectionId = generateIdFromTitle(
    pageData.workWithUsSection.title
  )
  const getInTouchSectionId = generateIdFromTitle(
    pageData.getInTouchSection.title
  )
  const stayInTouchSectionId = generateIdFromTitle(
    pageData.stayInTouchSection.title
  )

  const tabTitles = [
    pageData.workWithUsSection.title,
    pageData.getInTouchSection.title,
    pageData.stayInTouchSection.title,
    ...pageData.textSections.map(section => section.title),
  ]

  return (
    <PageLayout
      title={pageData.title}
      subtitle={pageData.subtitle}
      location={location}
    >
      <Seo
        title={pageData.seo?.title || pageData.title}
        description={pageData.seo?.description || pageData.subtitle}
      />
      <Tabs titles={tabTitles}></Tabs>
      <BaseSection id={workWithUsSectionId}>
        <SideBySide title={pageData.workWithUsSection.title} isWide>
          <ColumnsWithButtons
            data={pageData.workWithUsSection.columnsWithButtons}
          />
        </SideBySide>
      </BaseSection>
      <BaseSection id={getInTouchSectionId}>
        <SideBySide title={pageData.getInTouchSection.title}>
          <ContactForm intro={pageData.getInTouchSection.intro} />
        </SideBySide>
      </BaseSection>
      <BaseSection id={stayInTouchSectionId}>
        <SideBySide title={pageData.stayInTouchSection.title}>
          <StayInTouch
            newsletterTitle={pageData.stayInTouchSection.newsletter.title}
            newsletterIntro={pageData.stayInTouchSection.newsletter.intro}
            socialMediaTitle={pageData.stayInTouchSection.socialMedia.title}
            socialMediaIntro={pageData.stayInTouchSection.socialMedia.intro}
            twitterLink={pageData.stayInTouchSection.socialMedia.twitter}
            linkedInLink={pageData.stayInTouchSection.socialMedia.linkedIn}
          />
        </SideBySide>
      </BaseSection>
      {pageData.textSections.map(textSection => {
        const id = generateIdFromTitle(textSection.title)
        return (
          <BaseSection id={id} key={`section_${id}`}>
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

export default ContactPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/custom-page/contact.md/" } }
    ) {
      nodes {
        frontmatter {
          seo {
            title
            description
          }
          title
          subtitle
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
          getInTouchSection {
            title
            intro
          }
          stayInTouchSection {
            title
            newsletter {
              title
              intro
            }
            socialMedia {
              title
              intro
              twitter
              linkedIn
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
