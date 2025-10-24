import React, { useState, useEffect } from "react";
import Modal from "../../../../../components/local/modal/modal";
import { Car, IndianRupee, Clock, MapPin, User } from "lucide-react";
import styles from "./rideModal.module.css";
import { toast } from "react-toastify";

const RideModal = ({
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
      await onRideResponse(ride._id, "rejected");
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
      await onRideResponse(ride._id, "accepted");
      onClose();
      onOpenSendOTP(ride);
    } catch (error) {
      console.error("Accept failed:", error);
      toast.warn("Failed to confirm ride.");
    } finally {
      setResponding(false);
    }
  };

  const handleReject = async () => {
    if (responding) return;

    setResponding(true);
    try {
      await onRideResponse(ride._id, "rejected");
      onClose();
    } catch (error) {
      console.error("Reject failed:", error);
    } finally {
      setResponding(false);
    }
  };

  if (!ride) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.rideModal}>
        <div className={styles.timerSection}>
          <div className={styles.timer}>
            <Clock size={20} className={styles.timerIcon} />
            <span className={styles.timerText}>{formatTime(timeLeft)}</span>
          </div>
          <p className={styles.timerLabel}>Time to respond</p>
        </div>

        <h2 className={styles.title}>New Ride Request</h2>

        <div className={styles.userInfo}>
          <div className={styles.avatarWrapper}>
            <img
              src={
                ride.user?.avatar ||
                "https://static.vecteezy.com/system/resources/previews/069/428/996/non_2x/default-profile-picture-social-media-icon-user-avatar-isolated-symbol-on-white-background-illustration-vector.jpg"
              }
              alt={ride.user?.name}
              className={styles.avatar}
            />
            <div className={styles.avatarFallback}>
              <User size={24} color="#666" />
            </div>
          </div>
          <div className={styles.userDetails}>
            <strong className={styles.userName}>
              {ride.user?.name || "Mr. Namdev"}
            </strong>
            <div className={styles.rideStats}>
              <div className={styles.statItem}>
                <Car size={16} className={styles.icon} />
                <span>{ride.distance || "52"} km</span>
              </div>
              <div className={styles.statItem}>
                <IndianRupee size={16} className={styles.icon} />
                <span>{ride.fare || "499"}</span>
              </div>
              <div className={styles.statItem}>
                <Clock size={16} className={styles.icon} />
                <span>{ride.estimatedTime || "20"} min</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.locations}>
          <div className={styles.locationItem}>
            <MapPin size={20} className={styles.locationIcon} />
            <div className={styles.locationDetails}>
              <strong className={styles.locationLabel}>Pick Up</strong>
              <p className={styles.locationAddress}>{ride.pickup || "Null"}</p>
            </div>
          </div>

          <div className={styles.locationItem}>
            <MapPin size={20} className={styles.locationIcon} />
            <div className={styles.locationDetails}>
              <strong className={styles.locationLabel}>Drop Off</strong>
              <p className={styles.locationAddress}>{ride.dropoff || "Null"}</p>
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
        <div className={styles.more}>See Details</div>
      </div>
    </Modal>
  );
};

export default RideModal;
