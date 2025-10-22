// import React, { useState, useEffect, useRef } from "react";
// import {
//   MapPin,
//   Phone,
//   Clock,
//   Check,
//   X,
//   Car,
//   Key,
//   Users,
//   Calendar,
// } from "lucide-react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import styles from "./ridebooking.module.css";
// import { bookingService } from "../../services/bookingServices";

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
//   const [updatingStatus, setUpdatingStatus] = useState(false);
//   const [pollingInterval, setPollingInterval] = useState(null);

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

//       const interval = setInterval(fetchBookingData, 5000);
//       setPollingInterval(interval);

//       return () => {
//         if (interval) clearInterval(interval);
//       };
//     }
//   }, [bookingId]);

//   useEffect(() => {
//     if (bookingStage === "searching" && countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     } else if (bookingStage === "searching" && countdown === 0) {
//       setBookingStage("pending");
//     }
//   }, [bookingStage, countdown]);

//   const fetchBookingData = async () => {
//     try {
//       const data = await bookingService.getBookingById(bookingId);
//       setBookingData(data);

//       if (data.status === "pending" && bookingStage !== "pending") {
//         setBookingStage("pending");
//       } else if (data.status === "confirmed" && data.driverId) {
//         setBookingStage("requested");

//         //   fetch driver
//         if (!driverData) {
//           fetchDriverData(data.driverId);
//         }
//       } else if (data.status === "completed") {
//         setBookingStage("confirmed");
//         if (pollingInterval) clearInterval(pollingInterval);
//       } else if (data.status === "cancelled") {
//         setBookingStage("cancelled");
//         if (pollingInterval) clearInterval(pollingInterval);
//       }
//     } catch (error) {
//       console.error("Error fetching booking data:", error);
//     }
//   };

//   const fetchDriverData = async (driverId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `http://localhost:2525/driver/find/${driverId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.ok) {
//         const driver = await response.json();

//         // Only generate OTP if driverData is not already set
//         setDriverData(
//           (prev) =>
//             prev || {
//               name: driver.name || "Driver",
//               phone: driver.phone || "+91 0000000000",
//               vehicle: {
//                 model: driver.vehicle_details?.vehicle_name || "Car",
//                 number: driver.vehicle_details?.vehicle_number || "XX00XX0000",
//                 type: driver.vehicle_type || "Sedan",
//               },
//               rating: driver.rating || 4.5,
//               otp: Math.floor(1000 + Math.random() * 9000),
//             }
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching driver data:", error);
//     }
//   };

//   const updateBookingStatus = async (status) => {
//     try {
//       setUpdatingStatus(true);
//       const result = await bookingService.updateBookingStatus(
//         bookingId,
//         status
//       );
//       setBookingData(result.booking);
//       console.log(`Booking status updated to: ${status}`);
//     } catch (error) {
//       console.error("Error updating booking status:", error);
//       alert("Failed to update booking status. Please try again.");
//     } finally {
//       setUpdatingStatus(false);
//     }
//   };

//   const handleKeepBooking = async () => {
//     setBookingStage("confirmed");
//     await updateBookingStatus("completed");
//   };

//   const handleCancelBooking = async () => {
//     try {
//       setBookingStage("cancelled");
//       await updateBookingStatus("cancelled");
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
//                 {updatingStatus
//                   ? "Updating..."
//                   : `Searching For Car - ${countdown}s`}
//               </div>
//             )}
//             {bookingStage === "pending" && (
//               <div className={`${styles.statusBar} ${styles.pending}`}>
//                 {updatingStatus
//                   ? "Updating..."
//                   : "Waiting for driver acceptance..."}
//               </div>
//             )}
//             {bookingStage === "requested" && (
//               <div className={`${styles.statusBar} ${styles.arriving}`}>
//                 {updatingStatus
//                   ? "Updating..."
//                   : "Driver Assigned - Arriving in 5 min"}
//               </div>
//             )}
//             {bookingStage === "cancelled" && (
//               <div className={`${styles.statusBar} ${styles.cancelled}`}>
//                 <X size={18} />{" "}
//                 {updatingStatus ? "Cancelling..." : "Ride Cancelled"}
//               </div>
//             )}
//             {bookingStage === "confirmed" && (
//               <div className={`${styles.statusBar} ${styles.confirmed}`}>
//                 <Check size={18} />{" "}
//                 {updatingStatus ? "Completing..." : "Ride Completed"}
//               </div>
//             )}

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
//                     Estimated Fare: ₹ 499
//                   </span>
//                   <span className={styles.fareType}>Cash</span>
//                 </div>

//                 <button
//                   className={styles.cancelBtn}
//                   onClick={handleCancelBooking}
//                   disabled={updatingStatus}
//                 >
//                   {updatingStatus ? "Cancelling..." : "Cancel Ride"}
//                 </button>
//               </div>
//             )}

//             {bookingStage === "pending" && (
//               <div className={styles.card}>
//                 <h3 className={`${styles.cardTitle} ${styles.cardTitleblue}`}>
//                   Ride Request Sent
//                 </h3>
//                 <p className={styles.cardSubtitle}>
//                   Waiting for driver acceptance
//                 </p>

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

//                 <div className={styles.pendingMessage}>
//                   <p>Your ride request has been sent to nearby drivers.</p>
//                   <p>Waiting for a driver to accept your ride...</p>
//                 </div>

//                 <button
//                   className={styles.cancelBtn}
//                   onClick={handleCancelBooking}
//                   disabled={updatingStatus}
//                 >
//                   {updatingStatus ? "Cancelling..." : "Cancel Ride"}
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
//                     <div className={styles.vehicleIcon}>
//                       <Car size={24} className={styles.icon} />
//                     </div>
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
//                     <div className={styles.otpIcon}>
//                       <Key size={20} className={styles.icon} />
//                     </div>
//                     <span className={styles.otpLabel}>OTP</span>
//                     <span className={styles.otpValue}>{driverData.otp}</span>
//                   </div>
//                 </div>

//                 <div className={styles.actionButtons}>
//                   <button
//                     className={styles.keepBtn}
//                     onClick={handleKeepBooking}
//                     disabled={updatingStatus}
//                   >
//                     {updatingStatus ? "Completing..." : "Complete Ride"}
//                   </button>
//                   <button
//                     className={styles.cancelBtnSecondary}
//                     onClick={handleCancelBooking}
//                     disabled={updatingStatus}
//                   >
//                     {updatingStatus ? "Cancelling..." : "Cancel Booking"}
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
//                   <h3 className={styles.successTitle}>Ride Completed!</h3>
//                   <p className={styles.successText}>
//                     Thank you for choosing Rydixo
//                   </p>
//                   {driverData && (
//                     <div className={styles.driverEta}>
//                       <p>
//                         Driver: <strong>{driverData.name}</strong>
//                       </p>
//                       <p>
//                         Vehicle: <strong>{driverData.vehicle.model}</strong>
//                       </p>
//                     </div>
//                   )}
//                   <button
//                     className={styles.keepBtn}
//                     onClick={() => (window.location.href = "/book-ride")}
//                   >
//                     Book Another Ride
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className={styles.bottomCards}>
//           <div className={styles.featureCard}>
//             <div className={styles.featureIcon}>
//               <Car size={24} className={styles.icon} />
//             </div>
//             <div className={styles.featureContent}>
//               <h4 className={styles.featureTitle}>Request more rides</h4>
//               <p className={styles.featureText}>For yourself or guest</p>
//             </div>
//           </div>

//           <div className={styles.featureCard}>
//             <div className={styles.featureIcon}>
//               <Users size={24} className={styles.icon} />
//             </div>
//             <div className={styles.featureContent}>
//               <h4 className={styles.featureTitle}>Send and receive</h4>
//               <p className={styles.featureText}>One or multiple items</p>
//             </div>
//           </div>

//           <div className={styles.featureCard}>
//             <div className={styles.featureIcon}>
//               <Calendar size={24} className={styles.icon} />
//             </div>
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


import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Check,
  X,
  Car,
  Key,
  Users,
  Calendar,
} from "lucide-react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import styles from "./ridebooking.module.css";
import { bookingService } from "../../services/bookingServices";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
        if (normalizedLocation.includes(city) || city.includes(normalizedLocation)) {
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
          createMarker: function () {
            return null;
          },
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
  const [pollingInterval, setPollingInterval] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("=== RIDE BOOKING DEBUG ===");
  console.log("Booking ID:", bookingId);
  console.log("Current Stage:", bookingStage);
  console.log("Booking Data:", bookingData);
  console.log("Driver Data:", driverData);
  console.log("Error:", error);
  console.log("===========================");

  useEffect(() => {
    if (bookingId) {
      console.log("Starting polling for booking:", bookingId);
      fetchBookingData();

      const interval = setInterval(fetchBookingData, 5000);
      setPollingInterval(interval);

      return () => {
        if (interval) clearInterval(interval);
      };
    } else {
      setError("No booking ID provided");
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    if (bookingStage === "searching" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (bookingStage === "searching" && countdown === 0) {
      setBookingStage("pending");
    }
  }, [bookingStage, countdown]);

  const fetchBookingData = async () => {
    try {
      console.log("Fetching booking data for:", bookingId);
      
      const data = await bookingService.getBookingById(bookingId);
      console.log("Received booking data:", data);
      
      if (!data) {
        setError("No booking data received");
        setLoading(false);
        return;
      }

      setBookingData(data);
      setError(null);

      // Handle status transitions
      if (data.status === "pending" && bookingStage !== "pending") {
        console.log("Setting stage to: pending");
        setBookingStage("pending");
      } else if (data.status === "confirmed" && data.driverId) {
        console.log("Setting stage to: requested (confirmed with driver)");
        setBookingStage("requested");
        if (!driverData) {
          fetchDriverData(data.driverId);
        }
      } else if (data.status === "ongoing") {
        console.log("Setting stage to: ongoing");
        setBookingStage("ongoing");
        if (!driverData && data.driverId) {
          fetchDriverData(data.driverId);
        }
      } else if (data.status === "completed") {
        console.log("Setting stage to: confirmed (completed)");
        setBookingStage("confirmed");
        if (pollingInterval) clearInterval(pollingInterval);
      } else if (data.status === "cancelled") {
        console.log("Setting stage to: cancelled");
        setBookingStage("cancelled");
        if (pollingInterval) clearInterval(pollingInterval);
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
      setError("Failed to load booking: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDriverData = async (driverId) => {
    try {
      console.log("Fetching driver data for:", driverId);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:2525/driver/find/${driverId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const driver = await response.json();
        console.log("Received driver data:", driver);

        setDriverData({
          name: driver.name || "Driver",
          phone: driver.phone || "+91 0000000000",
          vehicle: {
            model: driver.vehicle_details?.vehicle_name || "Car",
            number: driver.vehicle_details?.vehicle_number || "XX00XX0000",
            type: driver.vehicle_type || "Sedan",
          },
          rating: driver.rating || 4.5,
          otp: bookingData?.otp || Math.floor(1000 + Math.random() * 9000),
        });
      } else {
        console.error("Failed to fetch driver data");
      }
    } catch (error) {
      console.error("Error fetching driver data:", error);
    }
  };

  const updateBookingStatus = async (status) => {
    try {
      setUpdatingStatus(true);
      const result = await bookingService.updateBookingStatus(bookingId, status);
      setBookingData(result.booking);
      console.log(`Booking status updated to: ${status}`);
    } catch (error) {
      console.error("Error updating booking status:", error);
      alert("Failed to update booking status. Please try again.");
    } finally {
      setUpdatingStatus(false);
    }
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

  // Loading state
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading ride details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h3>Error Loading Ride</h3>
          <p>{error}</p>
          <p>Booking ID: {bookingId}</p>
          <button 
            className={styles.keepBtn} 
            onClick={() => window.location.href = "/book-ride"}
          >
            Book New Ride
          </button>
        </div>
      </div>
    );
  }

  // No booking data
  if (!bookingData) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h3>No Booking Found</h3>
          <p>Unable to find booking with ID: {bookingId}</p>
          <button 
            className={styles.keepBtn} 
            onClick={() => window.location.href = "/book-ride"}
          >
            Book New Ride
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.grid}>
          <div className={styles.mapSection}>
            {/* Status Bar */}
            {bookingStage === "searching" && (
              <div className={`${styles.statusBar} ${styles.searching}`}>
                {updatingStatus ? "Updating..." : `Searching For Car - ${countdown}s`}
              </div>
            )}
            {bookingStage === "pending" && (
              <div className={`${styles.statusBar} ${styles.pending}`}>
                {updatingStatus ? "Updating..." : "Waiting for driver acceptance..."}
              </div>
            )}
            {bookingStage === "requested" && (
              <div className={`${styles.statusBar} ${styles.arriving}`}>
                {updatingStatus ? "Updating..." : "Driver Assigned - Arriving in 5 min"}
              </div>
            )}
            {bookingStage === "ongoing" && (
              <div className={`${styles.statusBar} ${styles.ongoing}`}>
                {updatingStatus ? "Updating..." : "Ride in Progress"}
              </div>
            )}
            {bookingStage === "cancelled" && (
              <div className={`${styles.statusBar} ${styles.cancelled}`}>
                <X size={18} /> {updatingStatus ? "Cancelling..." : "Ride Cancelled"}
              </div>
            )}
            {bookingStage === "confirmed" && (
              <div className={`${styles.statusBar} ${styles.confirmed}`}>
                <Check size={18} /> {updatingStatus ? "Completing..." : "Ride Completed"}
              </div>
            )}

            {/* Map Container */}
            <div className={styles.mapContainer}>
              {bookingData && bookingData.pickup && bookingData.dropoff ? (
                <MapContainer
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
                <div className={styles.noMap}>
                  <MapPin size={48} />
                  <p>Map not available</p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.detailsSection}>
            {/* SEARCHING STATE */}
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
                        <p className={styles.locationValue}>{bookingData.pickup}</p>
                      </div>
                    </div>
                    <div className={styles.locationItem}>
                      <MapPin className={styles.icon} size={20} />
                      <div>
                        <p className={styles.locationLabel}>Drop-off Location</p>
                        <p className={styles.locationValue}>{bookingData.dropoff}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className={styles.fareInfo}>
                  <Clock className={styles.icon} size={20} />
                  <span className={styles.fareLabel}>
                    Estimated Fare: ₹ {bookingData?.fare || 499}
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

            {/* PENDING STATE */}
            {bookingStage === "pending" && (
              <div className={styles.card}>
                <h3 className={`${styles.cardTitle} ${styles.cardTitleblue}`}>
                  Ride Request Sent
                </h3>
                <p className={styles.cardSubtitle}>Waiting for driver acceptance</p>

                {bookingData && (
                  <div className={styles.locationInfo}>
                    <div className={styles.locationItem}>
                      <MapPin className={styles.icon} size={20} />
                      <div>
                        <p className={styles.locationLabel}>Pickup Location</p>
                        <p className={styles.locationValue}>{bookingData.pickup}</p>
                      </div>
                    </div>
                    <div className={styles.locationItem}>
                      <MapPin className={styles.icon} size={20} />
                      <div>
                        <p className={styles.locationLabel}>Drop-off Location</p>
                        <p className={styles.locationValue}>{bookingData.dropoff}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className={styles.fareInfo}>
                  <Clock className={styles.icon} size={20} />
                  <span className={styles.fareLabel}>
                    Estimated Fare: ₹ {bookingData?.fare || 264.51}
                  </span>
                  <span className={styles.fareType}>Cash</span>
                </div>

                <div className={styles.pendingMessage}>
                  <p>Your ride request has been sent to nearby drivers.</p>
                  <p>Waiting for a driver to accept your ride...</p>
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

            {/* REQUESTED STATE (Confirmed with driver) */}
            {bookingStage === "requested" && driverData && (
              <div className={styles.card}>
                <h3 className={`${styles.cardTitle} ${styles.cardTitleGreen}`}>
                  Driver Assigned
                </h3>
                <p className={styles.cardSubtitle}>Waiting for driver to start ride</p>

                {bookingData && (
                  <div className={styles.locationInfo}>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>Pickup Location</span>
                      <span className={styles.value}>{bookingData.pickup}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>Drop-off Location</span>
                      <span className={styles.value}>{bookingData.dropoff}</span>
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
                    <button className={styles.callBtn} onClick={handleCallDriver}>
                      <Phone size={20} />
                    </button>
                  </div>

                  <div className={styles.vehicleInfo}>
                    <div className={styles.vehicleIcon}>
                      <Car size={24} className={styles.icon} />
                    </div>
                    <div>
                      <p className={styles.vehicleName}>{driverData.vehicle.model}</p>
                      <p className={styles.vehicleModel}>AC {driverData.vehicle.type}</p>
                    </div>
                    <span className={styles.vehicleNumber}>{driverData.vehicle.number}</span>
                  </div>

                  <div className={styles.otpInfo}>
                    <div className={styles.otpIcon}>
                      <Key size={20} className={styles.icon} />
                    </div>
                    <span className={styles.otpLabel}>Your OTP</span>
                    <span className={styles.otpValue}>{driverData.otp}</span>
                  </div>
                  <p className={styles.otpNote}>
                    Share this OTP with the driver to start your ride
                  </p>
                </div>

                <div className={styles.actionButtons}>
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

            {/* ONGOING STATE */}
            {bookingStage === "ongoing" && driverData && (
              <div className={styles.card}>
                <h3 className={`${styles.cardTitle} ${styles.cardTitleGreen}`}>
                  Ride in Progress
                </h3>
                <p className={styles.cardSubtitle}>Enjoy your ride!</p>

                {bookingData && (
                  <div className={styles.locationInfo}>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>Pickup Location</span>
                      <span className={styles.value}>{bookingData.pickup}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>Drop-off Location</span>
                      <span className={styles.value}>{bookingData.dropoff}</span>
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
                    <button className={styles.callBtn} onClick={handleCallDriver}>
                      <Phone size={20} />
                    </button>
                  </div>

                  <div className={styles.vehicleInfo}>
                    <div className={styles.vehicleIcon}>
                      <Car size={24} className={styles.icon} />
                    </div>
                    <div>
                      <p className={styles.vehicleName}>{driverData.vehicle.model}</p>
                      <p className={styles.vehicleModel}>AC {driverData.vehicle.type}</p>
                    </div>
                    <span className={styles.vehicleNumber}>{driverData.vehicle.number}</span>
                  </div>
                </div>

                <div className={styles.ongoingMessage}>
                  <p>Your ride is in progress</p>
                  <p>Driver will complete the ride at destination</p>
                </div>
              </div>
            )}

            {/* CANCELLED STATE */}
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
                      <span className={styles.value}>{bookingData.dropoff}</span>
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

            {/* CONFIRMED STATE (Completed) */}
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
            <div className={styles.featureIcon}>
              <Car size={24} className={styles.icon} />
            </div>
            <div className={styles.featureContent}>
              <h4 className={styles.featureTitle}>Request more rides</h4>
              <p className={styles.featureText}>For yourself or guest</p>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Users size={24} className={styles.icon} />
            </div>
            <div className={styles.featureContent}>
              <h4 className={styles.featureTitle}>Send and receive</h4>
              <p className={styles.featureText}>One or multiple items</p>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Calendar size={24} className={styles.icon} />
            </div>
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