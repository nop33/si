import React from "react"

import { keyfacts } from "./keyfacts.module.scss"

const Keyfacts = ({ children }) => {
  return <div className={keyfacts}>{children}</div>
}

export default Keyfacts
