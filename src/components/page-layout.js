import React from "react"

import NavigationMenu from "./navigation-menu"

import styles from "./page-layout.module.scss"

const PageLayout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  // let header

  // if (isRootPath) {
  //   header = (
  //     <h1 className="main-heading">
  //       <Link to="/">{title}</Link>
  //     </h1>
  //   )
  // } else {
  //   header = (
  //     <Link className="header-link-home" to="/">
  //       {title}
  //     </Link>
  //   )
  // }

  const className = isRootPath ? styles.homepage : styles.subpage

  return (
    <div className={`${styles.allPages} ${className}`}>
      <header>
        <div
          className={`global-content-wrapper ${styles.headerContentWrapper}`}
        >
          <NavigationMenu></NavigationMenu>
          <h1>{title}</h1>
        </div>
      </header>
      <main>{children}</main>
      <footer></footer>
    </div>
  )
}

export default PageLayout
