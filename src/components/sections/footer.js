import React from "react"

import { Link, useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import BaseSection from "./base"
import ArrowedLink from "../arrowed-link"
import styles from "./footer.module.scss"

import footer from "../../content/_configuration/footer.yaml"

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
            {footer.links.map(link => {
              return (
                <ArrowedLink
                  direction="right"
                  to={link.url}
                  key={`footer_${link.url}`}
                >
                  {link.title}
                </ArrowedLink>
              )
            })}
          </div>
        </div>
        <div className={styles.copywriteSection}>
          <small>© {new Date().getFullYear()} SI</small>
          <small>
            <Link to="/legal/">Legal</Link>
          </small>
        </div>
      </BaseSection>
    </footer>
  )
}

export default Footer
