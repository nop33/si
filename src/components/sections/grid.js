import React from "react"

import Card from "../_card"

import styles from "./grid.module.scss"

const Grid = ({ posts }) => {
  return (
    <div className={styles.grid}>
      {posts.map(post => {
        return (
          <Card
            url={post.fields.slug}
            image={post.frontmatter.featuredImage.childImageSharp.fluid}
            title={post.frontmatter.title}
            subtitle={post.frontmatter.date}
            content={post.frontmatter.description || post.excerpt}
          />
        )
      })}
    </div>
  )
}

export default Grid
