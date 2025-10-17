// import React, { useState, useEffect } from "react";
// import { MapPin, Phone, Clock, Check } from "lucide-react";
// import styles from "./ridebooking.module.css";

// const RideBookingFlow = () => {
//   const [bookingStage, setBookingStage] = useState("searching");
//   const [countdown, setCountdown] = useState(5);

//   useEffect(() => {
//     if (bookingStage === "searching" && countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     } else if (bookingStage === "searching" && countdown === 0) {
//       setBookingStage("requested");
//     }
//   }, [bookingStage, countdown]);

//   const handleKeepBooking = () => {
//     setBookingStage("confirmed");
//   };

//   const handleCancelBooking = () => {
//     setBookingStage("cancelled");
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.mainContent}>
//         <div className={styles.grid}>
//           <div className={styles.mapSection}>
//             {bookingStage === "searching" && (
//               <div className={`${styles.statusBar} ${styles.searching}`}>
//                 Searching For Car
//               </div>
//             )}
//             {bookingStage === "requested" && (
//               <div className={`${styles.statusBar} ${styles.arriving}`}>
//                 Pickup Arriving in 5 min
//               </div>
//             )}
//             {bookingStage === "cancelled" && (
//               <div className={`${styles.statusBar} ${styles.cancelled}`}>
//                 Cancel Ride
//               </div>
//             )}

//             {/* Map */}
//             <div className={styles.mapContainer}>
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d110406.89473621949!2d76.69342292812499!3d30.35622565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x390fb6497e14e649%3A0xe4ee1327c611c26d!2sChandigarh!3m2!1d30.7333148!2d76.7794179!4m5!1s0x390f949b6e0b0f4f%3A0x1bb4f0b3b8b4b0b3!2sAmbala%2C%20Haryana!3m2!1d30.378179!2d76.776695!5e0!3m2!1sen!2sin!4v1234567890"
//                 className={styles.map}
//                 allowFullScreen=""
//                 loading="lazy"
//                 title="Ride Map"
//               />
//             </div>
//           </div>

//           {/* Details Section */}
//           <div className={styles.detailsSection}>
//             {bookingStage === "searching" && (
//               <div className={styles.card}>
//                 <h3 className={styles.cardTitle}>Ride Requested</h3>
//                 <p className={styles.cardSubtitle}>Finding drivers nearby</p>

//                 <div className={styles.locationInfo}>
//                   <div className={styles.locationItem}>
//                     <MapPin className={styles.icon} size={20} />
//                     <div>
//                       <p className={styles.locationLabel}>Meet at Ambala</p>
//                       <p className={styles.locationValue}>Ambala, Haryana</p>
//                     </div>
//                     <button className={styles.changeBtn}>Change</button>
//                   </div>
//                 </div>

//                 <div className={styles.fareInfo}>
//                   <Clock className={styles.icon} size={20} />
//                   <span className={styles.fareLabel}>₹ 264.51</span>
//                   <span className={styles.fareType}>Cash</span>
//                 </div>

//                 <button
//                   className={styles.cancelBtn}
//                   onClick={handleCancelBooking}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             )}

//             {bookingStage === "requested" && (
//               <div className={styles.card}>
//                 <h3 className={styles.cardTitle}>Ride Confirmed</h3>

//                 <div className={styles.locationInfo}>
//                   <div className={styles.infoRow}>
//                     <span className={styles.label}>Drop-Off Location</span>
//                     <span className={styles.value}>Ambala</span>
//                   </div>
//                   <div className={styles.infoRow}>
//                     <span className={styles.label}>Pickup Location</span>
//                     <span className={styles.value}>Chandigarh</span>
//                   </div>
//                 </div>

//                 <div className={styles.driverInfo}>
//                   <div className={styles.driverCard}>
//                     <img
//                       src="https://i.pravatar.cc/150?img=12"
//                       alt="Driver"
//                       className={styles.driverImage}
//                     />
//                     <div className={styles.driverDetails}>
//                       <p className={styles.driverName}>ABC</p>
//                       <p className={styles.driverVehicle}>Driver</p>
//                     </div>
//                     <a href="tel:+1234567890" className={styles.callBtn}>
//                       <Phone size={20} />
//                     </a>
//                   </div>

//                   <div className={styles.vehicleInfo}>
//                     <div className={styles.vehicleIcon}>🚗</div>
//                     <div>
//                       <p className={styles.vehicleName}>Indiga</p>
//                       <p className={styles.vehicleModel}>Affordable AC Cabs</p>
//                     </div>
//                     <span className={styles.vehicleNumber}>PB01A 9999</span>
//                   </div>

//                   <div className={styles.otpInfo}>
//                     <div className={styles.otpIcon}>🔑</div>
//                     <span className={styles.otpLabel}>OTP</span>
//                     <span className={styles.otpValue}>44444</span>
//                   </div>
//                 </div>

//                 <div className={styles.actionButtons}>
//                   <button
//                     className={styles.keepBtn}
//                     onClick={handleKeepBooking}
//                   >
//                     Keep Booking
//                   </button>
//                   <button
//                     className={styles.cancelBtnSecondary}
//                     onClick={handleCancelBooking}
//                   >
//                     Cancel Booking
//                   </button>
//                 </div>
//               </div>
//             )}

//             {bookingStage === "cancelled" && (
//               <div className={styles.card}>
//                 <h3 className={`${styles.cardTitle} ${styles.cancelledTitle}`}>
//                   Ride Cancelled
//                 </h3>

//                 <div className={styles.locationInfo}>
//                   <div className={styles.infoRow}>
//                     <span className={styles.label}>Drop-Off Location</span>
//                     <span className={styles.value}>Ambala</span>
//                   </div>
//                   <div className={styles.infoRow}>
//                     <span className={styles.label}>Pickup Location</span>
//                     <span className={styles.value}>Chandigarh</span>
//                   </div>
//                 </div>

//                 <div className={styles.driverInfo}>
//                   <div className={styles.driverCard}>
//                     <img
//                       src="https://i.pravatar.cc/150?img=12"
//                       alt="Driver"
//                       className={styles.driverImage}
//                     />
//                     <div className={styles.driverDetails}>
//                       <p className={styles.driverName}>Aman</p>
//                       <p className={styles.driverVehicle}>Driver</p>
//                     </div>
//                     <a href="tel:+1234567890" className={styles.callBtn}>
//                       <Phone size={20} />
//                     </a>
//                   </div>

//                   <div className={styles.vehicleInfo}>
//                     <div className={styles.vehicleIcon}>🚗</div>
//                     <div>
//                       <p className={styles.vehicleName}>Indiga</p>
//                       <p className={styles.vehicleModel}>Affordable AC Cabs</p>
//                     </div>
//                     <span className={styles.vehicleNumber}>PB01A 9999</span>
//                   </div>

//                   <div className={styles.supportInfo}>
//                     <div className={styles.supportIcon}>🎧</div>
//                     <span className={styles.supportLabel}>Support</span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {bookingStage === "confirmed" && (
//               <div className={styles.card}>
//                 <div className={styles.successMessage}>
//                   <Check className={styles.successIcon} size={48} />
//                   <h3 className={styles.successTitle}>Booking Confirmed!</h3>
//                   <p className={styles.successText}>
//                     Your driver is on the way
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Bottom Cards */}
//         <div className={styles.bottomCards}>
//           <div className={styles.featureCard}>
//             <div className={styles.featureIcon}>🚗</div>
//             <div className={styles.featureContent}>
//               <h4 className={styles.featureTitle}>Request more rides</h4>
//               <p className={styles.featureText}>For yourself or guest</p>
//             </div>
//           </div>

//           <div className={styles.featureCard}>
//             <div className={styles.featureIcon}>👥</div>
//             <div className={styles.featureContent}>
//               <h4 className={styles.featureTitle}>Send and receive</h4>
//               <p className={styles.featureText}>One or multiple items</p>
//             </div>
//           </div>

//           <div className={styles.featureCard}>
//             <div className={styles.featureIcon}>📅</div>
//             <div className={styles.featureContent}>
//               <h4 className={styles.featureTitle}>Reserve a ride</h4>
//               <p className={styles.featureText}>Up to 90 days ahead</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RideBookingFlow;

import React, { useState, useEffect } from "react";
import { MapPin, Phone, Clock, Check, X } from "lucide-react";
import styles from "./ridebooking.module.css";
import { bookingService } from "../../services/bookingServices";

const RideBookingFlow = ({ bookingId }) => {
  const [bookingStage, setBookingStage] = useState("searching");
  const [countdown, setCountdown] = useState(5);
  const [bookingData, setBookingData] = useState(null);
  const [driverData, setDriverData] = useState(null);

  // Get user data from localStorage
  const getCurrentUser = () => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error getting user data:", error);
      return null;
    }
  };

  useEffect(() => {
    if (bookingId) {
      fetchBookingData();
    }
  }, [bookingId]);

  useEffect(() => {
    if (bookingStage === "searching" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (bookingStage === "searching" && countdown === 0) {
      setBookingStage("requested");
      // Simulate driver assignment
      simulateDriverAssignment();
    }
  }, [bookingStage, countdown]);

  const fetchBookingData = async () => {
    try {
      const data = await bookingService.getBookingById(bookingId);
      setBookingData(data);
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  const simulateDriverAssignment = () => {
    const driver = {
      name: "Rajesh Kumar",
      phone: "+91 9876543210",
      vehicle: {
        model: "Maruti Suzuki Dzire",
        number: "DL01AB1234",
        type: "Sedan",
      },
      rating: 4.8,
      otp: Math.floor(1000 + Math.random() * 9000),
    };
    setDriverData(driver);
  };

  const handleKeepBooking = () => {
    setBookingStage("confirmed");
  };

  const handleCancelBooking = async () => {
    try {
      setBookingStage("cancelled");
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  const handleCallDriver = () => {
    if (driverData) {
      window.open(`tel:${driverData.phone}`, "_self");
    }
  };

  const user = getCurrentUser();

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.grid}>
          <div className={styles.mapSection}>
            {bookingStage === "searching" && (
              <div className={`${styles.statusBar} ${styles.searching}`}>
                Searching For Car - {countdown}s
              </div>
            )}
            {bookingStage === "requested" && (
              <div className={`${styles.statusBar} ${styles.arriving}`}>
                Driver Assigned - Arriving in 5 min
              </div>
            )}
            {bookingStage === "cancelled" && (
              <div className={`${styles.statusBar} ${styles.cancelled}`}>
                <X size={18} /> Ride Cancelled
              </div>
            )}
            {bookingStage === "confirmed" && (
              <div className={`${styles.statusBar} ${styles.confirmed}`}>
                <Check size={18} /> Ride Confirmed
              </div>
            )}

            {/* Map */}
            <div className={styles.mapContainer}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d110406.89473621949!2d76.69342292812499!3d30.35622565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x390fb6497e14e649%3A0xe4ee1327c611c26d!2sChandigarh!3m2!1d30.7333148!2d76.7794179!4m5!1s0x390f949b6e0b0f4f%3A0x1bb4f0b3b8b4b0b3!2sAmbala%2C%20Haryana!3m2!1d30.378179!2d76.776695!5e0!3m2!1sen!2sin!4v1234567890"
                className={styles.map}
                allowFullScreen=""
                loading="lazy"
                title="Ride Map"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className={styles.detailsSection}>
            {bookingStage === "searching" && (
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Ride Requested</h3>
                <p className={styles.cardSubtitle}>Finding drivers nearby</p>

                {bookingData && (
                  <div className={styles.locationInfo}>
                    <div className={styles.locationItem}>
                      <MapPin className={styles.icon} size={20} />
                      <div>
                        <p className={styles.locationLabel}>Pickup Location</p>
                        <p className={styles.locationValue}>
                          {bookingData.pickup}
                        </p>
                      </div>
                    </div>
                    <div className={styles.locationItem}>
                      <MapPin className={styles.icon} size={20} />
                      <div>
                        <p className={styles.locationLabel}>
                          Drop-off Location
                        </p>
                        <p className={styles.locationValue}>
                          {bookingData.dropoff}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className={styles.fareInfo}>
                  <Clock className={styles.icon} size={20} />
                  <span className={styles.fareLabel}>
                    Estimated Fare: ₹ 264.51
                  </span>
                  <span className={styles.fareType}>Cash</span>
                </div>

                <button
                  className={styles.cancelBtn}
                  onClick={handleCancelBooking}
                >
                  Cancel Ride
                </button>
              </div>
            )}

            {bookingStage === "requested" && driverData && (
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Ride Confirmed</h3>

                {bookingData && (
                  <div className={styles.locationInfo}>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>Pickup Location</span>
                      <span className={styles.value}>{bookingData.pickup}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>Drop-off Location</span>
                      <span className={styles.value}>
                        {bookingData.dropoff}
                      </span>
                    </div>
                  </div>
                )}

                <div className={styles.driverInfo}>
                  <div className={styles.driverCard}>
                    <img
                      src={`https://i.pravatar.cc/150?img=${Math.floor(
                        Math.random() * 70
                      )}`}
                      alt="Driver"
                      className={styles.driverImage}
                    />
                    <div className={styles.driverDetails}>
                      <p className={styles.driverName}>{driverData.name}</p>
                      <p className={styles.driverVehicle}>
                        ★ {driverData.rating} • {driverData.vehicle.type}
                      </p>
                    </div>
                    <button
                      className={styles.callBtn}
                      onClick={handleCallDriver}
                    >
                      <Phone size={20} />
                    </button>
                  </div>

                  <div className={styles.vehicleInfo}>
                    <div className={styles.vehicleIcon}>🚗</div>
                    <div>
                      <p className={styles.vehicleName}>
                        {driverData.vehicle.model}
                      </p>
                      <p className={styles.vehicleModel}>
                        AC {driverData.vehicle.type}
                      </p>
                    </div>
                    <span className={styles.vehicleNumber}>
                      {driverData.vehicle.number}
                    </span>
                  </div>

                  <div className={styles.otpInfo}>
                    <div className={styles.otpIcon}>🔑</div>
                    <span className={styles.otpLabel}>OTP</span>
                    <span className={styles.otpValue}>{driverData.otp}</span>
                  </div>
                </div>

                <div className={styles.actionButtons}>
                  <button
                    className={styles.keepBtn}
                    onClick={handleKeepBooking}
                  >
                    Continue Ride
                  </button>
                  <button
                    className={styles.cancelBtnSecondary}
                    onClick={handleCancelBooking}
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            )}

            {bookingStage === "cancelled" && (
              <div className={styles.card}>
                <h3 className={`${styles.cardTitle} ${styles.cancelledTitle}`}>
                  Ride Cancelled
                </h3>

                {bookingData && (
                  <div className={styles.locationInfo}>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>Pickup Location</span>
                      <span className={styles.value}>{bookingData.pickup}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>Drop-off Location</span>
                      <span className={styles.value}>
                        {bookingData.dropoff}
                      </span>
                    </div>
                  </div>
                )}

                <div className={styles.cancelledMessage}>
                  <p>Your ride has been cancelled successfully.</p>
                  <p>No cancellation charges applied.</p>
                </div>

                <button
                  className={styles.keepBtn}
                  onClick={() => (window.location.href = "/book-ride")}
                >
                  Book New Ride
                </button>
              </div>
            )}

            {bookingStage === "confirmed" && (
              <div className={styles.card}>
                <div className={styles.successMessage}>
                  <Check className={styles.successIcon} size={48} />
                  <h3 className={styles.successTitle}>Booking Confirmed!</h3>
                  <p className={styles.successText}>
                    Your driver is on the way to {bookingData?.pickup}
                  </p>
                  {driverData && (
                    <div className={styles.driverEta}>
                      <p>
                        Driver: <strong>{driverData.name}</strong>
                      </p>
                      <p>
                        ETA: <strong>5 minutes</strong>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Cards */}
        <div className={styles.bottomCards}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🚗</div>
            <div className={styles.featureContent}>
              <h4 className={styles.featureTitle}>Request more rides</h4>
              <p className={styles.featureText}>For yourself or guest</p>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>👥</div>
            <div className={styles.featureContent}>
              <h4 className={styles.featureTitle}>Send and receive</h4>
              <p className={styles.featureText}>One or multiple items</p>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📅</div>
            <div className={styles.featureContent}>
              <h4 className={styles.featureTitle}>Reserve a ride</h4>
              <p className={styles.featureText}>Up to 90 days ahead</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideBookingFlow;
