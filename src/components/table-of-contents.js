import React from "react"
import { Link } from "gatsby"

import BaseSection from "./sections/base"

import * as styles from "./table-of-contents.module.scss"

const TableOfContents = ({ links, oneLine }) => {
  return (
    <BaseSection
      className={`${styles.tableOfContentsSection} ${
        oneLine && styles.oneLineSection
      }`}
    >
      <div
        className={`${styles.tableOfContents} ${
          oneLine ? styles.oneLine : styles.multipleLines
        }`}
      >
        <ul>
          {links
            .filter(link => !!link.title)
            .map(link => {
              return (
                <li key={link.url}>
                  <Link className="golden" to={link.url}>
                    {link.title}
                  </Link>
                </li>
              )
            })}
        </ul>
      </div>
    </BaseSection>
  )
}

export default TableOfContents
