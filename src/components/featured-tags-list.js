import React from "react"
import { Link } from "gatsby"

import {
  constructBlogTagUrl,
  constructProjectCategoryUrl,
  constructProjectTagUrl,
} from "../utils"

import BaseSection from "./sections/base"
import styles from "./featured-tags-list.module.scss"

const FeaturedTagsList = ({
  tags,
  isBlogTags,
  isProjectCategories,
  isProjectTags,
}) => {
  return (
    <BaseSection className={styles.tagsSection}>
      <div className={styles.tags}>
        <ul>
          <li>
            <Link className="golden" to={isBlogTags ? `/blog` : `/projects`}>
              All
            </Link>
          </li>
          {tags.map(tag => {
            return (
              <li key={tag}>
                <Link
                  className="golden"
                  to={
                    (isBlogTags && constructBlogTagUrl(tag)) ||
                    (isProjectCategories && constructProjectCategoryUrl(tag)) ||
                    (isProjectTags && constructProjectTagUrl(tag))
                  }
                >
                  {tag}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </BaseSection>
  )
}

export default FeaturedTagsList
