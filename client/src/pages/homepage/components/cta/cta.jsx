import React from "react";
import styles from "./cta.module.css";
function Cta() {
  return (
    <>
      <section className={styles.ctaSection}>
        <div className={styles.content}>
          <div className={styles.info}>
            <h2>
              Call now and book <br /> our taxi for your next ride
            </h2>
            <p>Call 24-hour service available</p>
          </div>
          <div className={styles.ctaButton}>Choose Your Ride</div>
        </div>
      </section>
    </>
  );
}

export default Cta;
