import React from "react"

import Image from "gatsby-image"

import { Link } from "gatsby"
import styles from "./card.module.scss"

const Card = ({ url, image, title, subtitle, content }) => {
  return (
    <div className={styles.card}>
      <Link to={url}>
        <article itemScope itemType="http://schema.org/Article">
          <div className={styles.imageContainer}>
            <Image fluid={image} alt={`${title} featured image`} />
          </div>
          <div>
            <header>
              <h3 itemProp="headline">{title}</h3>
              <small>{subtitle}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
                itemProp="description"
              />
            </section>
          </div>
        </article>
      </Link>
    </div>
  )
}

export default Card
