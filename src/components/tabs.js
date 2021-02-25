import React from "react"
import { Link } from "gatsby"
import { generateIdFromTitle } from "../utils"
import BaseSection from "../components/sections/base"

import styles from "./tabs.module.scss"

const Tabs = ({ titles }) => {
  return (
    <BaseSection className={styles.tabsSection}>
      <div className={styles.tabs}>
        <ul>
          {titles
            .filter(title => !!title)
            .map(title => {
              const id = generateIdFromTitle(title)
              return (
                <li key={id}>
                  <Link className="golden" to={`#${id}`}>
                    {title}
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
