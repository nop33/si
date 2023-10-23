import React from "react"
import Image from "gatsby-image"

import { person } from "./person.module.scss"

const Person = ({ photo, name }) => {
  return (
    <div className={person}>
      <Image fixed={photo} alt={`${name} profile image`} />
    </div>
  )
}

export default Person
