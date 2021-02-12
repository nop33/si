import React from "react"
import styles from "./side-by-side.module.scss"

const SideBySide = ({ title, children }) => {
  return (
    <div className={styles.sideBySide}>
      <div className={styles.titleSection}>
        <h2>{title}</h2>
      </div>
      <div className={styles.contentSection}>{children}</div>
    </div>
  )
}

export default SideBySide
