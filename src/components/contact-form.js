import React from "react"

import { siForm, intro as introStyles, fieldGroup } from "./si-form.module.scss"

const ContactForm = ({ intro }) => {
  return (
    <form
      className={siForm}
      // action="https://usebasin.com/f/1c08954fd352"
      // method="post"
    >
      {intro && (
        <div
          className={introStyles}
          dangerouslySetInnerHTML={{
            __html: intro,
          }}
        />
      )}
      {/* <div>
        <div className={fieldGroup}>
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            aria-label="Name"
            required
          />
        </div>
        <div className={fieldGroup}>
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            aria-label="email"
            required
          />
        </div>
        <div className={fieldGroup}>
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
          <input type="text" name="_gotcha" tabIndex="-1" />
        </div>
      </div> */}
      <a
        type="submit"
        className="si-button"
        href="https://docs.google.com/forms/d/e/1FAIpQLSfHK3ru-oDw0aMlwchX7VCZq8ELCDzEAV34FyCEpNgphVARmg/viewform"
        target="_blank"
      >
        Contact form
      </a>
    </form>
  )
}

export default ContactForm
