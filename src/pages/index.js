import React from "react"
import { graphql } from "gatsby"

import { constructProjectCategoryUrl, updateSrcSet } from "../utils"

import PageLayout from "../components/page-layout"
import SEO from "../components/seo"
import BaseSection from "../components/sections/base"
import KeyfactsSection from "../components/sections/keyfacts"
import Keyfact from "../components/keyfact"
import CardsWithText from "../components/sections/cards-with-text"
import Card from "../components/card"
import CardsSection from "../components/sections/cards"

const Home = ({ data, location }) => {
  const pageData = data.homepage.nodes[0].frontmatter
  const news = data.news.nodes
  const events = data.events.nodes
  const allProjects = data.projects.nodes

  return (
    <div>
      <PageLayout
        title={pageData.title}
        subtitle={pageData.subtitle}
        location={location}
        withImageBackgroundHeader={pageData.hasImageBackgroundHeader}
      >
        <SEO
          title={pageData.seo?.title || pageData.title}
          description={pageData.seo?.description || pageData.subtitle}
        />
        <BaseSection>
          <KeyfactsSection>
            {pageData.keyfactsSection.map(keyfact => {
              return (
                <Keyfact
                  title={keyfact.title}
                  content={keyfact.description}
                  link={keyfact.link}
                  key={`keyfact_${keyfact.title}`}
                />
              )
            })}
          </KeyfactsSection>
        </BaseSection>

        <hr></hr>

        <BaseSection>
          <div className="blog-posts-section">
            <CardsSection
              title={pageData.postsSection.newsSection.title}
              link={pageData.postsSection.newsSection.link}
              numberOfColumns={2}
            >
              {news.map(post => {
                const postImage =
                  post.frontmatter?.featuredImage?.childImageSharp?.fluid
                if (postImage) {
                  postImage.srcSet = updateSrcSet(postImage?.srcSet, 750)
                }
                return (
                  <Card
                    key={`news_card_${post.fields.slug}`}
                    url={post.fields.slug}
                    image={postImage}
                    title={post.frontmatter.title}
                    subtitle={post.frontmatter.date}
                    content={post.frontmatter.description || post.excerpt}
                  />
                )
              })}
            </CardsSection>
            <CardsSection
              title={pageData.postsSection.eventsSection.title}
              link={pageData.postsSection.eventsSection.link}
              numberOfColumns={1}
              fixAlignment
            >
              {events.map(post => {
                const postImage =
                  post.frontmatter?.featuredImage?.childImageSharp?.fluid
                if (postImage) {
                  postImage.srcSet = updateSrcSet(postImage?.srcSet, 750)
                }
                return (
                  <Card
                    key={`events_card_${post.fields.slug}`}
                    url={post.fields.slug}
                    image={postImage}
                    title={post.frontmatter.title}
                    subtitle={post.frontmatter.date}
                    content={post.frontmatter.description || post.excerpt}
                  />
                )
              })}
            </CardsSection>
          </div>
        </BaseSection>
      </PageLayout>
    </div>
  )
}

export default Home

export const pageQuery = graphql`
  query {
    homepage: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/custom-page/home.md/" } }
    ) {
      nodes {
        frontmatter {
          seo {
            title
            description
          }
          title
          hasImageBackgroundHeader
          subtitle
          keyfactsSection {
            title
            description
            link {
              title
              url
            }
          }
          featuredProjectsSection {
            title
            projectsByCategory {
              category
              title
              description
              orientation
            }
          }
          postsSection {
            newsSection {
              title
              link {
                title
                url
              }
            }
            eventsSection {
              title
              link {
                title
                url
              }
            }
          }
        }
      }
    }
    projects: allMarkdownRemark(
      filter: {
        fields: { contentType: { eq: "project" } }
        frontmatter: { isFeaturedOnHomepage: { eq: true } }
      }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          subtitle
          card {
            title
            description
          }
          category
          tags
          featuredImage {
            childImageSharp {
              fluid(
                maxWidth: 500
                maxHeight: 290
                fit: COVER
                cropFocus: CENTER
              ) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    news: allMarkdownRemark(
      limit: 2
      filter: {
        fields: { contentType: { eq: "blog" } }
        frontmatter: { tags: { nin: "Updates" } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 500, maxHeight: 290) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    events: allMarkdownRemark(
      limit: 1
      filter: {
        fields: { contentType: { eq: "blog" } }
        frontmatter: {
          tags: { in: "Updates" }
          isEventFeaturedOnHomepage: { eq: true }
        }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 500, maxHeight: 290) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
