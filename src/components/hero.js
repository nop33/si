import React from "react"
import heroStyles from "./hero.module.scss"

const Hero = () => {
  return (
    <header className={heroStyles.hero}>
      <div className="global-content-wrapper">
        <h1>Supporting policy-making for future generations</h1>
      </div>
    </header>
  )
}

export default Hero