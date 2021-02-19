import React from "react"
import styles from "./side-by-side.module.scss"

const SideBySide = ({ title, header, children }) => {
  return (
    <div className={styles.sideBySide}>
      <div className={styles.headerSection}>
        { title ? <h2>{title}</h2> : header}
      </div>
      <div className={styles.contentSection}>{children}</div>
    </div>
  )
}

export default SideBySide
