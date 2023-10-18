import React from "react"

import {
  constructBlogTagUrl,
  constructProjectCategoryUrl,
  constructProjectTagUrl,
} from "../utils"

import TableOfContents from "./TableOfContents"

interface FeaturedTagsList {
  tags: string[]
  type: "blog" | "projectCategories" | "project"
}

const FeaturedTagsList = ({ tags, type }: FeaturedTagsList) => {
  const links = [
    { title: "All", url: type === "blog" ? `/blog/` : `/our-work/` },
    ...tags.map(tag => ({
      title: tag,
      url: {
        blog: constructBlogTagUrl(tag),
        project: constructProjectTagUrl(tag),
        projectCategories: constructProjectCategoryUrl(tag),
      }[type],
    })),
  ]

  return <TableOfContents links={links} />
}

export default FeaturedTagsList
