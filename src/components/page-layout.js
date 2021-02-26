import React from "react"
import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"

import NavigationMenu from "./navigation-menu"
import Footer from "./sections/footer"

import styles from "./page-layout.module.scss"

const PageLayout = ({ location, title, subtitle, children, backLink }) => {
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
      <main>
        {backLink ? (
          <Link to={backLink} className="golden backLink">
            <FontAwesomeIcon icon={faChevronLeft} /> Back
          </Link>
        ) : (
          ""
        )}
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default PageLayout
