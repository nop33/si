import React from "react"
import wideSectionStyles from "./wide-section.module.scss"

const WideSection = ({ children }) => {
  return <section className={wideSectionStyles.wideSection}>{children}</section>
}

export default WideSection
