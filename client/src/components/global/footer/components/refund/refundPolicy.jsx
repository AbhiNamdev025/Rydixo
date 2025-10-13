import React from "react";
import styles from "./refund.module.css";
import Header from "../../../header/header";
import Footer from "../../footer";

function RefundPolicy() {
  return (
    <>
      <Header />
      <div className={styles.policyContainer}>
        <div>
          <h1 className={styles.policyTitle}>Rydixo Refund Policy</h1>
        </div>
        <div className={styles.policy}>
          <section className={styles.policySection}>
            <p>
              At Rydixo, we value our customers and aim to provide a smooth and reliable booking experience. Below are the refund guidelines:
            </p>
          </section>

          <section className={styles.policySection}>
            <h2>Eligible for Refund</h2>
            <div className={styles.sectionContent}>
              <p>
                <strong>Driver/Car Unavailable –</strong> If the booked cab is not available at the scheduled time.
              </p>
              <p>
                <strong>Booking Cancelled by Rydixo –</strong> Full refund will be initiated.
              </p>
              <p>
                <strong>Payment Deducted but Booking Failed –</strong> The full amount will be refunded to the original payment method.
              </p>
            </div>
          </section>

          <section className={styles.policySection}>
            <h2>Not Eligible for Refund</h2>
            <div className={styles.sectionContent}>
              <p>
                <strong>Last-Minute Cancellation by Customer –</strong> Cancellation within 1 hour of pickup time will not be refunded.
              </p>
              <p>
                <strong>No-Show –</strong> If the customer does not show up at the pickup location.
              </p>
              <p>
                <strong>Partially Used Ride –</strong> Refund is not applicable once the trip has started.
              </p>
            </div>
          </section>

          <section className={styles.policySection}>
            <h2>Refund Timeline</h2>
            <p>
              Refunds will be processed within 5–7 business days to the original payment source.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2>Support</h2>
            <p>
              For refund-related queries, please contact us at <strong>support@rydixo.com</strong> or call <strong>+91-XXXXXXXXXX</strong>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RefundPolicy;
