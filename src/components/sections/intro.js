import React from "react"
import remark from "remark"
import remarkHTML from "remark-html"

import CirclesSVG from "../../images/circles.svg"
import ArrowedLink from "../arrowed-link"

import styles from "./intro.module.scss"

const Intro = ({ content, link }) => {
  const toHTML = value => remark().use(remarkHTML).processSync(value).toString()

  return (
    <div className={styles.intro}>
      <div className={styles.introText}>
        <div
          dangerouslySetInnerHTML={{
            __html: toHTML(content),
          }}
        ></div>
        <ArrowedLink
          className={styles.link}
          direction="right"
          to={link.url}
          text={link.text}
        />
      </div>
      <CirclesSVG />
    </div>
  )
}

export default Intro
