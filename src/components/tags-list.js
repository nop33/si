import React from "react"
import { Link } from "gatsby"

import { constructTagUrl } from "../utils"

import BaseSection from "../components/sections/base"
import styles from "./tags-list.module.scss"

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
              <li key={tag.title}>
                <Link className="golden" to={constructTagUrl(tag)}>
                  {tag.fieldValue}
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
