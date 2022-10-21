import React from "react"

import { Link } from "gatsby"

import { authors } from "./authors.module.scss"

const Authors = ({ authors }) => {
  const displayAuthors = authors.filter(
    author => (author.page && author.name) || author.externalName
  )
  if (displayAuthors.length === 0) {
    return null
  }
  return (
    <address className={authors}>
      <span>By </span>
      {displayAuthors.map((author, index) => {
        let name
        if (author.page) {
          name = (
            <Link
              rel="author"
              to={`/about/member/${author.page.replace("index", "")}`}
            >
              {author.name}
            </Link>
          )
        } else if (author.externalLink && author.externalName) {
          name = (
            <a
              href={author.externalLink}
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              {author.externalName}
            </a>
          )
        } else if (author.externalName) {
          name = <span rel="author">{author.externalName}</span>
        }
        return (
          <span key={author.page}>
            {name}
            {index + 1 < displayAuthors.length - 1
              ? ", "
              : index + 1 === displayAuthors.length
              ? ""
              : ", and "}
          </span>
        )
      })}
    </address>
  )
}

export default Authors
