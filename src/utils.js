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
  remark.remark().use(remarkHTML).processSync(value).toString()

export const updateSrcSet = (srcSet, maxWidth) => {
  if (!srcSet) return null
  const srcSetArray = srcSet.split(",")
  return srcSetArray
    .reduce((filtered, src) => {
      const [url, width] = src.split(" ")
      if (parseInt(width) <= maxWidth) {
        filtered.push(`${url} ${width}`)
      }
      return filtered
    }, [])
    .join(",")
}
