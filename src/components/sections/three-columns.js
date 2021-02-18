import React from "react"
import { Link } from "gatsby"
import threeColumnsStyles from "./three-columns.module.scss"

const Columns = () => {
  return (
    <div className={threeColumnsStyles.columnsWrapper}>
      <div className={threeColumnsStyles.column}>
        <h2>Approach</h2>
        <div>
          <p className="font-size-2">
            We aim for longterm impact by discreetly supporting multilateral
            institutions.
          </p>
        </div>
        <Link to="/about">Learn more</Link>
      </div>
      <div className={threeColumnsStyles.column}>
        <h2>Research & ideas</h2>
        <div>
          <p className="font-size-2">
            We openly share our strategic thinking, lessons learned and
            research.
          </p>
        </div>
        <Link to="/research">Learn more</Link>
      </div>
      <div className={threeColumnsStyles.column}>
        <h2>Projects</h2>
        <div>
          <p className="font-size-2">
            We build tools and networks, give advice and experiment
            systematically.
          </p>
        </div>
        <Link to="/projects">Learn more</Link>
      </div>
    </div>
  )
}

export default Columns
