import React, { ReactNode } from "react"
import {
  sideBySide,
  wide,
  elevatedTitle,
  headerSection,
  contentSection,
} from "./side-by-side.module.scss"

interface SideBySideProps {
  title: string
  children: ReactNode
  isWide?: boolean
  elevateTitle?: boolean
}

const SideBySide = ({
  title,
  children,
  isWide,
  elevateTitle,
}: SideBySideProps) => {
  return (
    <div
      className={`${sideBySide} ${isWide ? wide : ""} ${
        elevateTitle ? elevatedTitle : ""
      }`}
    >
      <div className={headerSection}>
        <h2>{title}</h2>
      </div>
      <div className={contentSection}>{children}</div>
    </div>
  )
}

export default SideBySide
