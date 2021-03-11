import React from "react"

import { generateIdFromTitle } from "../utils"

import TableOfContents from "./table-of-contents"

const Tabs = ({ titles }) => {
  const links = titles
    .filter(title => !!title)
    .map(title => {
      return {
        title: title,
        url: `#${generateIdFromTitle(title)}`,
      }
    })

  return <TableOfContents oneLine links={links} />
}

export default Tabs
