import React from "react"
import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons"

import styles from "./arrowed-link.module.scss"

const ArrowedLink = ({ direction, to, text, className, children, rel }) => {
  return (
    <Link
      className={`golden ${className} ${styles.arrowedLink} ${
        direction === "right" ? styles.forward : styles.backward
      }`}
      to={to}
      rel={rel}
    >
      {direction === "left" && <FontAwesomeIcon icon={faChevronLeft} />}
      {text || children}
      {direction === "right" && <FontAwesomeIcon icon={faChevronRight} />}
    </Link>
  )
}

export default ArrowedLink
