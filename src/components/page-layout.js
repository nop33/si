import React from "react"

import NavigationMenu from "./navigation-menu"

import styles from "./page-layout.module.scss"

const PageLayout = ({ location, title, subtitle, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  const className = isRootPath ? styles.homepage : styles.subpage

  return (
    <div className={`${styles.allPages} ${className}`}>
      <header>
        <div
          className={`global-content-wrapper ${styles.headerContentWrapper}`}
        >
          <NavigationMenu></NavigationMenu>
          <div>
            <h1>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer></footer>
    </div>
  )
}

export default PageLayout
