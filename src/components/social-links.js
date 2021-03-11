import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { faLink } from "@fortawesome/free-solid-svg-icons"

import styles from "./social-links.module.scss"

const SocialLinks = ({
  website,
  linkedin,
  twitter,
  size = "1x",
  centered,
  wide,
  topSpacing,
  bottomSpacing,
}) => {
  return (
    <div
      className={`
        ${styles.socialLinks}
        ${centered && styles.centered}
        ${wide && styles.wide}
        ${topSpacing && styles.topSpacing}
        ${bottomSpacing && styles.bottomSpacing}
      `}
    >
      {website && (
        <a
          href={website}
          className="golden"
          rel="nofollow noopener noreferrer"
          target="_blank"
          title="website"
        >
          <FontAwesomeIcon icon={faLink} />
        </a>
      )}
      {linkedin && (
        <a
          href={linkedin}
          className="golden"
          rel="nofollow noopener noreferrer"
          target="_blank"
          title="LinkedIn"
        >
          <FontAwesomeIcon size={size} icon={faLinkedinIn} />
        </a>
      )}
      {twitter && (
        <a
          href={twitter}
          className="golden"
          rel="nofollow noopener noreferrer"
          target="_blank"
          title="Twitter"
        >
          <FontAwesomeIcon size={size} icon={faTwitter} />
        </a>
      )}
    </div>
  )
}

export default SocialLinks
