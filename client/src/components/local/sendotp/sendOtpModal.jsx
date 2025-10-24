import React, { useState } from "react";
import Modal from "../modal/modal";
import { MapPin, IndianRupee, User } from "lucide-react";
import styles from "./sendotp.module.css";

const SendOTPModal = ({ isOpen, onClose, ride, onSendOTP }) => {
  const [sending, setSending] = useState(false);

  if (!ride) return null;

  const handleSendOTP = async () => {
    setSending(true);
    try {
      await onSendOTP();
    } catch (error) {
      console.error("Error sending OTP:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.sendOtpModal}>
        <h2 className={styles.title}>Confirm Ride</h2>

        <div className={styles.userInfo}>
          <div className={styles.avatarWrapper}>
            <User size={24} className={styles.avatarIcon} />
          </div>
          <div className={styles.userDetails}>
            <strong className={styles.userName}>
              {ride.user?.name || "NAMDEV"}
            </strong>
            <p className={styles.userLocation}>
              Pick Up:{" "}
              {ride.pickup || "123,Main Bazar, Sadar Bazar, Ambala Cantt"}
            </p>
          </div>
        </div>

        <div className={styles.fareSection}>
          <div className={styles.fareHeader}>
            <IndianRupee size={20} className={styles.fareIcon} />
            <span>Estimated Fare</span>
          </div>
          <div className={styles.fareAmount}>₹{ride.fare || "1000"}</div>
        </div>

        <div className={styles.message}>
          <p>
            Click 'Send OTP' to confirm this ride and generate OTP for the
            rider.
          </p>
          <p>The ride status will be set to 'confirmed'.</p>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.cancelBtn}
            onClick={onClose}
            disabled={sending}
          >
            Cancel
          </button>
          <button
            className={styles.acceptBtn}
            onClick={handleSendOTP}
            disabled={sending}
          >
            {sending ? "Sending..." : "Send OTP"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SendOTPModal;
