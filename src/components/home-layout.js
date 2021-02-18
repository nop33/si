import React from "react"

import Hero from "../components/hero"
import homeLayoutStyles from "./home-layout.module.scss"

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Hero></Hero>
      <main className={homeLayoutStyles.homeLayout}>{children}</main>
    </div>
  )
}

export default HomeLayout
