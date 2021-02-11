import React from "react"
import baseSectionStyles from "./base-section.module.scss"

const BaseSection = ({ children }) => {
  return <section className={baseSectionStyles.baseSection}>{children}</section>
}

export default BaseSection
