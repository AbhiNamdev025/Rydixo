import React from "react";
import styles from "./hero.module.css";
import { FaArrowRight } from "react-icons/fa6";
function Hero() {
  return (
    <div className={styles.heroSection}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Why Travel With Rydixo ?</h1>
          <p>Rydixo - Best outstation taxi service in India</p>
        </div>

        <div className={styles.heroForm}>
          <div className={styles.formTabs}>
            <div className={`${styles.tabActive} ${styles.tab} `}>Daily</div>
            <div className={styles.tab}>Rental</div>
            <div className={styles.tab}>Outstation</div>
          </div>

          <form className={styles.bookingForm}>
            <div className={styles.formGroup}>
              <label htmlFor="pickup">From</label>
              <input
                type="text"
                id="pickup"
                placeholder="Enter pickup location"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="destination">To</label>
              <input type="text" id="destination" placeholder="Destination" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="date">Date</label>
              <input type="date" id="date" placeholder="Enter the Date" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="time">Time</label>
              <input type="time" name="time" id="time" />
            </div>
            <button type="submit" className={styles.searchButton}>
              <p>Search</p>
              <FaArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Hero;
