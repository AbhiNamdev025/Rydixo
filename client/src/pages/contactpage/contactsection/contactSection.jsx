import React from "react";
import styles from "./contactsection.module.css";
import { Mail, MapPin, Phone } from "lucide-react";
import contactImage from "../../../assets/images/contactpage/image.png";
const ContactSection = () => {
  return (
    <div className={styles.container}>
      {/* Left  */}

      <div className={styles.formContainer}>
        <div className={styles.title}>
          <h2>Let’s Talk!</h2>
          <p>
            Get in touch with us using the enquiry form or contact details
            below.
          </p>
        </div>

        <form className={styles.form}>
          <div className={styles.row}>
            <div className={styles.formItem}>
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                id="first-name"
              />
            </div>
            <div className={styles.formItem}>
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                id="last-name"
              />
            </div>
          </div>

          <div className={styles.formItem}>
            <label htmlFor="number">Phone No. </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              id="number"
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter your Email" id="email" />
          </div>

          <div className={styles.formItem}>
            <label htmlFor="message">Message</label>
            <textarea
              placeholder="Type something......"
              id="message"
            ></textarea>
          </div>

          <button type="submit">Submit</button>

          <div className={styles.checks}>
            <label>
              <input type="checkbox" /> I agree to receive other communication
              messages.
            </label>
            <label>
              <input type="checkbox" /> I give my consent to RYDXO presenter to
              store my data.
            </label>
          </div>

          <p className={styles.policy}>
            RYDXO presenter, a project of RYDXO, is committed to protecting and
            respecting your privacy according to our Privacy Policy. From time
            to time we would deal.
          </p>
        </form>
      </div>

      {/* Right */}
      <div className={styles.infoContainer}>
        <img
          src={contactImage}
          alt="Driving instructor"
          className={styles.image}
        />

        <div className={styles.details}>
          <div className={styles.item}>
            <Phone className={styles.icon} />
            <div className={styles.itemInfo}>
              <h4>Phone Number</h4>
              <p>+91 987654321 | +91 987654321</p>
            </div>
          </div>

          <div className={styles.item}>
            <Mail className={styles.icon} />
            <div className={styles.itemInfo}>
              <h4>Quick Contact</h4>
              <p>info@rydixo.com</p>
            </div>
          </div>

          <div className={styles.item}>
            <MapPin className={styles.icon} />
            <div className={styles.itemInfo}>
              <h4>Location</h4>
              <p>abc, Ambala, Haryana, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
