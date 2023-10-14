import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import BackgroundImage from "gatsby-background-image"

import { updateSrcSet } from "../utils"

import { headerBackground } from "./header-background.module.scss"

const HeaderBackground = ({ children, className }) => {
  const data = useStaticQuery(
    graphql`
      query {
        desktop: file(relativePath: { eq: "lake-geneva.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `
  )

  // Set ImageData.
  const imageData = data.desktop?.childImageSharp?.fluid
  if (imageData) {
    imageData.srcSet = updateSrcSet(imageData.srcSet, 1920)
  }

  return (
    <BackgroundImage
      Tag="section"
      className={`${headerBackground} ${className} header-background`}
      fluid={imageData}
      backgroundColor={`#040e18`}
    >
      {children}
    </BackgroundImage>
  )
}

export default HeaderBackground
