import React from "react"

import ArrowedLink from "../arrowed-link"
import Grid from "./grid"
import styles from "./cards.module.scss"

const CardsSection = ({ children, title, link, numberOfColumns }) => {
  return (
    <div className={styles.cardsSection}>
      <h2>{title}</h2>
      <Grid numberOfColumns={numberOfColumns}>{children}</Grid>
      {link && (
        <ArrowedLink
          direction="right"
          to={link?.url}
          text={link?.title}
          className={styles.seeMoreLink}
        />
      )}
    </div>
  )
}

export default CardsSection
