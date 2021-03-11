import React from "react"

import { toHTML } from "../../utils"

import styles from "./columns-with-buttons.module.scss"

const ColumnsWithButtons = ({ columnsData }) => {
  return (
    <div className={styles.columnsWithButtons}>
      {columnsData.map(column => {
        return (
          <div className={styles.column}>
            {column.title && <h3>{column.title}</h3>}
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: toHTML(column.content),
              }}
            ></div>
            {column.button && column.button.text && column.button.url && (
              <a
                className="si-button"
                href={column.button.url}
                rel="nofollow noopener"
                tabIndex={0}
                role="button"
              >
                {column.button.text}
              </a>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ColumnsWithButtons
