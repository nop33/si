import React from "react"
import { Link } from "gatsby"

import { constructTagUrl } from "../utils"

import styles from "./tags-list.module.scss"

const TagsList = ({ tags }) => {
  return (
    <ul className={styles.tagsList}>
      {tags.map(tag => {
        return (
          <li>
            <Link to={constructTagUrl(tag)}>#{tag}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default TagsList
