import React from "react"
import { Link } from "gatsby"

import { constructTagUrl } from "../utils"

import BaseSection from "./sections/base"
import styles from "./featured-tags-list.module.scss"

const TagsList = ({ tags }) => {
  return (
    <BaseSection className={styles.tagsSection}>
      <div className={styles.tags}>
        <ul>
          <li>
            <Link className="golden" to="/blog">
              all
            </Link>
          </li>
          {tags.map(tag => {
            return (
              <li key={tag}>
                <Link className="golden" to={constructTagUrl(tag)}>
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

export default TagsList
