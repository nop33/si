import React from "react"

import styles from "./base.module.scss"

const BaseSection = ({ id, children, className, noTopPadding }) => {
  return (
    <section
      id={id}
      className={`global-content-wrapper ${className || ""} ${
        noTopPadding && styles.noTopPadding
      }`}
    >
      {children}
    </section>
  )
}

export default BaseSection
