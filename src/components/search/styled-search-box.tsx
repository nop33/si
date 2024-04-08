import styled, { css } from "styled-components"
import SearchBox from "./search-box"

const open = css`
  width: 20em;
  background: ${({ theme }) => theme.background};
  cursor: text;
  margin-left: -1.8em;
  padding-left: 1.6em;
  border: 1px solid var(--color-si-mustard);
  padding: var(--spacing-3) var(--spacing-8);
  border-radius: 2rem;
`

const closed = css`
  width: 0;
  background: transparent;
  cursor: pointer;
  margin-left: -2.6em;
  padding-left: 2.6em;
  height: 2em;
`

export default styled(SearchBox)<{ hasFocus?: boolean }>`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin-bottom: 0;

  .SearchInput {
    outline: none;
    border: ${({ hasFocus }) => (hasFocus ? "auto" : "none")};
    font-size: 1em;
    transition: 100ms;
    border-radius: 2px;
    color: ${({ theme }) => theme.foreground};
    ::placeholder {
      color: ${({ theme }) => theme.faded};
    }
    ${({ hasFocus }) => (hasFocus ? open : closed)}
  }

  .SearchIcon {
    width: 1.4em;
    margin: 0.3em;
    color: ${({ theme }) => theme.foreground};
    pointer-events: none;
  }
`
