import React from "react"
import Image from "gatsby-image"

import styles from "./person.module.scss"

const Person = ({ photo }) => {
  return (
    <div className={styles.person}>
      <Image fixed={photo} />
    </div>
  )
}

export default Person
