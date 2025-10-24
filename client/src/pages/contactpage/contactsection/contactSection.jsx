import React, { useState } from "react";
import styles from "./contactsection.module.css";
import { Mail, MapPin, Phone } from "lucide-react";
import contactImage from "../../../../public/assets/images/contactpage/image.png";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../const/const";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    number: "",
    email: "",
    message: "",
  });
  const [communicationChecked, setCommunicationChecked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const storeEmailSubscription = async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error("Error storing email subscription:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (result.success) {
        if (communicationChecked && formData.email) {
          const emailStored = await storeEmailSubscription(formData.email);
          if (emailStored) {
            toast.success("Message sent successfully and email subscribed!");
          } else {
            toast.success("Message sent successfully!");
          }
        } else {
          toast.success("Message sent successfully!");
        }

        setFormData({
          firstName: "",
          lastName: "",
          number: "",
          email: "",
          message: "",
        });
        setCommunicationChecked(false);
        setChecked(false);
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Error sending form data:", err);
      toast.error("An error occurred. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.title}>
          <h2>Let's Talk!</h2>
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
                pattern="^[A-Za-z]{3,10}$"
                title="First name should be 3-10 letters only"
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
                pattern="^[A-Za-z]{3,10}$"
                title="Last name should be 3-10 letters only"
              />
            </div>
          </div>

          <div className={styles.formItem}>
            <label htmlFor="number">Phone No.</label>
            <input
              type="tel"
              id="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              pattern="^[6-9]\d{9}$"
              title="Phone number should start with 6–9 and be 10 digits"
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
              minLength={10}
              maxLength={500}
              style={{ height: "150px", resize: "none" }}
            />
          </div>

          <div className={styles.checks}>
            <label>
              <input
                type="checkbox"
                checked={communicationChecked}
                onChange={(e) => setCommunicationChecked(e.target.checked)}
              />
              I agree to receive other communication messages.
            </label>
            <label>
              <input
                type="checkbox"
                required
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              I give my consent to RYDIXO presenter to store my data.
            </label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>

          <p className={styles.policy}>
            RYDIXO presenter, a project of RYDIXO, is committed to protecting
            and respecting your privacy according to our Privacy Policy.
          </p>
        </form>
      </div>

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
