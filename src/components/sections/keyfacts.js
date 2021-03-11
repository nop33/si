import React from "react"

import * as styles from "./keyfacts.module.scss"

const Keyfacts = ({ children }) => {
  return <div className={styles.keyfacts}>{children}</div>
}

export default Keyfacts
