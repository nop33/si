import React from "react"

import Image from "gatsby-image"

import styles from "./image-list.module.scss"

const ImageList = ({ images }) => {
  return (
    <div className={styles.imageList}>
      {images.map((sectionImage, index) => {
        return (
          <Image
            fluid={sectionImage.image.childImageSharp.fluid}
            alt={sectionImage.alt}
            key={`${sectionImage.alt}-${index}`}
          />
        )
      })}
    </div>
  )
}

export default ImageList
