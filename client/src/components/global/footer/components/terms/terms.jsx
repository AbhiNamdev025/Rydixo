import React from "react";
import styles from "./terms.module.css";
import Header from "../../../header/header";
import Footer from "../../footer";

function TermsAndConditions() {
  return (
    <>
      <Header />
      <div className={styles.termsContainer}>
        <div>
          <h1 className={styles.termsTitle}>Terms and Conditions</h1>
        </div>
        <div className={styles.terms}>
          <section className={styles.termsSection}>
            <h2>1. Use of Services</h2>
            <p>
              Rydixo provides a platform that connects riders with drivers for
              transportation services. You agree to use the Services solely for
              lawful purposes and in accordance with these Terms. Any misuse of
              the platform, such as engaging in fraudulent activities, providing
              false information, or attempting to disrupt operations, is
              strictly prohibited.
            </p>
          </section>

          <section className={styles.termsSection}>
            <h2>2. Account Registration</h2>
            <p>
              To access certain features, you may need to create an account by
              providing accurate personal information. You are responsible for
              maintaining the confidentiality of your account credentials and
              for all activities that occur under your account. If you suspect
              unauthorized use of your account, you must notify us immediately.
            </p>
          </section>

          <section className={styles.termsSection}>
            <h2>3. Booking and Payments</h2>
            <p>
              When booking a ride, you agree to provide accurate details for
              pickup and drop-off locations. Fares are calculated based on time,
              distance, demand, and other factors, and must be paid in full
              through the payment options provided. By using our Services, you
              authorize us to process payments using your selected method.
              Refunds, if applicable, will be handled according to our refund
              policy.
            </p>
          </section>

          <section className={styles.termsSection}>
            <h2>4. Cancellation and Refund Policy</h2>
            <p>
              You may cancel a booking within the allowed time frame specified
              in the app. If you cancel a ride after a driver has been assigned
              or dispatched, cancellation fees may apply. Refunds will only be
              processed as per our cancellation and refund rules, and Rydixo
              reserves the right to decline refund requests in certain cases.
            </p>
          </section>

          <section className={styles.termsSection}>
            <h2>5. Responsibilities of Riders and Drivers</h2>
            <p>
              Riders are expected to behave respectfully towards drivers, their
              vehicles, and fellow passengers. Any abusive, unsafe, or unlawful
              conduct may lead to suspension of your account. Drivers are
              responsible for complying with all legal requirements, maintaining
              valid licenses and insurance, and ensuring passenger safety.
              Rydixo acts only as a technology platform and does not own or
              operate vehicles directly.
            </p>
          </section>

          <section className={styles.termsSection}>
            <h2>7. Termination of Use</h2>
            <p>
              We reserve the right to suspend or terminate your account if you
              violate these Terms, misuse the Services, or engage in unlawful
              activities. You may also choose to terminate your account at any
              time by submitting a request to our support team.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TermsAndConditions;
