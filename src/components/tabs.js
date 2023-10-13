import React from "react"

import { generateIdFromTitle } from "../utils"

import TableOfContents from "./TableOfContents"

const Tabs = ({ titles }) => {
  const links = titles
    .filter(title => !!title)
    .map(title => {
      return {
        title: title,
        url: `#${generateIdFromTitle(title)}`,
      }
    })

  return <TableOfContents links={links} />
}

export default Tabs
