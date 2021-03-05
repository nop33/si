import React from "react"

import Grid from "./grid"
import styles from "./cards-with-text.module.scss"

const CardsWithTextSection = ({
  cards = [],
  title = "",
  description = "",
  orientation = "cards-full-width",
  headingWeight = 3,
}) => {
  const orientationClass =
    (orientation === "cards-on-the-left" && styles.cardsOnTheLeft) ||
    (orientation === "cards-on-the-right" && styles.cardsOnTheRight) ||
    (orientation === "cards-full-width" && styles.cardsFullWidth)
  const numberOfColumns =
    (orientation === "cards-on-the-left" && 2) ||
    (orientation === "cards-on-the-right" && 2) ||
    (orientation === "cards-full-width" && 3)
  const heading = (title && headingWeight === 2 && <h2>{title}</h2>) || (
    <h3>{title}</h3>
  )
  return (
    <div className={`${styles.cardsSection} ${orientationClass}`}>
      <div className={styles.textContent}>
        {heading}
        {description && (
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          ></div>
        )}
      </div>
      <Grid numberOfColumns={numberOfColumns}>{cards}</Grid>
    </div>
  )
}

export default CardsWithTextSection
