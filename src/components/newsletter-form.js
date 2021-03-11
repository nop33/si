import React from "react"

import styles from "./si-form.module.scss"

const NewsletterForm = ({ intro }) => {
  return (
    <form
      className={styles.siForm}
      action="https://simoninstitute.us1.list-manage.com/subscribe/post?u=5d7bba8c78d25d980050b3a16&amp;id=dfb580ce4c"
      method="post"
    >
      {intro && (
        <div
          className={styles.intro}
          dangerouslySetInnerHTML={{
            __html: intro,
          }}
        />
      )}
      <div>
        <div className={styles.fieldGroup}>
          <label htmlFor="mce-NAME">Name</label>
          <input id="mce-NAME" type="text" name="NAME" aria-label="Name" />
        </div>
        <div className={styles.fieldGroup}>
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
            tabindex="-1"
            value=""
          />
        </div>
      </div>
      <button type="submit" class="si-button">
        Subscribe
      </button>
    </form>
  )
}

export default NewsletterForm
