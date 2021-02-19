import React from "react"
import { Link } from "gatsby"

import NavigationMenu from "./navigation-menu"
import BaseSection from "./sections/base"

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
      <footer>
        <BaseSection className={styles.footerSection}>
          <div className={styles.linksSection}>
            <div>
              <Link className="golden" to="/get-involved/#support-our-work">
                Donate
              </Link>
            </div>
            <div>
              <Link className="golden" to="/get-involved/#work-with-us">
                Subscribe
              </Link>
            </div>
            <div>
              <Link className="golden" to="/get-involved/#work-with-us">
                Contact
              </Link>
            </div>
          </div>
          <div className={styles.copywriteSection}>
            © {new Date().getFullYear()} Simon Institute of Longterm Governance.
            All rights reserved.
          </div>
        </BaseSection>
      </footer>
    </div>
  )
}

export default PageLayout
