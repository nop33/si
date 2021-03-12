import React from "react"

import PageLayout from "../components/page-layout"
import BaseSection from "../components/sections/base"
import ArrowedLink from "../components/arrowed-link"

import data from "../content/_configuration/404.yaml"

const NotFoundPage = ({ location }) => {
  return (
    <PageLayout location={location} title={data.title} subtitle={data.subtitle}>
      <BaseSection>
        <ArrowedLink direction="left" to={data.link.url}>
          {data.link.text}
        </ArrowedLink>
      </BaseSection>
    </PageLayout>
  )
}

export default NotFoundPage
