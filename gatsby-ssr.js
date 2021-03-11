const React = require("react")

const PostBodyComponents = [
  <script
    dangerouslySetInnerHTML={{
      __html: `if (window.location.host !== 'simoninstitute.ch') window.goatcounter = {no_onload: true}`,
    }}
  />,
  <script
    data-goatcounter="https://simoninstitute.goatcounter.com/count"
    async
    src="//gc.zgo.at/count.js"
  ></script>,
]

exports.onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents(PostBodyComponents)
}
