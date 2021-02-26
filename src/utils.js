const _ = require("lodash")

export function generateIdFromTitle(title) {
  return title.toLowerCase().replace(/[^a-zA-Z]/g, "-")
}

export function constructTagUrl(tag) {
  return `/blog/tag/${_.kebabCase(tag)}/`
}
