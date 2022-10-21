import React from "react"

import Grid from "./grid"
import ArrowedLink from "../arrowed-link"
import {
  cardsOnTheLeft,
  cardsOnTheRight,
  cardsFullWidth,
  cardsSectionWrapper,
  cardsSection,
  textContent,
  description as descriptionStyles,
  seeMoreLink,
} from "./cards-with-text.module.scss"
import { toHTML } from "../../utils"

const CardsWithTextSection = ({
  cards = [],
  title = "",
  description = "",
  orientation = "cards-full-width",
  headingWeight = 3,
  link,
}) => {
  const orientationClass =
    (orientation === "cards-on-the-left" && cardsOnTheLeft) ||
    (orientation === "cards-on-the-right" && cardsOnTheRight) ||
    (orientation === "cards-full-width" && cardsFullWidth)
  const numberOfColumns =
    (orientation === "cards-on-the-left" && 2) ||
    (orientation === "cards-on-the-right" && 2) ||
    (orientation === "cards-full-width" && 3)
  const heading = (title && headingWeight === 2 && <h2>{title}</h2>) || (
    <h3>{title}</h3>
  )
  return (
    <div className={cardsSectionWrapper}>
      <div className={`${cardsSection} ${orientationClass}`}>
        <div className={textContent}>
          {heading}
          {description && (
            <div
              className={descriptionStyles}
              dangerouslySetInnerHTML={{
                __html: toHTML(description),
              }}
            ></div>
          )}
        </div>
        <Grid numberOfColumns={numberOfColumns}>{cards}</Grid>
      </div>
      {link && (
        <ArrowedLink
          direction="right"
          to={link?.url}
          text={link?.title}
          className={`${seeMoreLink} ${orientationClass}`}
        />
      )}
    </div>
  )
}

export default CardsWithTextSection
