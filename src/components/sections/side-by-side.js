import React from "react"
import * as styles from "./side-by-side.module.scss"

const SideBySide = ({ title, header, children, isWide, elevateTitle }) => {
  return (
    <div
      className={`${styles.sideBySide} ${isWide ? styles.wide : ""} ${
        elevateTitle ? styles.elevatedTitle : ""
      }`}
    >
      <div className={styles.headerSection}>
        {title ? <h2>{title}</h2> : header}
      </div>
      <div className={styles.contentSection}>{children}</div>
    </div>
  )
}

export default SideBySide
