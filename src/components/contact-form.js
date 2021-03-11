import React from "react"

import * as styles from "./si-form.module.scss"

const ContactForm = ({ intro }) => {
  return (
    <form
      className={styles.siForm}
      action="https://usebasin.com/f/1c08954fd352"
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
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            aria-label="Name"
            required
          />
        </div>
        <div className={styles.fieldGroup}>
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            aria-label="email"
            required
          />
        </div>
        <div className={styles.fieldGroup}>
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            cols="30"
            rows="3"
            aria-label="message"
            required
          ></textarea>
        </div>
        <div
          style={{ position: "absolute", left: "-5000px" }}
          aria-hidden="true"
        >
          <input type="text" name="_gotcha" tabindex="-1" />
        </div>
      </div>
      <button type="submit" class="si-button">
        Send
      </button>
    </form>
  )
}

export default ContactForm
