import React from "react"

import { toHTML } from "../../utils"

import {
  columnsWithButtons,
  column as columnStyles,
  content,
} from "./columns-with-buttons.module.scss"

const ColumnsWithButtons = ({ columnsData }) => {
  return (
    <div className={columnsWithButtons}>
      {columnsData.map(column => {
        return (
          <div className={columnStyles} key={`col_${column.title}`}>
            {column.title && <h3>{column.title}</h3>}
            <div
              className={content}
              dangerouslySetInnerHTML={{
                __html: toHTML(column.content),
              }}
            ></div>
            {column.button && column.button.text && column.button.url && (
              <a
                className="si-button"
                href={column.button.url}
                rel="nofollow noopener noreferrer"
                target="_blank"
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
