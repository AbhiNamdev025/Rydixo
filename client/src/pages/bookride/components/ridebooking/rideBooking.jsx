// import React, { useState, useEffect } from "react";
// import { MapPin, Phone, Clock, Check, X } from "lucide-react";
// import styles from "./ridebooking.module.css";
// import { bookingService } from "../../services/bookingServices";

// const RideBookingFlow = ({ bookingId }) => {
//   const [bookingStage, setBookingStage] = useState("searching");
//   const [countdown, setCountdown] = useState(20);
//   const [bookingData, setBookingData] = useState(null);
//   const [driverData, setDriverData] = useState(null);

//   // Get user data from localStorage
//   const getCurrentUser = () => {
//     try {
//       const userData = localStorage.getItem("user");
//       return userData ? JSON.parse(userData) : null;
//     } catch (error) {
//       console.error("Error getting user data:", error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     if (bookingId) {
//       fetchBookingData();
//     }
//   }, [bookingId]);

//   useEffect(() => {
//     if (bookingStage === "searching" && countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     } else if (bookingStage === "searching" && countdown === 0) {
//       setBookingStage("requested");
//       //  driver
//       driverAssignment();
//     }
//   }, [bookingStage, countdown]);

//   const fetchBookingData = async () => {
//     try {
//       const data = await bookingService.getBookingById(bookingId);
//       setBookingData(data);
//     } catch (error) {
//       console.error("Error fetching booking data:", error);
//     }
//   };

//   const driverAssignment = () => {
//     const driver = {
//       name: "Rajesh Kumar",
//       phone: "+91 9876543210",
//       vehicle: {
//         model: "Maruti Suzuki Dzire",
//         number: "DL01AB1234",
//         type: "Sedan",
//       },
//       rating: 4.8,
//       otp: Math.floor(1000 + Math.random() * 9000),
//     };
//     setDriverData(driver);
//   };

//   const handleKeepBooking = () => {
//     setBookingStage("confirmed");
//   };

//   const handleCancelBooking = async () => {
//     try {
//       setBookingStage("cancelled");
//     } catch (error) {
//       console.error("Error cancelling booking:", error);
//     }
//   };

//   const handleCallDriver = () => {
//     if (driverData) {
//       window.open(`tel:${driverData.phone}`, "_self");
//     }
//   };

//   const user = getCurrentUser();

//   return (
//     <div className={styles.container}>
//       <div className={styles.mainContent}>
//         <div className={styles.grid}>
//           <div className={styles.mapSection}>
//             {bookingStage === "searching" && (
//               <div className={`${styles.statusBar} ${styles.searching}`}>
//                 Searching For Car - {countdown}s
//               </div>
//             )}
//             {bookingStage === "requested" && (
//               <div className={`${styles.statusBar} ${styles.arriving}`}>
//                 Driver Assigned - Arriving in 5 min
//               </div>
//             )}
//             {bookingStage === "cancelled" && (
//               <div className={`${styles.statusBar} ${styles.cancelled}`}>
//                 <X size={18} /> Ride Cancelled
//               </div>
//             )}
//             {bookingStage === "confirmed" && (
//               <div className={`${styles.statusBar} ${styles.confirmed}`}>
//                 <Check size={18} /> Ride Confirmed
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
//                 <h3 className={`${styles.cardTitle} ${styles.cardTitleblue}`}>
//                   Ride Requested
//                 </h3>
//                 <p className={styles.cardSubtitle}>Finding drivers nearby</p>

//                 {bookingData && (
//                   <div className={styles.locationInfo}>
//                     <div className={styles.locationItem}>
//                       <MapPin className={styles.icon} size={20} />
//                       <div>
//                         <p className={styles.locationLabel}>Pickup Location</p>
//                         <p className={styles.locationValue}>
//                           {bookingData.pickup}
//                         </p>
//                       </div>
//                     </div>
//                     <div className={styles.locationItem}>
//                       <MapPin className={styles.icon} size={20} />
//                       <div>
//                         <p className={styles.locationLabel}>
//                           Drop-off Location
//                         </p>
//                         <p className={styles.locationValue}>
//                           {bookingData.dropoff}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div className={styles.fareInfo}>
//                   <Clock className={styles.icon} size={20} />
//                   <span className={styles.fareLabel}>
//                     Estimated Fare: ₹ 264.51
//                   </span>
//                   <span className={styles.fareType}>Cash</span>
//                 </div>

//                 <button
//                   className={styles.cancelBtn}
//                   onClick={handleCancelBooking}
//                 >
//                   Cancel Ride
//                 </button>
//               </div>
//             )}

//             {bookingStage === "requested" && driverData && (
//               <div className={styles.card}>
//                 <h3 className={`${styles.cardTitle} ${styles.cardTitleGreen}`}>
//                   Ride Confirmed
//                 </h3>

//                 {bookingData && (
//                   <div className={styles.locationInfo}>
//                     <div className={styles.infoRow}>
//                       <span className={styles.label}>Pickup Location</span>
//                       <span className={styles.value}>{bookingData.pickup}</span>
//                     </div>
//                     <div className={styles.infoRow}>
//                       <span className={styles.label}>Drop-off Location</span>
//                       <span className={styles.value}>
//                         {bookingData.dropoff}
//                       </span>
//                     </div>
//                   </div>
//                 )}

//                 <div className={styles.driverInfo}>
//                   <div className={styles.driverCard}>
//                     <img
//                       // src={`https://i.pravatar.cc/150?img=${Math.floor(
//                       //   Math.random() * 70
//                       // )}`}
//                       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVcnImBmZ1U-IhsHjdDYaTS9_GpU5CQn9-KA&s"
//                       alt="Driver"
//                       className={styles.driverImage}
//                     />
//                     <div className={styles.driverDetails}>
//                       <p className={styles.driverName}>{driverData.name}</p>
//                       <p className={styles.driverVehicle}>
//                         ★ {driverData.rating} • {driverData.vehicle.type}
//                       </p>
//                     </div>
//                     <button
//                       className={styles.callBtn}
//                       onClick={handleCallDriver}
//                     >
//                       <Phone size={20} />
//                     </button>
//                   </div>

//                   <div className={styles.vehicleInfo}>
//                     <div className={styles.vehicleIcon}>🚗</div>
//                     <div>
//                       <p className={styles.vehicleName}>
//                         {driverData.vehicle.model}
//                       </p>
//                       <p className={styles.vehicleModel}>
//                         AC {driverData.vehicle.type}
//                       </p>
//                     </div>
//                     <span className={styles.vehicleNumber}>
//                       {driverData.vehicle.number}
//                     </span>
//                   </div>

//                   <div className={styles.otpInfo}>
//                     <div className={styles.otpIcon}>🔑</div>
//                     <span className={styles.otpLabel}>OTP</span>
//                     <span className={styles.otpValue}>{driverData.otp}</span>
//                   </div>
//                 </div>

//                 <div className={styles.actionButtons}>
//                   <button
//                     className={styles.keepBtn}
//                     onClick={handleKeepBooking}
//                   >
//                     Continue Ride
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
//                 <h3 className={`${styles.cardTitle} ${styles.cardTitlered}`}>
//                   Ride Cancelled
//                 </h3>

//                 {bookingData && (
//                   <div className={styles.locationInfo}>
//                     <div className={styles.infoRow}>
//                       <span className={styles.label}>Pickup Location</span>
//                       <span className={styles.value}>{bookingData.pickup}</span>
//                     </div>
//                     <div className={styles.infoRow}>
//                       <span className={styles.label}>Drop-off Location</span>
//                       <span className={styles.value}>
//                         {bookingData.dropoff}
//                       </span>
//                     </div>
//                   </div>
//                 )}

//                 <div className={styles.cancelledMessage}>
//                   <p>Your ride has been cancelled successfully.</p>
//                   <p>No cancellation charges applied.</p>
//                 </div>

//                 <button
//                   className={styles.keepBtn}
//                   onClick={() => (window.location.href = "/book-ride")}
//                 >
//                   Book New Ride
//                 </button>
//               </div>
//             )}

//             {bookingStage === "confirmed" && (
//               <div className={styles.card}>
//                 <div className={styles.successMessage}>
//                   <Check className={styles.successIcon} size={48} />
//                   <h3 className={styles.successTitle}>Booking Confirmed!</h3>
//                   <p className={styles.successText}>
//                     Your driver is on the way to {bookingData?.pickup}
//                   </p>
//                   {driverData && (
//                     <div className={styles.driverEta}>
//                       <p>
//                         Driver: <strong>{driverData.name}</strong>
//                       </p>
//                       <p>
//                         ETA: <strong>5 minutes</strong>
//                       </p>
//                     </div>
//                   )}
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

//wokrking without status update

// import React, { useState, useEffect, useRef } from "react";
// import { MapPin, Phone, Clock, Check, X } from "lucide-react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import styles from "./ridebooking.module.css";
// import { bookingService } from "../../services/bookingServices";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// const BookingRoutingMachine = ({ pickup, dropoff }) => {
//   const map = useMap();
//   const routingControlRef = useRef(null);

//   useEffect(() => {
//     const geocode = async (location) => {
//       const locationDatabase = {
//         nahan: [30.5596, 77.2948],
//         panchkula: [30.6942, 76.8606],
//         ambala: [30.3782, 76.7767],
//         chandigarh: [30.7333, 76.7794],
//         shimla: [31.1048, 77.1734],
//         delhi: [28.7041, 77.1025],
//         kalka: [30.8371, 76.939],
//         rajpura: [30.4789, 76.5937],
//         yamunanagar: [30.129, 77.2674],
//         karnal: [29.6857, 76.9905],
//         panipat: [29.3909, 76.9635],
//         kurukshetra: [29.9695, 76.8783],
//       };

//       const normalizedLocation = location.toLowerCase().trim();
//       if (locationDatabase[normalizedLocation]) {
//         return locationDatabase[normalizedLocation];
//       }

//       for (const [city, coords] of Object.entries(locationDatabase)) {
//         if (
//           normalizedLocation.includes(city) ||
//           city.includes(normalizedLocation)
//         ) {
//           return coords;
//         }
//       }

//       return [30.7333, 76.7794];
//     };

//     const initRouting = async () => {
//       if (routingControlRef.current) {
//         map.removeControl(routingControlRef.current);
//         routingControlRef.current = null;
//       }

//       try {
//         const pickupCoords = await geocode(pickup);
//         const dropoffCoords = await geocode(dropoff);

//         if (!pickupCoords || !dropoffCoords) {
//           return;
//         }

//         const pickupIcon = L.divIcon({
//           className: "custom-marker",
//           html: '<div style="background: #22c55e; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
//           iconSize: [30, 30],
//           iconAnchor: [15, 15],
//         });

//         const dropoffIcon = L.divIcon({
//           className: "custom-marker",
//           html: '<div style="background: #ef4444; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
//           iconSize: [30, 30],
//           iconAnchor: [15, 15],
//         });

//         const routingControl = L.Routing.control({
//           waypoints: [
//             L.latLng(pickupCoords[0], pickupCoords[1]),
//             L.latLng(dropoffCoords[0], dropoffCoords[1]),
//           ],
//           routeWhileDragging: false,
//           addWaypoints: false,
//           draggableWaypoints: false,
//           fitSelectedRoutes: true,
//           showAlternatives: false,
//           lineOptions: {
//             styles: [{ color: "#3b82f6", weight: 6, opacity: 0.8 }],
//           },
//           createMarker: function (i, waypoint, n) {
//             return L.marker(waypoint.latLng, {
//               draggable: false,
//               icon: i === 0 ? pickupIcon : dropoffIcon,
//             });
//           },
//           router: L.Routing.osrmv1({
//             serviceUrl: "https://router.project-osrm.org/route/v1",
//           }),
//         }).addTo(map);

//         const container = routingControl.getContainer();
//         if (container) {
//           container.style.display = "none";
//         }

//         routingControlRef.current = routingControl;
//       } catch (error) {
//         console.error("Routing error:", error);
//       }
//     };

//     if (pickup && dropoff) {
//       initRouting();
//     }

//     return () => {
//       if (routingControlRef.current) {
//         map.removeControl(routingControlRef.current);
//       }
//     };
//   }, [pickup, dropoff, map]);

//   return null;
// };

// const RideBookingFlow = ({ bookingId }) => {
//   const [bookingStage, setBookingStage] = useState("searching");
//   const [countdown, setCountdown] = useState(20);
//   const [bookingData, setBookingData] = useState(null);
//   const [driverData, setDriverData] = useState(null);

//   const getCurrentUser = () => {
//     try {
//       const userData = localStorage.getItem("user");
//       return userData ? JSON.parse(userData) : null;
//     } catch (error) {
//       console.error("Error getting user data:", error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     if (bookingId) {
//       fetchBookingData();
//     }
//   }, [bookingId]);

//   useEffect(() => {
//     if (bookingStage === "searching" && countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     } else if (bookingStage === "searching" && countdown === 0) {
//       setBookingStage("requested");
//       driverAssignment();
//     }
//   }, [bookingStage, countdown]);

//   const fetchBookingData = async () => {
//     try {
//       const data = await bookingService.getBookingById(bookingId);
//       setBookingData(data);
//     } catch (error) {
//       console.error("Error fetching booking data:", error);
//     }
//   };

//   const driverAssignment = () => {
//     const driver = {
//       name: "Rajesh Kumar",
//       phone: "+91 9876543210",
//       vehicle: {
//         model: "Maruti Suzuki Dzire",
//         number: "DL01AB1234",
//         type: "Sedan",
//       },
//       rating: 4.8,
//       otp: Math.floor(1000 + Math.random() * 9000),
//     };
//     setDriverData(driver);
//   };

//   const handleKeepBooking = () => {
//     setBookingStage("confirmed");
//   };

//   const handleCancelBooking = async () => {
//     try {
//       setBookingStage("cancelled");
//     } catch (error) {
//       console.error("Error cancelling booking:", error);
//     }
//   };

//   const handleCallDriver = () => {
//     if (driverData) {
//       window.open(`tel:${driverData.phone}`, "_self");
//     }
//   };

//   const user = getCurrentUser();

//   return (
//     <div className={styles.container}>
//       <div className={styles.mainContent}>
//         <div className={styles.grid}>
//           <div className={styles.mapSection}>
//             {bookingStage === "searching" && (
//               <div className={`${styles.statusBar} ${styles.searching}`}>
//                 Searching For Car - {countdown}s
//               </div>
//             )}
//             {bookingStage === "requested" && (
//               <div className={`${styles.statusBar} ${styles.arriving}`}>
//                 Driver Assigned - Arriving in 5 min
//               </div>
//             )}
//             {bookingStage === "cancelled" && (
//               <div className={`${styles.statusBar} ${styles.cancelled}`}>
//                 <X size={18} /> Ride Cancelled
//               </div>
//             )}
//             {bookingStage === "confirmed" && (
//               <div className={`${styles.statusBar} ${styles.confirmed}`}>
//                 <Check size={18} /> Ride Confirmed
//               </div>
//             )}

//             {/* Dynamic Map */}
//             <div className={styles.mapContainer}>
//               {bookingData && bookingData.pickup && bookingData.dropoff ? (
//                 <MapContainer
//                   key={`booking-map-${bookingId}`}
//                   center={[30.7333, 76.7794]}
//                   zoom={10}
//                   style={{ height: "100%", width: "100%" }}
//                 >
//                   <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                   />
//                   <BookingRoutingMachine
//                     pickup={bookingData.pickup}
//                     dropoff={bookingData.dropoff}
//                   />
//                 </MapContainer>
//               ) : (
//                 <div
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     backgroundColor: "#f3f4f6",
//                     color: "#6b7280",
//                   }}
//                 >
//                   <MapPin size={48} style={{ opacity: 0.3 }} />
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Details Section */}
//           <div className={styles.detailsSection}>
//             {bookingStage === "searching" && (
//               <div className={styles.card}>
//                 <h3 className={`${styles.cardTitle} ${styles.cardTitleblue}`}>
//                   Ride Requested
//                 </h3>
//                 <p className={styles.cardSubtitle}>Finding drivers nearby</p>

//                 {bookingData && (
//                   <div className={styles.locationInfo}>
//                     <div className={styles.locationItem}>
//                       <MapPin className={styles.icon} size={20} />
//                       <div>
//                         <p className={styles.locationLabel}>Pickup Location</p>
//                         <p className={styles.locationValue}>
//                           {bookingData.pickup}
//                         </p>
//                       </div>
//                     </div>
//                     <div className={styles.locationItem}>
//                       <MapPin className={styles.icon} size={20} />
//                       <div>
//                         <p className={styles.locationLabel}>
//                           Drop-off Location
//                         </p>
//                         <p className={styles.locationValue}>
//                           {bookingData.dropoff}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div className={styles.fareInfo}>
//                   <Clock className={styles.icon} size={20} />
//                   <span className={styles.fareLabel}>
//                     Estimated Fare: ₹ 264.51
//                   </span>
//                   <span className={styles.fareType}>Cash</span>
//                 </div>

//                 <button
//                   className={styles.cancelBtn}
//                   onClick={handleCancelBooking}
//                 >
//                   Cancel Ride
//                 </button>
//               </div>
//             )}

//             {bookingStage === "requested" && driverData && (
//               <div className={styles.card}>
//                 <h3 className={`${styles.cardTitle} ${styles.cardTitleGreen}`}>
//                   Ride Confirmed
//                 </h3>

//                 {bookingData && (
//                   <div className={styles.locationInfo}>
//                     <div className={styles.infoRow}>
//                       <span className={styles.label}>Pickup Location</span>
//                       <span className={styles.value}>{bookingData.pickup}</span>
//                     </div>
//                     <div className={styles.infoRow}>
//                       <span className={styles.label}>Drop-off Location</span>
//                       <span className={styles.value}>
//                         {bookingData.dropoff}
//                       </span>
//                     </div>
//                   </div>
//                 )}

//                 <div className={styles.driverInfo}>
//                   <div className={styles.driverCard}>
//                     <img
//                       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVcnImBmZ1U-IhsHjdDYaTS9_GpU5CQn9-KA&s"
//                       alt="Driver"
//                       className={styles.driverImage}
//                     />
//                     <div className={styles.driverDetails}>
//                       <p className={styles.driverName}>{driverData.name}</p>
//                       <p className={styles.driverVehicle}>
//                         ★ {driverData.rating} • {driverData.vehicle.type}
//                       </p>
//                     </div>
//                     <button
//                       className={styles.callBtn}
//                       onClick={handleCallDriver}
//                     >
//                       <Phone size={20} />
//                     </button>
//                   </div>

//                   <div className={styles.vehicleInfo}>
//                     <div className={styles.vehicleIcon}>🚗</div>
//                     <div>
//                       <p className={styles.vehicleName}>
//                         {driverData.vehicle.model}
//                       </p>
//                       <p className={styles.vehicleModel}>
//                         AC {driverData.vehicle.type}
//                       </p>
//                     </div>
//                     <span className={styles.vehicleNumber}>
//                       {driverData.vehicle.number}
//                     </span>
//                   </div>

//                   <div className={styles.otpInfo}>
//                     <div className={styles.otpIcon}>🔑</div>
//                     <span className={styles.otpLabel}>OTP</span>
//                     <span className={styles.otpValue}>{driverData.otp}</span>
//                   </div>
//                 </div>

//                 <div className={styles.actionButtons}>
//                   <button
//                     className={styles.keepBtn}
//                     onClick={handleKeepBooking}
//                   >
//                     Continue Ride
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
//                 <h3 className={`${styles.cardTitle} ${styles.cardTitlered}`}>
//                   Ride Cancelled
//                 </h3>

//                 {bookingData && (
//                   <div className={styles.locationInfo}>
//                     <div className={styles.infoRow}>
//                       <span className={styles.label}>Pickup Location</span>
//                       <span className={styles.value}>{bookingData.pickup}</span>
//                     </div>
//                     <div className={styles.infoRow}>
//                       <span className={styles.label}>Drop-off Location</span>
//                       <span className={styles.value}>
//                         {bookingData.dropoff}
//                       </span>
//                     </div>
//                   </div>
//                 )}

//                 <div className={styles.cancelledMessage}>
//                   <p>Your ride has been cancelled successfully.</p>
//                   <p>No cancellation charges applied.</p>
//                 </div>

//                 <button
//                   className={styles.keepBtn}
//                   onClick={() => (window.location.href = "/book-ride")}
//                 >
//                   Book New Ride
//                 </button>
//               </div>
//             )}

//             {bookingStage === "confirmed" && (
//               <div className={styles.card}>
//                 <div className={styles.successMessage}>
//                   <Check className={styles.successIcon} size={48} />
//                   <h3 className={styles.successTitle}>Booking Confirmed!</h3>
//                   <p className={styles.successText}>
//                     Your driver is on the way to {bookingData?.pickup}
//                   </p>
//                   {driverData && (
//                     <div className={styles.driverEta}>
//                       <p>
//                         Driver: <strong>{driverData.name}</strong>
//                       </p>
//                       <p>
//                         ETA: <strong>5 minutes</strong>
//                       </p>
//                     </div>
//                   )}
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

// with sts and other bend

import React, { useState, useEffect, useRef } from "react";
import { MapPin, Phone, Clock, Check, X } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import styles from "./ridebooking.module.css";
import { bookingService } from "../../services/bookingServices";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Add the missing BookingRoutingMachine component
const BookingRoutingMachine = ({ pickup, dropoff }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    const geocode = async (location) => {
      const locationDatabase = {
        nahan: [30.5596, 77.2948],
        panchkula: [30.6942, 76.8606],
        ambala: [30.3782, 76.7767],
        chandigarh: [30.7333, 76.7794],
        shimla: [31.1048, 77.1734],
        delhi: [28.7041, 77.1025],
        kalka: [30.8371, 76.939],
        rajpura: [30.4789, 76.5937],
        yamunanagar: [30.129, 77.2674],
        karnal: [29.6857, 76.9905],
        panipat: [29.3909, 76.9635],
        kurukshetra: [29.9695, 76.8783],
      };

      const normalizedLocation = location.toLowerCase().trim();
      if (locationDatabase[normalizedLocation]) {
        return locationDatabase[normalizedLocation];
      }

      for (const [city, coords] of Object.entries(locationDatabase)) {
        if (
          normalizedLocation.includes(city) ||
          city.includes(normalizedLocation)
        ) {
          return coords;
        }
      }

      return [30.7333, 76.7794];
    };

    const initRouting = async () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }

      try {
        const pickupCoords = await geocode(pickup);
        const dropoffCoords = await geocode(dropoff);

        if (!pickupCoords || !dropoffCoords) {
          return;
        }

        const pickupIcon = L.divIcon({
          className: "custom-marker",
          html: '<div style="background: #22c55e; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        const dropoffIcon = L.divIcon({
          className: "custom-marker",
          html: '<div style="background: #ef4444; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        const routingControl = L.Routing.control({
          waypoints: [
            L.latLng(pickupCoords[0], pickupCoords[1]),
            L.latLng(dropoffCoords[0], dropoffCoords[1]),
          ],
          routeWhileDragging: false,
          addWaypoints: false,
          draggableWaypoints: false,
          fitSelectedRoutes: true,
          showAlternatives: false,
          lineOptions: {
            styles: [{ color: "#3b82f6", weight: 6, opacity: 0.8 }],
          },
          createMarker: function (i, waypoint, n) {
            return L.marker(waypoint.latLng, {
              draggable: false,
              icon: i === 0 ? pickupIcon : dropoffIcon,
            });
          },
          router: L.Routing.osrmv1({
            serviceUrl: "https://router.project-osrm.org/route/v1",
          }),
        }).addTo(map);

        const container = routingControl.getContainer();
        if (container) {
          container.style.display = "none";
        }

        routingControlRef.current = routingControl;
      } catch (error) {
        console.error("Routing error:", error);
      }
    };

    if (pickup && dropoff) {
      initRouting();
    }

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [pickup, dropoff, map]);

  return null;
};

const RideBookingFlow = ({ bookingId }) => {
  const [bookingStage, setBookingStage] = useState("searching");
  const [countdown, setCountdown] = useState(20);
  const [bookingData, setBookingData] = useState(null);
  const [driverData, setDriverData] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

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
      updateBookingStatus("confirmed");
      driverAssignment();
    }
  }, [bookingStage, countdown]);

  const fetchBookingData = async () => {
    try {
      const data = await bookingService.getBookingById(bookingId);
      setBookingData(data);

      // Set initial stage based on current backend status
      if (data.status === "confirmed") {
        setBookingStage("requested");
        driverAssignment();
      } else if (data.status === "completed") {
        setBookingStage("confirmed");
      } else if (data.status === "cancelled") {
        setBookingStage("cancelled");
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  const updateBookingStatus = async (status) => {
    try {
      setUpdatingStatus(true);
      const result = await bookingService.updateBookingStatus(
        bookingId,
        status
      );
      setBookingData(result.booking);
      console.log(`Booking status updated to: ${status}`);
    } catch (error) {
      console.error("Error updating booking status:", error);
      alert("Failed to update booking status. Please try again.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const driverAssignment = () => {
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

  const handleKeepBooking = async () => {
    setBookingStage("confirmed");
    await updateBookingStatus("completed");
  };

  const handleCancelBooking = async () => {
    try {
      setBookingStage("cancelled");
      await updateBookingStatus("cancelled");
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
                {updatingStatus
                  ? "Updating..."
                  : `Searching For Car - ${countdown}s`}
              </div>
            )}
            {bookingStage === "requested" && (
              <div className={`${styles.statusBar} ${styles.arriving}`}>
                {updatingStatus
                  ? "Updating..."
                  : "Driver Assigned - Arriving in 5 min"}
              </div>
            )}
            {bookingStage === "cancelled" && (
              <div className={`${styles.statusBar} ${styles.cancelled}`}>
                <X size={18} />{" "}
                {updatingStatus ? "Cancelling..." : "Ride Cancelled"}
              </div>
            )}
            {bookingStage === "confirmed" && (
              <div className={`${styles.statusBar} ${styles.confirmed}`}>
                <Check size={18} />{" "}
                {updatingStatus ? "Completing..." : "Ride Completed"}
              </div>
            )}

            {/* Dynamic Map */}
            <div className={styles.mapContainer}>
              {bookingData && bookingData.pickup && bookingData.dropoff ? (
                <MapContainer
                  key={`booking-map-${bookingId}`}
                  center={[30.7333, 76.7794]}
                  zoom={10}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <BookingRoutingMachine
                    pickup={bookingData.pickup}
                    dropoff={bookingData.dropoff}
                  />
                </MapContainer>
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f3f4f6",
                    color: "#6b7280",
                  }}
                >
                  <MapPin size={48} style={{ opacity: 0.3 }} />
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className={styles.detailsSection}>
            {bookingStage === "searching" && (
              <div className={styles.card}>
                <h3 className={`${styles.cardTitle} ${styles.cardTitleblue}`}>
                  Ride Requested
                </h3>
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
                  disabled={updatingStatus}
                >
                  {updatingStatus ? "Cancelling..." : "Cancel Ride"}
                </button>
              </div>
            )}

            {bookingStage === "requested" && driverData && (
              <div className={styles.card}>
                <h3 className={`${styles.cardTitle} ${styles.cardTitleGreen}`}>
                  Ride Confirmed
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

                <div className={styles.driverInfo}>
                  <div className={styles.driverCard}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVcnImBmZ1U-IhsHjdDYaTS9_GpU5CQn9-KA&s"
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
                    disabled={updatingStatus}
                  >
                    {updatingStatus ? "Completing..." : "Complete Ride"}
                  </button>
                  <button
                    className={styles.cancelBtnSecondary}
                    onClick={handleCancelBooking}
                    disabled={updatingStatus}
                  >
                    {updatingStatus ? "Cancelling..." : "Cancel Booking"}
                  </button>
                </div>
              </div>
            )}

            {bookingStage === "cancelled" && (
              <div className={styles.card}>
                <h3 className={`${styles.cardTitle} ${styles.cardTitlered}`}>
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
                  <h3 className={styles.successTitle}>Ride Completed!</h3>
                  <p className={styles.successText}>
                    Thank you for choosing Rydixo
                  </p>
                  {driverData && (
                    <div className={styles.driverEta}>
                      <p>
                        Driver: <strong>{driverData.name}</strong>
                      </p>
                      <p>
                        Vehicle: <strong>{driverData.vehicle.model}</strong>
                      </p>
                    </div>
                  )}
                  <button
                    className={styles.keepBtn}
                    onClick={() => (window.location.href = "/book-ride")}
                  >
                    Book Another Ride
                  </button>
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
