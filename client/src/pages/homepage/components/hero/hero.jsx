import React, { useState } from "react";
import styles from "./hero.module.css";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [activeTab, setActiveTab] = useState("daily");
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/book-ride");
  };

  return (
    <div className={styles.heroSection}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Why Travel With Rydixo ?</h1>
          <p>Rydixo - Best outstation taxi service in India</p>
        </div>

        <div className={styles.heroForm}>
          <div className={styles.formTabs}>
            <div
              className={`${styles.tab} ${
                activeTab === "daily" ? styles.tabActive : ""
              }`}
              onClick={() => setActiveTab("daily")}
            >
              Daily
            </div>
            <div
              className={`${styles.tab} ${
                activeTab === "rental" ? styles.tabActive : ""
              }`}
              onClick={() => setActiveTab("rental")}
            >
              Rental
            </div>
            <div
              className={`${styles.tab} ${
                activeTab === "outstation" ? styles.tabActive : ""
              }`}
              onClick={() => setActiveTab("outstation")}
            >
              Outstation
            </div>
          </div>

          <form onSubmit={handleRedirect} className={styles.bookingForm}>
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
