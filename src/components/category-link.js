import React from "react"

import { constructProjectCategoryUrl } from "../utils"

import { Link } from "gatsby"

import { categoryLink } from "./category-link.module.scss"

const CategoryLink = ({ children }) => {
  return (
    <Link
      className={`${categoryLink} golden`}
      to={constructProjectCategoryUrl(children)}
    >
      {children}
    </Link>
  )
}

export default CategoryLink
