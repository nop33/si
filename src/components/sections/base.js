import React from "react"

const BaseSection = ({ id, children, className }) => {
  return (
    <section id={id} className={`global-content-wrapper ${className || ""}`}>
      {children}
    </section>
  )
}

export default BaseSection
