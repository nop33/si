import React, { ReactNode } from "react"
import styled, { css } from "styled-components"

import ArrowedLink, { LinkProps } from "../arrowed-link"
import Grid from "./grid"

interface CardsSectionProps {
  title: string
  numberOfColumns: number
  fixAlignment?: boolean
  children: ReactNode
  link?: LinkProps
  className?: string
}

const CardsSection = ({
  children,
  title,
  link,
  numberOfColumns,
  className,
}: CardsSectionProps) => (
  <div className={className}>
    <h2 className="secondary-heading">{title}</h2>
    <Grid numberOfColumns={numberOfColumns}>{children}</Grid>
    {link && (
      <ArrowedLinkStyled direction="right" to={link?.url} text={link?.title} />
    )}
  </div>
)

export default styled(CardsSection)`
  ${({ fixAlignment }) =>
    fixAlignment &&
    css`
      padding-left: var(--spacing-4);

      @media (max-width: 64rem) {
        padding-left: var(--spacing-0);
      }
    `}
`

const ArrowedLinkStyled = styled(ArrowedLink)`
  margin-top: var(--spacing-16);
`
