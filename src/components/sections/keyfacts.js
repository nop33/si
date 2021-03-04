import React from "react"

import styles from "./keyfacts.module.scss"

const Keyfacts = ({ children }) => {
  return <div className={styles.keyfacts}>{children}</div>
}

export default Keyfacts
