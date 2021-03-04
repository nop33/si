import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faLink } from "@fortawesome/free-solid-svg-icons"

import styles from "./social-links.module.scss"

const SocialLinks = ({ website, linkedin, twitter }) => {
  return (
    <div className={styles.socialLinks}>
      {website && (
        <a
          href={website}
          className="golden"
          rel="nofollow noopener"
          title="website"
        >
          <FontAwesomeIcon icon={faLink} />
        </a>
      )}
      {linkedin && (
        <a
          href={linkedin}
          className="golden"
          rel="nofollow noopener"
          title="LinkedIn"
        >
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
      )}
      {twitter && (
        <a
          href={twitter}
          className="golden"
          rel="nofollow noopener"
          title="Twitter"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      )}
    </div>
  )
}

export default SocialLinks
