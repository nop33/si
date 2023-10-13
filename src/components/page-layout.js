import React from "react"
import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"

import HeaderBackground from "./header-background"
import NavigationMenu from "./navigation-menu"
import Footer from "./sections/footer"

import {
  homepage,
  subpage,
  headerContentWrapper,
  textContent,
  subtitle as subtitleStyles,
  headerLinks as headerLinksStyles,
  allPages,
  hasImageBackground,
} from "./page-layout.module.scss"

const PageLayout = ({
  location,
  title,
  subtitle,
  headerLinks = false,
  children,
  backLink = false,
  backLinkText = false,
  withImageBackgroundHeader = false,
}) => {
  const rootPath = "/"
  const isRootPath = location.pathname === rootPath

  const className = isRootPath ? homepage : subpage

  const headerContent = (
    <div className={`global-content-wrapper ${headerContentWrapper}`}>
      <NavigationMenu
        hasBackgroundImage={withImageBackgroundHeader}
      ></NavigationMenu>
      <div className={textContent}>
        <h1>{title}</h1>
        {subtitle && <div className={subtitleStyles}>{subtitle}</div>}
        {headerLinks && <div className={headerLinksStyles}>{headerLinks}</div>}
      </div>
    </div>
  )

  return (
    <article className={`${allPages} ${className}`}>
      <header className={withImageBackgroundHeader ? hasImageBackground : ""}>
        {withImageBackgroundHeader ? (
          <HeaderBackground>{headerContent}</HeaderBackground>
        ) : (
          headerContent
        )}
      </header>
      <main>
        {backLink && (
          <Link to={backLink} className="golden backLink">
            <FontAwesomeIcon icon={faChevronLeft} /> {backLinkText}
          </Link>
        )}
        {children}
      </main>
      <Footer />
    </article>
  )
}

export default PageLayout
