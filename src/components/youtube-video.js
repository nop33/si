import React from "react"

import { video, responsiveIframe } from "./youtube-video.module.scss"

const YouTubeVideo = ({ src, title }) => {
  var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/
  var match = src.match(regExp)

  return (
    <div className={video}>
      <iframe
        className={responsiveIframe}
        src={`https://www.youtube.com/embed/${match[1]}`}
        title={title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowFullScreen
      />
    </div>
  )
}

export default YouTubeVideo
