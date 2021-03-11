import React from "react"

import {
  constructBlogTagUrl,
  constructProjectCategoryUrl,
  constructProjectTagUrl,
} from "../utils"

import TableOfContents from "./table-of-contents"

const FeaturedTagsList = ({
  tags,
  isBlogTags,
  isProjectCategories,
  isProjectTags,
}) => {
  const links = [
    { title: "All", url: isBlogTags ? `/blog/` : `/projects/` },
    ...tags.map(tag => {
      return {
        title: tag,
        url:
          (isBlogTags && constructBlogTagUrl(tag)) ||
          (isProjectCategories && constructProjectCategoryUrl(tag)) ||
          (isProjectTags && constructProjectTagUrl(tag)),
      }
    }),
  ]

  return <TableOfContents links={links} />
}

export default FeaturedTagsList
