import React from "react"

import { Link } from "gatsby"

import styles from "./authors.module.scss"

const Authors = ({ authors }) => {
  return (
    <address className={styles.authors}>
      <span>By </span>
      {authors.map((author, index) => {
        const name = author.page ? (
          <Link
            rel="author"
            to={`/about/member/${author.page.replace("index", "")}`}
          >
            {author.name}
          </Link>
        ) : (
          <span rel="author">{author.name}</span>
        )
        return (
          <span key={author.page}>
            {name}
            {index + 1 < authors.length - 1
              ? ", "
              : index + 1 === authors.length
              ? ""
              : ", and "}
          </span>
        )
      })}
    </address>
  )
}

export default Authors
