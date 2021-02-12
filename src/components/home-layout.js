import React from "react"
import homeLayoutStyles from "./home-layout.module.scss"

const HomeLayout = ({ children }) => {
  return <main className={homeLayoutStyles.homeLayout}>{children}</main>
}

export default HomeLayout
