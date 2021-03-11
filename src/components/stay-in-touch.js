import React from "react"

import NewsletterForm from "./newsletter-form"
import SocialLinks from "./social-links"

import * as styles from "./stay-in-touch.module.scss"

const StayInTouch = ({
  newsletterTitle,
  newsletterIntro,
  socialMediaTitle,
  socialMediaIntro,
  twitterLink,
  linkedInLink,
}) => {
  return (
    <div>
      <div className={styles.newsletter}>
        {newsletterTitle && <h3>{newsletterTitle}</h3>}
        <NewsletterForm intro={newsletterIntro} />
      </div>
      <div>
        {socialMediaTitle && <h3>{socialMediaTitle}</h3>}
        {socialMediaIntro && (
          <div
            dangerouslySetInnerHTML={{
              __html: socialMediaIntro,
            }}
          />
        )}
        <SocialLinks
          wide
          size="2x"
          twitter={twitterLink}
          linkedin={linkedInLink}
        />
      </div>
    </div>
  )
}

export default StayInTouch
