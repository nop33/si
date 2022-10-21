import React from "react"

import Image from "gatsby-image"

import { Link } from "gatsby"
import { card, imageContainer } from "./card.module.scss"

const Card = ({ url, image, title, subtitle, content }) => {
  return (
    <div className={card}>
      <Link to={url}>
        <article itemScope itemType="http://schema.org/Article">
          <div className={imageContainer}>
            <Image
              fluid={image}
              style={{ height: "100%" }}
              alt={`${title} featured image`}
            />
          </div>
          <div>
            <header>
              <h3 itemProp="headline">{title}</h3>
              <small>{subtitle}</small>
            </header>
            <section>
              <div
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
