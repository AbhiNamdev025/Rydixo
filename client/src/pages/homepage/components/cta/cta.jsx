import React from "react";
import styles from "./cta.module.css";
import { Link } from "react-router-dom";

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
          <Link to="/book-ride" className={styles.ctaButton}>
            Choose Your Ride
          </Link>
        </div>
      </section>
    </>
  );
}

export default Cta;
