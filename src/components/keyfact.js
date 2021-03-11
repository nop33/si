import React from "react"

import ArrowedLink from "./arrowed-link"
import * as styles from "./keyfact.module.scss"

const Keyfact = ({ title, content, link }) => {
  return (
    <div className={styles.keyfact}>
      <h2>{title}</h2>
      <div>
        <p>{content}</p>
      </div>
      {link?.url && (
        <ArrowedLink direction="right" to={link.url} text={link.title} />
      )}
    </div>
  )
}

export default Keyfact
