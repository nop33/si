import React from "react"

import { noTopPadding as noTopPaddingStyles } from "./base.module.scss"

const BaseSection = ({ id, children, className = "", noTopPadding }) => {
  return (
    <section
      id={id}
      className={`global-content-wrapper ${className} ${
        noTopPadding ? noTopPaddingStyles : ""
      }`}
    >
      {children}
    </section>
  )
}

export default BaseSection
