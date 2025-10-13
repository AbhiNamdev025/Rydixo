import React from "react";
import styles from "./privacy.module.css";
import Header from "../../../header/header";
import Footer from "../../footer";

function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className={styles.policyContainer}>
        <div>
          <h1 className={styles.policyTitle}>Privacy Policy</h1>
        </div>
        <div className={styles.policy}>
          <section className={styles.policySection}>
            <h2>1. Introduction</h2>
            <p>
              This Privacy Policy describes the type of information we collect
              from you, how we use it, and the steps we take to ensure your data
              is secure. By using our services, you agree to the practices
              outlined here.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2>2. Information We Collect</h2>
            <p>
              When you use our services, we may collect personal information
              such as your name, email address, phone number, and payment
              details to process your bookings. We also collect ride information
              like pickup and drop-off locations, trip history, and fare details
              to ensure a smooth booking experience. In addition, we may gather
              device-related details such as your IP address, browser type, and
              operating system for security and optimization purposes. Location
              data is also collected in real-time to enable accurate ride
              matching, navigation, and tracking.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2>3. How We Use Your Information</h2>
            <p>
              The information we collect is used primarily to provide and
              improve our services. This includes processing ride bookings,
              enabling secure payments, and sharing necessary details with
              drivers. We also use the data to enhance user experience, offer
              customer support, prevent fraudulent activities, and maintain the
              overall safety and security of the platform. From time to time, we
              may send you important updates, service notifications, or
              promotional offers, provided you have consented to receive them.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2>4. Sharing of Information</h2>
            <p>
              We do not sell or rent your personal data to third parties.
              However, in order to provide complete services, some of your
              information may be shared with drivers to complete your rides,
              with payment providers to process your transactions, and with
              third-party service providers who support us in analytics,
              customer service, or technical operations. In cases where the law
              requires, we may also share your data with government or
              regulatory authorities.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2>5. Data Security</h2>
            <p>
              We take reasonable and industry-standard measures to secure your
              data against unauthorized access, misuse, or loss. While we
              implement encryption and strict security protocols, please be
              aware that no method of data transmission over the internet can be
              guaranteed to be completely secure.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2>6. Your Rights & Choices</h2>
            <p>
              You have full rights to access and update your personal
              information stored with us. If you no longer wish to use our
              services, you can request deletion of your account and associated
              data. You may also opt out of marketing communications at any
              time. In certain circumstances, you may request restriction on how
              your information is processed.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2>7. Children’s Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 18.
              We do not knowingly collect personal information from minors. If
              we become aware that a child has provided personal data, we will
              take immediate steps to remove such information from our records.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;
