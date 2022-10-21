import React from "react"

import ArrowedLink from "../arrowed-link"
import Grid from "./grid"
import {
  cardsSection,
  fixAlignment as fixAlignmentStyles,
  seeMoreLink,
} from "./cards.module.scss"

const CardsSection = ({
  children,
  title,
  link,
  numberOfColumns,
  fixAlignment,
}) => {
  return (
    <div className={`${cardsSection} ${fixAlignment && fixAlignmentStyles}`}>
      <h2 className="secondary-heading">{title}</h2>
      <Grid numberOfColumns={numberOfColumns}>{children}</Grid>
      {link && (
        <ArrowedLink
          direction="right"
          to={link?.url}
          text={link?.title}
          className={seeMoreLink}
        />
      )}
    </div>
  )
}

export default CardsSection
