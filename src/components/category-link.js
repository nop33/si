import React from "react"

import { constructProjectCategoryUrl } from "../utils"

import { Link } from "gatsby"

import styles from "./category-link.module.scss"

const CategoryLink = ({ children }) => {
  return (
    <Link
      className={`${styles.categoryLink} golden`}
      to={constructProjectCategoryUrl(children)}
    >
      {children}
    </Link>
  )
}

export default CategoryLink
