import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import ArrowedLink from "../arrowed-link"

import Card from "../card"
import styles from "./three-cards.module.scss"

const ThreeCards = ({ cardsData, sectionTitle, seeMoreLink }) => {
  return (
    <div className={styles.cardsSection}>
      <h2>{sectionTitle}</h2>

      <div className={styles.cardsWrapper}>
        {cardsData.map(cardData => {
          const title = cardData.frontmatter.title || cardData.fields.slug
          const featuredImgFluid =
            cardData.frontmatter.featuredImage.childImageSharp.fluid

          return (
            <Card key={cardData.fields.slug}>
              <Link to={cardData.fields.slug}>
                <article itemScope itemType="http://schema.org/Article">
                  <Img fluid={featuredImgFluid} />
                  <div>
                    <header>
                      <h3 itemProp="headline">{title}</h3>
                      <small>{cardData.frontmatter.date}</small>
                    </header>
                    <section>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            cardData.frontmatter.description ||
                            cardData.excerpt,
                        }}
                        itemProp="description"
                      />
                    </section>
                  </div>
                </article>
              </Link>
            </Card>
          )
        })}
      </div>
      <ArrowedLink
        direction="right"
        to={seeMoreLink}
        text="See more"
        className={styles.seeMoreLink}
      />
    </div>
  )
}

export default ThreeCards
