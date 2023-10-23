import classNames from "classnames"
import React, { ReactNode } from "react"

import styled, { css } from "styled-components"

interface BaseSectionProps {
  children: ReactNode
  id?: string
  noTopPadding?: boolean
  className?: string
}

const BaseSection = ({ id, children, className }: BaseSectionProps) => (
  <section id={id} className={classNames("global-content-wrapper", className)}>
    {children}
  </section>
)

export default styled(BaseSection)`
  ${({ noTopPadding }) =>
    noTopPadding &&
    css`
      padding-top: 0;
    `}
`
