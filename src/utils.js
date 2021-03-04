const _ = require("lodash")
const remark = require("remark")
const remarkHTML = require("remark-html")

export function generateIdFromTitle(title) {
  return title.toLowerCase().replace(/[^a-zA-Z]/g, "-")
}

export function constructBlogTagUrl(tag) {
  return `/blog/tag/${_.kebabCase(tag)}/`
}

export function constructProjectCategoryUrl(tag) {
  return `/projects/category/${_.kebabCase(tag)}/`
}

export function constructProjectTagUrl(tag) {
  return `/projects/tag/${_.kebabCase(tag)}/`
}

export const toHTML = value =>
  remark().use(remarkHTML).processSync(value).toString()
