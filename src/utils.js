import { kebabCase } from "lodash"
import { remark } from "remark"
import remarkHTML from "remark-html"

export function generateIdFromTitle(title) {
  return title.toLowerCase().replace(/[^a-zA-Z]/g, "-")
}

export function constructBlogTagUrl(tag) {
  return `/blog/tag/${kebabCase(tag)}/`
}

export function constructProjectCategoryUrl(tag) {
  return `/projects/category/${kebabCase(tag)}/`
}

export function constructProjectTagUrl(tag) {
  return `/projects/tag/${kebabCase(tag)}/`
}

export const toHTML = value =>
  remark().use(remarkHTML, { sanitize: false }).processSync(value).toString()

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
