import React from "react"
import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons"

import { arrowedLink, forward, backward } from "./arrowed-link.module.scss"

const ArrowedLink = ({ direction, to, text, className, children, rel }) => {
  return (
    <Link
      className={`golden ${className} ${arrowedLink} ${
        direction === "right" ? forward : backward
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
