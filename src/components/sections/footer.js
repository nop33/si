import React from "react"

import { Link, useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import BaseSection from "./base"
import ArrowedLink from "../arrowed-link"
import styles from "./footer.module.scss"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      logoSmall: file(absolutePath: { regex: "/logo-small.png/" }) {
        childImageSharp {
          fixed(width: 50, quality: 95) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }
      }
    }
  `)

  return (
    <footer>
      <BaseSection className={styles.footerSection}>
        <div className={styles.linksSection}>
          <Link to="/">
            <Image fixed={data.logoSmall.childImageSharp.fixed} alt="SI logo" />
          </Link>
          <div className={styles.linksList}>
            <div>
              <ArrowedLink direction="right" to="/get-involved/#donate">
                Donate
              </ArrowedLink>
            </div>
            <div>
              <ArrowedLink direction="right" to="/get-involved/#work-with-us">
                Subscribe
              </ArrowedLink>
            </div>
            <div>
              <ArrowedLink direction="right" to="/get-involved/#work-with-us">
                Contact
              </ArrowedLink>
            </div>
          </div>
        </div>
        <small className={styles.copywriteSection}>
          <div>
            © {new Date().getFullYear()} Simon Institute of Longterm Governance.
            All rights reserved.
          </div>
          <Link to="/legal">Terms &#38; Conditions</Link>
        </small>
      </BaseSection>
    </footer>
  )
}

export default Footer
