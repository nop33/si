import React from "react"
import { Link } from "gatsby"
import { generateIdFromTitle } from "../utils"
import BaseSection from "../components/base-section"

import styles from "./tabs.module.scss"

const Tabs = ({ sections }) => {
  return (
    <BaseSection className={styles.tabsSection}>
      <div className={styles.tabs}>
        <ul>
          {sections
            .filter(section => !!section.title)
            .map(section => {
              const id = generateIdFromTitle(section.title)
              return (
                <li key={id}>
                  <Link className="golden" to={`#${id}`}>
                    {section.title}
                  </Link>
                </li>
              )
            })}
        </ul>
      </div>
    </BaseSection>
  )
}

export default Tabs
