import React from "react"
import { Link } from "gatsby"

import NavigationMenu from "./navigation-menu"
import Footer from "./sections/footer"

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
          <div className={styles.textContent}>
            <h1>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </div>
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default PageLayout
