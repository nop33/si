const escapeStringRegexp = require("escape-string-regexp")

const pagePath = `content`

const blogPostQuery = `{
  pages: allMarkdownRemark(
    filter: {
      fileAbsolutePath: { regex: "/${escapeStringRegexp(pagePath)}/blog/" }
      frontmatter: { hide: { ne: true } }
    }
  ) {
    edges {
      node {
        id
        frontmatter {
          title
        }
        fields {
          slug
        }
        excerpt(pruneLength: 9000)
        internal {
          contentDigest
        }
      }
    }
  }
}`

const membersQuery = `{
  pages: allMarkdownRemark(
    filter: {
      fileAbsolutePath: { regex: "/${escapeStringRegexp(pagePath)}/member/" }
      frontmatter: {
        hide: { ne: true }
        disableDetailPage: { ne: true }
      }
    }
  ) {
    edges {
      node {
        id
        frontmatter {
          name
        }
        fields {
          slug
        }
        excerpt(pruneLength: 9000)
        internal {
          contentDigest
        }
      }
    }
  }
}`

const jobQuery = `{
  pages: allMarkdownRemark(
    filter: {
      fileAbsolutePath: { regex: "/${escapeStringRegexp(pagePath)}/job/" }
      frontmatter: { hide: { ne: true } }
    }
  ) {
    edges {
      node {
        id
        frontmatter {
          title
          teaserText
        }
        fields {
          slug
        }
        internal {
          contentDigest
        }
      }
    }
  }
}`

function pageToAlgoliaRecord(data) {
  const {
    node: { id, frontmatter, fields, internal, ...rest },
  } = data
  const result = {
    objectID: id,
    ...frontmatter,
    ...fields,
    ...rest,
    title: frontmatter.title || frontmatter.name,
    internal: {
      ...internal,
      contentDigest:
        internal.contentDigest ||
        crypto.createHash("md5").update(JSON.stringify(data)).digest("hex"),
    },
  }

  return result
}

const queries = [
  {
    query: blogPostQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName: "Blog posts",
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
  {
    query: membersQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName: "Members",
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
  {
    query: jobQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName: "Jobs",
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]

module.exports = queries
