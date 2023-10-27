import React, { ReactNode } from "react"

import { oneColumn, twoColumns, grid } from "./grid.module.scss"

interface GridProps {
  children: ReactNode
  numberOfColumns?: number
}

const Grid = ({ children, numberOfColumns }: GridProps) => (
  <div
    className={`${grid} ${
      numberOfColumns === 1
        ? oneColumn
        : numberOfColumns === 2
        ? twoColumns
        : ""
    }`}
  >
    {children}
  </div>
)

export default Grid
