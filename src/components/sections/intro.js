import React from "react"
import introStyles from "./intro.module.scss"

const Intro = () => {
  return (
    <div className={introStyles.intro}>
      <p className="large-p">
        Public policy is the result of the interaction of a myriad of actors
        representing different interests. The Simon Institute for Longterm
        Governance (SI) increases the capacity of policy networks to anticipate
        global catastrophic risks and build resilience for civilization to
        flourish.
      </p>
    </div>
  )
}

export default Intro
