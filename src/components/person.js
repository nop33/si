import React from "react"
import Image from "gatsby-image"

import styles from "./person.module.scss"

const Person = ({ photo, name }) => {
  return (
    <div className={styles.person}>
      <Image fixed={photo} alt={`${name} profile image`} />
    </div>
  )
}

export default Person
