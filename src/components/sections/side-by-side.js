import React from "react"
import {
  sideBySide,
  wide,
  elevatedTitle,
  headerSection,
  contentSection,
} from "./side-by-side.module.scss"

const SideBySide = ({ title, header, children, isWide, elevateTitle }) => {
  return (
    <div
      className={`${sideBySide} ${isWide ? wide : ""} ${
        elevateTitle ? elevatedTitle : ""
      }`}
    >
      <div className={headerSection}>{title ? <h2>{title}</h2> : header}</div>
      <div className={contentSection}>{children}</div>
    </div>
  )
}

export default SideBySide
