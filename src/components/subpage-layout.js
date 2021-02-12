import React from "react"
import subpageLayoutStyles from "./subpage-layout.module.scss"

const SubpageLayout = ({ title, children }) => {
  return (
    <div className={subpageLayoutStyles.subpage}>
      <header>
        <div className="global-content-wrapper">
          <h1>{title}</h1>
        </div>
      </header>
      <main>{children}</main>
      <footer></footer>
    </div>
  )
}

export default SubpageLayout
