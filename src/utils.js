const _ = require("lodash")
const remark = require("remark")
const remarkHTML = require("remark-html")

export function generateIdFromTitle(title) {
  return title.toLowerCase().replace(/[^a-zA-Z]/g, "-")
}

export function constructTagUrl(tag) {
  return `/blog/tag/${_.kebabCase(tag)}/`
}

export const toHTML = value =>
  remark().use(remarkHTML).processSync(value).toString()
