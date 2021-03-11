import React from "react"
import { Link } from "gatsby"

import { constructBlogTagUrl } from "../utils"

import * as styles from "./tags-list.module.scss"

const TagsList = ({ tags }) => {
  return (
    <ul className={styles.tagsList}>
      {tags.map(tag => {
        return (
          <li key={tag}>
            <Link to={constructBlogTagUrl(tag)}>#{tag}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default TagsList
