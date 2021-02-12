import React from "react"

const SubpageLayout = ({ title, children }) => {
  return (
    <div>
      <header className="subpage-header">
        <h1>{title}</h1>
      </header>
      <main>{children}</main>
      <footer></footer>
    </div>
  )
}

export default SubpageLayout
