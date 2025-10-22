import React from "react";
import { MapPin, Car, Clock, IndianRupee, CheckCircle } from "lucide-react";
import styles from "./TripCompletePage.module.css";

const TripCompletePage = ({ bookingData, onNextRide }) => {
  return (
    <div className={styles.tripCompletePage}>
      <div className={styles.pageHeader}>
        <h2>Trip Complete</h2>
      </div>

      <div className={styles.fareBreakdown}>
        <h3 className={styles.sectionTitle}>Total Fare</h3>
        <div className={styles.fareTotal}>₹1000</div>
        
        <div className={styles.fareDetails}>
          <div className={styles.fareItem}>
            <span>Base Fare</span>
            <span>₹600</span>
          </div>
          <div className={styles.fareItem}>
            <span>Distance Fare</span>
            <span>₹250</span>
          </div>
          <div className={styles.fareItem}>
            <span>Tax</span>
            <span>₹150</span>
          </div>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.paymentSection}>
        <h3 className={styles.sectionTitle}>Payment Done</h3>
        <div className={styles.paymentMethods}>
          <div className={styles.paymentMethod}>
            <CheckCircle size={16} className={styles.checkIcon} />
            <span>Cash</span>
          </div>
          <div className={styles.paymentMethod}>
            <span>UPI</span>
          </div>
          <div className={styles.paymentMethod}>
            <span>Card</span>
          </div>
          <div className={styles.paymentMethod}>
            <span>Done</span>
          </div>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.tripSummary}>
        <h3 className={styles.sectionTitle}>Trip Summary</h3>
        <div className={styles.summaryItem}>
          <MapPin size={16} className={styles.summaryIcon} />
          <div>
            <strong>Pick Up</strong>
            <p>
              {bookingData?.pickup || "123,Main Bazar, Sader Bazar, Ambala Cantt"}
            </p>
          </div>
        </div>
        <div className={styles.summaryItem}>
          <MapPin size={16} className={styles.summaryIcon} />
          <div>
            <strong>Drop Off</strong>
            <p>{bookingData?.dropoff || "Railway station, Delhi"}</p>
          </div>
        </div>
        <div className={styles.rideStats}>
          <div className={styles.statItem}>
            <Car size={16} className={styles.statIcon} />
            <span>65 km</span>
          </div>
          <div className={styles.statItem}>
            <IndianRupee size={16} className={styles.statIcon} />
            <span>1000</span>
          </div>
          <div className={styles.statItem}>
            <Clock size={16} className={styles.statIcon} />
            <span>20 min</span>
          </div>
        </div>
      </div>

      <div className={styles.actionSection}>
        <button className={styles.dashboardBtn} onClick={onNextRide}>
          Go to Dashboard
        </button>
        <button className={styles.nextRideBtn} onClick={onNextRide}>
          Accept Next Ride
        </button>
      </div>
    </div>
  );
};

export default TripCompletePage;