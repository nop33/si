import React from "react"

import * as styles from "./grid.module.scss"

const Grid = ({ children, numberOfColumns }) => {
  const columnsClass =
    (numberOfColumns === 1 && styles.oneColumn) ||
    (numberOfColumns === 2 && styles.twoColumns) ||
    (numberOfColumns === 3 && styles.threeColumns)
  return <div className={`${styles.grid} ${columnsClass}`}>{children}</div>
}

export default Grid
