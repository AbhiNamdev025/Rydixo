import React, { useState, useEffect } from "react";
import { Car, IndianRupee, Clock, MapPin, User, X } from "lucide-react";
import styles from "./driveride.module.css";

const DriverRide = ({
  isOpen,
  onClose,
  ride,
  onRideResponse,
  onOpenSendOTP,
}) => {
  const [timeLeft, setTimeLeft] = useState(120);
  const [responding, setResponding] = useState(false);

  useEffect(() => {
    if (!isOpen || !ride) return;
    setTimeLeft(120);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoReject();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, ride]);

  const handleAutoReject = async () => {
    if (responding) return;
    setResponding(true);
    try {
      await onRideResponse("rejected");
      onClose();
    } catch (error) {
      console.error("Auto-reject failed:", error);
    } finally {
      setResponding(false);
    }
  };

  const handleAccept = async () => {
    if (responding) return;
    setResponding(true);
    try {
      await onRideResponse("accepted");
      onClose();
      onOpenSendOTP();
    } catch (error) {
      console.error("Accept failed:", error);
      alert("Failed to confirm ride.");
    } finally {
      setResponding(false);
    }
  };

  const handleReject = async () => {
    if (responding) return;
    setResponding(true);
    try {
      await onRideResponse("rejected");
      onClose();
    } catch (error) {
      console.error("Reject failed:", error);
    } finally {
      setResponding(false);
    }
  };

  if (!isOpen || !ride) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={20} />
        </button>

        <div className={styles.timerSection}>
          <div className={styles.timer}>
            <Clock size={20} className={styles.timerIcon} />
            <span className={styles.timerText}>{formatTime(timeLeft)}</span>
          </div>
          <p className={styles.timerLabel}>Time to respond</p>
        </div>

        <h2 className={styles.title}>New Ride Request</h2>

        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <User size={24} className={styles.avatarFallback} />
          </div>
          <div className={styles.userDetails}>
            <strong className={styles.userName}>
              {ride.user?.name || "Nitin"}
            </strong>
            <div className={styles.rideStats}>
              <div className={styles.statItem}>
                <Car size={16} />
                <span>{ride.distance || "65"} km</span>
              </div>
              <div className={styles.statItem}>
                <IndianRupee size={16} />
                <span>{ride.fare || "1000"}</span>
              </div>
              <div className={styles.statItem}>
                <Clock size={16} />
                <span>{ride.estimatedTime || "20"} min</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.locations}>
          <div className={styles.locationItem}>
            <MapPin size={20} />
            <div className={styles.locationDetails}>
              <strong>Pick Up</strong>
              <p>
                {ride.pickup || "123, Main Basar, Sadar Basar, Ambala Cantt"}
              </p>
            </div>
          </div>

          <div className={styles.locationItem}>
            <MapPin size={20} />
            <div className={styles.locationDetails}>
              <strong>Drop Off</strong>
              <p>{ride.dropoff || "Railway station, Delhi"}</p>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.rejectBtn}
            onClick={handleReject}
            disabled={responding}
          >
            {responding ? "Rejecting..." : "Reject"}
          </button>
          <button
            className={styles.acceptBtn}
            onClick={handleAccept}
            disabled={responding}
          >
            {responding ? "Accepting..." : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverRide;
