import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"

import styles from "./navigation-menu.module.scss"

const NavigationMenu = () => {
  const data = useStaticQuery(graphql`
    query LogoQuery {
      logo: file(absolutePath: { regex: "/logo.png/" }) {
        childImageSharp {
          fixed(width: 250, quality: 95) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }
      }
    }
  `)
  const logo = data?.logo?.childImageSharp?.fixed

  return (
    <div className={styles.menu}>
      <div className={styles.logoContainer}>
        <Link to="/">{logo && <Image fixed={logo} alt="SI logo" />}</Link>
      </div>
      <div className={styles.menuItemsContainer}>
        <Link className="golden" to="/about">
          About
        </Link>
        <Link className="golden" to="/research">
          Research
        </Link>
        <Link className="golden" to="/projects">
          Projects
        </Link>
        <Link className="golden" to="/get-involved">
          Get Involved
        </Link>
        <Link className="golden" to="/blog">
          Blog
        </Link>
      </div>
    </div>
  )
}

export default NavigationMenu
