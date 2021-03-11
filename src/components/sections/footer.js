import React from "react"

import { Link, useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";

import BaseSection from "./base"
import ArrowedLink from "../arrowed-link"
import * as styles from "./footer.module.scss"

const Footer = () => {
  const data = useStaticQuery(graphql`{
  site {
    siteMetadata {
      footerLinks {
        title
        url
      }
    }
  }
  logoSmall: file(absolutePath: {regex: "/logo-small.png/"}) {
    childImageSharp {
      gatsbyImageData(width: 50, quality: 95, placeholder: NONE, layout: FIXED)
    }
  }
}
`)

  return (
    <footer>
      <BaseSection className={styles.footerSection}>
        <div className={styles.linksSection}>
          <Link to="/">
            <GatsbyImage image={data.logoSmall.childImageSharp.gatsbyImageData} alt="SI logo" />
          </Link>
          <div className={styles.linksList}>
            {data.site.siteMetadata.footerLinks.map(link => {
              return (
                <ArrowedLink direction="right" to={link.url}>
                  {link.title}
                </ArrowedLink>
              )
            })}
          </div>
        </div>
        <small className={styles.copywriteSection}>
          <div>© {new Date().getFullYear()} SI</div>
          <Link to="/legal">Privacy Policy</Link>
        </small>
      </BaseSection>
    </footer>
  );
}

export default Footer
