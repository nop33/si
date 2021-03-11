import React from "react"

import styles from "./contact-form.module.scss"

const ContactForm = ({ intro }) => {
  return (
    <form
      className={styles.contactForm}
      action="https://usebasin.com/f/1c08954fd352"
      method="POST"
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
        <input
          type="text"
          name="name"
          aria-label="Name"
          placeholder="Name*"
          required
        />
        <input
          type="email"
          name="email"
          aria-label="email"
          placeholder="Email*"
          required
        />
        <textarea
          name="message"
          cols="30"
          rows="3"
          aria-label="message"
          placeholder="Message*"
          required
        ></textarea>
        <input type="hidden" name="_gotcha"></input>
      </div>
      <button type="submit" class="si-button">
        Send
      </button>
    </form>
  )
}

export default ContactForm
