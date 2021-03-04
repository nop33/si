const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  // Get all markdown blog posts sorted by date
  const blogPostsResult = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fields: { contentType: { eq: "blog" } } }
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (blogPostsResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      blogPostsResult.errors
    )
    return
  }

  const posts = blogPostsResult.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  // Define a template for subpage
  const subpageTemplate = path.resolve(`./src/templates/subpage.js`)

  // Get all markdown subpages
  const subpagesResult = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fields: { contentType: { in: ["subpage", "project"] } } }
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (subpagesResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      subpagesResult.errors
    )
    return
  }

  const subpages = subpagesResult.data.allMarkdownRemark.nodes

  if (subpages.length > 0) {
    subpages.forEach(subpage => {
      createPage({
        path: subpage.fields.slug,
        component: subpageTemplate,
        context: {
          id: subpage.id,
        },
      })
    })
  }

  // Define a template for member
  const memberTemplate = path.resolve(`./src/templates/member.js`)

  // Get all markdown members
  const membersResult = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fields: { contentType: { eq: "member" } } }
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (membersResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      membersResult.errors
    )
    return
  }

  const members = membersResult.data.allMarkdownRemark.nodes

  if (members.length > 0) {
    members.forEach((member, index) => {
      createPage({
        path: member.fields.slug,
        component: memberTemplate,
        context: {
          id: member.id,
        },
      })
    })
  }

  const tagTemplate = path.resolve("src/templates/tag.js")

  const tagResult = await graphql(`
    {
      tagsGroup: allMarkdownRemark(
        filter: { fields: { contentType: { eq: "blog" } } }
        limit: 2000
      ) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  if (tagResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your tags`,
      tagResult.errors
    )
    return
  }

  const tags = tagResult.data.tagsGroup.group

  tags.forEach(tag => {
    createPage({
      path: `/blog/tag/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    const type = getNode(node.parent).sourceInstanceName

    let slugPrefix = ""

    if (type !== "subpage") {
      slugPrefix = `/${type}`
    }

    if (type === "blog") {
      slugPrefix = `${slugPrefix}/post`
    }

    if (type === "member") {
      slugPrefix = `/about${slugPrefix}`
    }

    createNodeField({
      name: `slug`,
      node,
      value: `${slugPrefix}${value}`,
    })

    createNodeField({
      name: `contentType`,
      node,
      value: type,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      name: String
    }

    type Fields {
      slug: String
      contentType: String
    }
  `)
}
