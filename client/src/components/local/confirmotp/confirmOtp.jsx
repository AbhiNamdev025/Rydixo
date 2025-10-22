// import React, { useState } from "react";
// import Modal from "../modal/modal";
// import { MapPin, IndianRupee, User, Shield } from "lucide-react";
// import styles from "./confirmotp.module.css";

// const OTPVerificationModal = ({ isOpen, onClose, ride, onVerifyOTP }) => {
//   const [enteredOTP, setEnteredOTP] = useState("");
//   const [error, setError] = useState("");

//   if (!ride) return null;

//   const handleVerify = () => {
//     if (enteredOTP.length === 4) {
//       setError("");
//       onVerifyOTP(enteredOTP);
//     } else {
//       setError("Please enter 4-digit OTP");
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <div className={styles.confirmOtpModal}>
//         <h2 className={styles.title}>OTP Verification</h2>

//         <div className={styles.userInfo}>
//           <div className={styles.avatarWrapper}>
//             <User size={24} className={styles.avatarIcon} />
//           </div>
//           <div className={styles.userDetails}>
//             <strong className={styles.userName}>
//               {ride.user?.name || "Rahul"}
//             </strong>
//           </div>
//         </div>

//         <div className={styles.locationSection}>
//           <div className={styles.locationItem}>
//             <div className={styles.locationHeader}>
//               <MapPin size={16} className={styles.locationIcon} />
//               <span className={styles.locationLabel}>Pick Up</span>
//             </div>
//             <p className={styles.locationAddress}>
//               {ride.pickup || "123,Main Bazar, Sadar Bazar, Ambala Cantt"}
//             </p>
//           </div>
//         </div>

//         <div className={styles.fareSection}>
//           <div className={styles.fareHeader}>
//             <IndianRupee size={20} className={styles.fareIcon} />
//             <span>Estimate Fare</span>
//           </div>
//           <div className={styles.fareAmount}>₹{ride.fare || "1000"}</div>
//         </div>

//         <div className={styles.otpSection}>
//           <div className={styles.otpHeader}>
//             <Shield size={20} className={styles.otpIcon} />
//             <span>Enter OTP to start Ride</span>
//           </div>
//           <input
//             type="text"
//             className={styles.otpInput}
//             placeholder="Enter OTP"
//             value={enteredOTP}
//             onChange={(e) =>
//               setEnteredOTP(e.target.value.replace(/\D/g, "").slice(0, 4))
//             }
//             maxLength={4}
//           />
//           {error && <p className={styles.errorText}>{error}</p>}
//           <p className={styles.otpNote}>
//             Please ask the customer to share the OTP before starting the ride.
//             This step ensures your ride is secure.
//           </p>
//         </div>

//         <div className={styles.actions}>
//           <button className={styles.cancelBtn} onClick={onClose}>
//             Cancel Ride
//           </button>
//           <button className={styles.acceptBtn} onClick={handleVerify}>
//             Start Ride
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default OTPVerificationModal;

import React, { useState } from "react";
import Modal from "../modal/modal";
import { MapPin, IndianRupee, User, Shield } from "lucide-react";
import styles from "./confirmotp.module.css";

const OTPVerificationModal = ({ isOpen, onClose, ride, onVerifyOTP }) => {
  const [enteredOTP, setEnteredOTP] = useState("");
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);

  if (!ride) return null;

  const handleVerify = async () => {
    if (enteredOTP.length !== 4) {
      setError("Please enter 4-digit OTP");
      return;
    }

    setError("");
    setVerifying(true);

    try {
      await onVerifyOTP(enteredOTP); // This should set status to "ongoing"
    } catch (error) {
      console.error("Error starting ride:", error);
      setError(error.message || "Invalid OTP. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleEndTrip = async () => {
    try {
      setVerifying(true);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:2525/ride/${ride._id}/complete`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to complete ride");
      }

      onClose();
      window.location.href = "/complete-ride";
    } catch (error) {
      console.error("Error completing ride:", error);
      alert("Failed to complete ride. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const isRideOngoing = ride.status === "ongoing";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.confirmOtpModal}>
        <h2 className={styles.title}>
          {isRideOngoing ? "End Trip" : "OTP Verification"}
        </h2>

        <div className={styles.userInfo}>
          <div className={styles.avatarWrapper}>
            <User size={24} className={styles.avatarIcon} />
          </div>
          <div className={styles.userDetails}>
            <strong className={styles.userName}>
              {ride.user?.name || "Rahul"}
            </strong>
            <p className={styles.userStatus}>
              Status: <span className={styles.statusText}>{ride.status}</span>
            </p>
          </div>
        </div>

        <div className={styles.locationSection}>
          <div className={styles.locationItem}>
            <div className={styles.locationHeader}>
              <MapPin size={16} className={styles.locationIcon} />
              <span className={styles.locationLabel}>Pick Up</span>
            </div>
            <p className={styles.locationAddress}>
              {ride.pickup || "123,Main Bazar, Sadar Bazar, Ambala Cantt"}
            </p>
          </div>

          <div className={styles.locationItem}>
            <div className={styles.locationHeader}>
              <MapPin size={16} className={styles.locationIcon} />
              <span className={styles.locationLabel}>Drop Off</span>
            </div>
            <p className={styles.locationAddress}>
              {ride.dropoff || "Chandigarh"}
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

        {!isRideOngoing ? (
          <>
            <div className={styles.otpSection}>
              <div className={styles.otpHeader}>
                <Shield size={20} className={styles.otpIcon} />
                <span>Enter OTP to Start Ride</span>
              </div>
              <input
                type="text"
                className={styles.otpInput}
                placeholder="Enter OTP"
                value={enteredOTP}
                onChange={(e) =>
                  setEnteredOTP(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                maxLength={4}
              />
              {error && <p className={styles.errorText}>{error}</p>}
              <p className={styles.otpNote}>
                Please ask the customer to share the OTP before starting the
                ride. This will change the ride status to 'ongoing'.
              </p>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.cancelBtn}
                onClick={onClose}
                disabled={verifying}
              >
                Cancel
              </button>
              <button
                className={styles.acceptBtn}
                onClick={handleVerify}
                disabled={verifying || enteredOTP.length !== 4}
              >
                {verifying ? "Starting..." : "Start Ride"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.ongoingSection}>
              <p className={styles.ongoingText}>
                Ride is currently ongoing. Complete the ride when you reach the
                destination.
              </p>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.cancelBtn}
                onClick={onClose}
                disabled={verifying}
              >
                Close
              </button>
              <button
                className={styles.acceptBtn}
                onClick={handleEndTrip}
                disabled={verifying}
              >
                {verifying ? "Completing..." : "End Trip"}
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default OTPVerificationModal;
