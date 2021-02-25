import React from "react"

import { Link, useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import BaseSection from "./base"
import styles from "./footer.module.scss"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      logoSmall: file(absolutePath: { regex: "/logo-circle.png/" }) {
        childImageSharp {
          fixed(width: 80, quality: 95) {
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
          <Image fixed={data.logoSmall.childImageSharp.fixed} />
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
  )
}

export default Footer
