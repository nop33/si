import React from "react"

import YouTubeVideo from "./youtube-video"

import styles from "./video-list.module.scss"

const YouTubeVideoList = ({ videos }) => {
  return (
    <div className={styles.videoList}>
      {videos.map(video => {
        return (
          <YouTubeVideo src={video.src} title={video.title} key={video.title} />
        )
      })}
    </div>
  )
}

export default YouTubeVideoList
