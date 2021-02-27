import React from "react"
import { graphql } from "gatsby"

import Intro from "../components/sections/intro"
import ThreeColumns from "../components/sections/three-columns"
import CardsSection from "../components/sections/cards"
import BaseSection from "../components/sections/base"
import PageLayout from "../components/page-layout"
import SEO from "../components/seo"
import Card from "../components/card"

const Home = ({ data, location }) => {
  const pageData = data.homepage.nodes[0].frontmatter
  const posts = data.posts.nodes
  const projects = data.projects.nodes

  return (
    <div>
      <PageLayout
        title={pageData.header.title}
        subtitle={pageData.header.subtitle}
        location={location}
      >
        <SEO
          title={pageData.seo.title || pageData.header.title}
          description={pageData.seo.description || pageData.header.subtitle}
        />
        <BaseSection>
          <Intro
            content={pageData.introSection.content}
            link={pageData.introSection.link}
          />
        </BaseSection>
        <BaseSection noTopPadding>
          <ThreeColumns></ThreeColumns>
        </BaseSection>
        <hr></hr>
        <BaseSection>
          <CardsSection
            title={pageData.postsSection.title}
            link={pageData.postsSection.link}
          >
            {posts.map(post => {
              return (
                <Card
                  key={post.fields.slug}
                  url={post.fields.slug}
                  image={post.frontmatter.featuredImage.childImageSharp.fluid}
                  title={post.frontmatter.title}
                  subtitle={post.frontmatter.date}
                  content={post.frontmatter.description || post.excerpt}
                />
              )
            })}
          </CardsSection>
        </BaseSection>
        <BaseSection>
          <CardsSection
            title={pageData.projectsSection.title}
            link={pageData.projectsSection.link}
          >
            {projects.map(project => {
              return (
                <Card
                  key={project.fields.slug}
                  url={project.fields.slug}
                  image={
                    project.frontmatter.featuredImage.childImageSharp.fluid
                  }
                  title={
                    project.frontmatter.card.title ||
                    project.frontmatter.header.title
                  }
                  subtitle={project.frontmatter.area}
                  content={
                    project.frontmatter.card.description ||
                    project.frontmatter.header.subtitle
                  }
                />
              )
            })}
          </CardsSection>
        </BaseSection>
      </PageLayout>
    </div>
  )
}

export default Home

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    homepage: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/custom-page/home.md/" } }
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
          introSection {
            link {
              text
              url
            }
            content
          }
          keyfactsSection {
            title
            description
          }
          projectsSection {
            title
            link {
              title
              url
            }
          }
          postsSection {
            title
            link {
              title
              url
            }
          }
        }
      }
    }
    posts: allMarkdownRemark(
      limit: 3
      filter: { fields: { contentType: { eq: "blog" } } }
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
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    projects: allMarkdownRemark(
      limit: 3
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
          header {
            title
            subtitle
          }
          card {
            title
            description
          }
          area
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
