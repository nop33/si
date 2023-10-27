import React from "react"

import Grid from "./grid"
import ArrowedLink, { LinkProps } from "../arrowed-link"
import { toHTML } from "../../utils"
import styled, { css } from "styled-components"

type Orientation =
  | "cards-full-width"
  | "cards-on-the-left"
  | "cards-on-the-right"

interface CardsWithTextSectionProps {
  cards: any[]
  title?: string
  description?: string
  orientation?: Orientation
  headingWeight?: 2 | 3
  link?: LinkProps
  className?: string
}

const CardsWithTextSection = ({
  cards = [],
  title = "",
  description = "",
  orientation = "cards-full-width",
  headingWeight = 3,
  link,
  className,
}: CardsWithTextSectionProps) => (
  <Wrapper>
    <div className={className}>
      <TextContent>
        {title && (headingWeight === 2 ? <H2>{title}</H2> : <h3>{title}</h3>)}
        {description && (
          <Description
            dangerouslySetInnerHTML={{
              __html: toHTML(description),
            }}
          ></Description>
        )}
      </TextContent>
      <Grid numberOfColumns={orientation === "cards-full-width" ? 3 : 2}>
        {cards}
      </Grid>
    </div>
    {link && (
      <ArrowedLinkStyled
        direction="right"
        to={link?.url}
        text={link?.title}
        orientation={orientation}
      />
    )}
  </Wrapper>
)

const Description = styled.div``

const TextContent = styled.div`
  font-size: var(--fontSize-3);

  > h3 {
    font-size: var(--fontSize-6);
    margin: var(--spacing-0);

    + ${Description} {
      margin-top: var(--spacing-4);
    }
  }
`

export default styled(CardsWithTextSection)`
  display: grid;
  align-items: center;
  grid-gap: var(--spacing-20);

  ${({ orientation }) =>
    orientation === "cards-full-width"
      ? css`
          grid-template-columns: 1fr;
        `
      : orientation === "cards-on-the-right"
      ? css`
          grid-template-columns: 1fr 2fr;
        `
      : css`
          grid-template-columns: 2fr 1fr;

          ${TextContent} {
            order: 1;
          }
        `}

  @media (max-width: 64rem) {
    ${({ orientation }) =>
      orientation === "cards-on-the-left"
        ? css`
            grid-template-columns: 1fr;

            ${TextContent} {
              order: 0;
            }
          `
        : orientation === "cards-on-the-right"
        ? css`
            grid-template-columns: 1fr;
          `
        : ""}
  }
`

const ArrowedLinkStyled = styled(ArrowedLink)<{ orientation: Orientation }>`
  margin-top: var(--spacing-16);

  ${({ orientation }) =>
    orientation === "cards-on-the-right" &&
    css`
      @media (min-width: 64rem) {
        justify-content: flex-end;
      }
    `}
`

const Wrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: var(--spacing-56);
  }
`

const H2 = styled.h2`
  font-size: var(--fontSize-7);
  margin-bottom: var(--spacing-10);
  margin-top: var(--spacing-0);
`
