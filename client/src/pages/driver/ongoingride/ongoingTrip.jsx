import React from "react";
import {
  MapPin,
  Phone,
  MessageCircle,
  Car,
  Clock,
  IndianRupee,
} from "lucide-react";
import styles from "./ongoingtrip.module.css";

const OngoingTripPage = ({ bookingData, onEndTrip }) => {
  return (
    <div className={styles.ongoingTripPage}>
      <div className={styles.pageHeader}>
        <h2>Pick Up Navigator</h2>
      </div>

      <div className={styles.contactSection}>
        <span className={styles.contactLabel}>Contact</span>
        <div className={styles.contactButtons}>
          <button className={styles.contactBtn}>
            <MessageCircle size={20} />
          </button>
          <button className={styles.contactBtn}>
            <Phone size={20} />
          </button>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.locationSection}>
        <div className={styles.locationItem}>
          <div className={styles.locationHeader}>
            <MapPin size={16} className={styles.locationIcon} />
            <span className={styles.locationLabel}>Pick Up</span>
          </div>
          <p className={styles.locationAddress}>
            {bookingData?.pickup ||
              "123, Main Bazar, Sadar Bazar, Ambala Cantt"}
          </p>
        </div>

        <div className={styles.locationItem}>
          <div className={styles.locationHeader}>
            <MapPin size={16} className={styles.locationIcon} />
            <span className={styles.locationLabel}>Drop Off</span>
          </div>
          <p className={styles.locationAddress}>
            {bookingData?.dropoff || "Railway station, Delhi"}
          </p>
        </div>
      </div>

      <div className={styles.rideStats}>
        <div className={styles.statItem}>
          <Car size={16} className={styles.statIcon} />
          <span className={styles.statValue}>65 km</span>
        </div>
        <div className={styles.statItem}>
          <IndianRupee size={16} className={styles.statIcon} />
          <span className={styles.statValue}>1000</span>
        </div>
        <div className={styles.statItem}>
          <Clock size={16} className={styles.statIcon} />
          <span className={styles.statValue}>20 min</span>
        </div>
      </div>

      <div className={styles.actionSection}>
        <button className={styles.endTripBtn} onClick={onEndTrip}>
          End Trip
        </button>
      </div>
    </div>
  );
};

export default OngoingTripPage;
