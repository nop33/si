import React, { ReactNode } from "react"
import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons"

import styled, { css } from "styled-components"
import classNames from "classnames"

type Direction = "left" | "right"

export type LinkProps = {
  url: string
  title?: string
}

interface ArrowLinkProps {
  direction: Direction
  to: string
  text?: string
  rel?: string
  children?: ReactNode
  className?: string
}

const ArrowedLink = ({
  direction,
  to,
  text,
  className,
  children,
  rel,
}: ArrowLinkProps) => (
  <Link className={classNames("golden", className)} to={to} rel={rel}>
    {direction === "left" && <Icon size="xs" icon={faChevronLeft} />}
    {text || children}
    {direction === "right" && <Icon size="xs" icon={faChevronRight} />}
  </Link>
)

const Icon = styled(FontAwesomeIcon)`
  max-width: 1rem;
  transition: transform 0.2s;
`

export default styled(ArrowedLink)`
  display: flex;
  font-size: var(--fontSize-2);
  align-items: center;

  ${({ direction }) =>
    direction === "left"
      ? css`
          ${Icon} {
            margin-right: var(--spacing-3);
          }
        `
      : css`
          ${Icon} {
            margin-left: var(--spacing-3);
          }
        `}

  &:hover {
    ${({ direction }) =>
      direction === "left"
        ? css`
            ${Icon} {
              transform: translateX(calc(var(--spacing-1) * -1));
            }
          `
        : css`
            ${Icon} {
              transform: translateX(var(--spacing-1));
            }
          `}
  }
`
