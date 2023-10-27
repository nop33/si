import React from "react"

import ArrowedLink from "./arrowed-link"
import { keyfact } from "./keyfact.module.scss"
import styled from "styled-components"

const Keyfact = ({ title, content, link }) => {
  return (
    <div className={keyfact}>
      <h2>{title}</h2>
      <div>
        <p>{content}</p>
      </div>
      {link?.url && (
        <ArrowedLinkStyled direction="right" to={link.url} text={link.title} />
      )}
    </div>
  )
}

export default Keyfact

const ArrowedLinkStyled = styled(ArrowedLink)`
  margin-top: var(--spacing-8);
`
