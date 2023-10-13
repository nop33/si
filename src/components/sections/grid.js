import React from "react"

import { oneColumn, twoColumns, grid } from "./grid.module.scss"

const Grid = ({ children, numberOfColumns }) => {
  const columnsClass =
    (numberOfColumns === 1 && oneColumn) ||
    (numberOfColumns === 2 && twoColumns)
  return <div className={`${grid} ${columnsClass}`}>{children}</div>
}

export default Grid
