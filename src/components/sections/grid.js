import React from "react"

import { oneColumn, twoColumns, threeColumns, grid } from "./grid.module.scss"

const Grid = ({ children, numberOfColumns }) => {
  const columnsClass =
    (numberOfColumns === 1 && oneColumn) ||
    (numberOfColumns === 2 && twoColumns) ||
    (numberOfColumns === 3 && threeColumns)
  return <div className={`${grid} ${columnsClass}`}>{children}</div>
}

export default Grid
