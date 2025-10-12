import React, { useState } from "react";
import styles from "./contactsection.module.css";
import { Mail, MapPin, Phone } from "lucide-react";
import contactImage from "../../../assets/images/contactpage/image.png";
import { toast } from "react-toastify";
const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    number: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:2525/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully!");
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          number: "",
          email: "",
          message: "",
        });
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      console.error("Error sending form data:", err);
      alert("An error occurred. Try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.title}>
          <h2>Let’s Talk!</h2>
          <p>Get in touch with us …</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.formItem}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className={styles.formItem}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <div className={styles.formItem}>
            <label htmlFor="number">Phone No.</label>
            <input
              type="text"
              id="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className={styles.formItem}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className={styles.formItem}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type something..."
              required
            />
          </div>

          <div className={styles.checks}>
            <label>
              <input type="checkbox" required /> I agree to receive other
              communication messages.
            </label>
            <label>
              <input type="checkbox" required /> I give my consent to RYDIXO
              presenter to store my data.
            </label>
          </div>
          <button type="submit">Submit</button>
          <p className={styles.policy}>
            RYDIXO presenter, a project of RYDIXO, is committed to protecting
            and respecting your privacy according to our Privacy Policy. From
            time to time we would deal.
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
