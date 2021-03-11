import React from "react"
import { GatsbyImage } from "gatsby-plugin-image";

import * as styles from "./person.module.scss"

const Person = ({ photo, name }) => {
  return (
    <div className={styles.person}>
      <GatsbyImage image={photo} alt={`${name} profile image`} />
    </div>
  );
}

export default Person
