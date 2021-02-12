import React from "react"
import styles from "./centered-narrow.module.scss"

const CenteredNarrow = ({ children }) => {
  return <div className={styles.centeredNarrow}>{children}</div>
}

export default CenteredNarrow
