import React from "react"

import { siForm, intro as introStyles, fieldGroup } from "./si-form.module.scss"

const NewsletterForm = ({ intro }) => {
  return (
    <form
      className={siForm}
      action="https://simoninstitute.us1.list-manage.com/subscribe/post?u=5d7bba8c78d25d980050b3a16&amp;id=dfb580ce4c"
      method="post"
    >
      {intro && (
        <div
          className={introStyles}
          dangerouslySetInnerHTML={{
            __html: intro,
          }}
        />
      )}
      <div>
        <div className={fieldGroup}>
          <label htmlFor="mce-NAME">Name</label>
          <input id="mce-NAME" type="text" name="NAME" aria-label="Name" />
        </div>
        <div className={fieldGroup}>
          <label htmlFor="mce-EMAIL">Email</label>
          <input
            id="mce-EMAIL"
            type="email"
            name="EMAIL"
            aria-label="email"
            required
          />
        </div>
        <div
          style={{ position: "absolute", left: "-5000px" }}
          aria-hidden="true"
        >
          <input
            type="text"
            name="b_5d7bba8c78d25d980050b3a16_dfb580ce4c"
            tabIndex="-1"
          />
        </div>
      </div>
      <button type="submit" className="si-button">
        Subscribe
      </button>
    </form>
  )
}

export default NewsletterForm
