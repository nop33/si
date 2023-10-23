import React from "react"
import styled from "styled-components"

import { toHTML } from "../../utils"

interface ColumnsWithButtonsProps {
  data: ColumnWithButtonsData[]
  className?: string
}

type ColumnWithButtonsData = {
  title: string
  content: string
  button: {
    text: string
    url: string
  }
}

const ColumnsWithButtons = ({ data, className }: ColumnsWithButtonsProps) => (
  <div className={className}>
    {data.map(column => (
      <Column key={`col_${column.title}`}>
        {column.title && <h3>{column.title}</h3>}
        <Content
          dangerouslySetInnerHTML={{
            __html: toHTML(column.content),
          }}
        ></Content>
        {column.button && column.button.text && column.button.url && (
          <a
            className="si-button"
            href={column.button.url}
            rel={
              column.button.url.startsWith("https://")
                ? "nofollow noopener noreferrer"
                : undefined
            }
            target={
              column.button.url.startsWith("https://") ? "_blank" : undefined
            }
            tabIndex={0}
            role="button"
          >
            {column.button.text}
          </a>
        )}
      </Column>
    ))}
  </div>
)

export default styled(ColumnsWithButtons)`
  display: flex;

  &:not(:last-child) {
    margin-bottom: var(--spacing-12);
  }

  @media (max-width: 64rem) {
    flex-direction: column;
  }
`

const Column = styled.div`
  flex-grow: 1;
  flex-basis: 0;

  &:not(:last-child) {
    margin-right: var(--spacing-8);
    margin-bottom: var(--spacing-12);
  }
`

const Content = styled.div`
  > p:last-child {
    margin-bottom: var(--spacing-0);
  }

  & + a {
    margin-top: var(--spacing-5);
  }
`
