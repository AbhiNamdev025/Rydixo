// import React, { useState, useEffect } from "react";
// import {
//   MapPin,
//   Phone,
//   MessageCircle,
//   Car,
//   IndianRupee,
//   Clock,
//   User,
//   Navigation,
// } from "lucide-react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "leaflet/dist/leaflet.css";
// import styles from "./ongoing.module.css";

// // Leaflet configuration
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// import { BASE_URL_RIDE } from "../../../../const/const";

// const OngoingRides = () => {
//   const [ongoingRides, setOngoingRides] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [verifying, setVerifying] = useState(false);
//   const [mapCenter, setMapCenter] = useState([30.3782, 76.7767]);
//   const [showTripComplete, setShowTripComplete] = useState(false);
//   const [completedRide, setCompletedRide] = useState(null);
//   const [selectedPayment, setSelectedPayment] = useState("cash");

//   useEffect(() => {
//     fetchOngoingRides();
//     const interval = setInterval(fetchOngoingRides, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchOngoingRides = async () => {
//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       const response = await fetch(`${BASE_URL_RIDE}/find`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) throw new Error("Failed to fetch rides");
//       const data = await response.json();

//       const ongoing = data.filter((ride) => ride.status === "ongoing");
//       setOngoingRides(ongoing);

//       if (ongoing.length > 0 && ongoing[0]?.pickup) {
//         updateMapCenter(ongoing[0].pickup);
//       }

//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching rides:", err);
//       setLoading(false);
//     }
//   };

//   // Enhanced function to fetch complete ride details
//   const fetchCompleteRideDetails = async (rideId) => {
//     try {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       const response = await fetch(`${BASE_URL_RIDE}/${rideId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) throw new Error("Failed to fetch ride details");
//       return await response.json();
//     } catch (error) {
//       console.error("Error fetching ride details:", error);
//       throw error;
//     }
//   };

//   // Calculate fare breakdown based on your RoundTrip component logic
//   const calculateFareBreakdown = (ride) => {
//     if (!ride) return null;

//     // Use the actual fare from the ride or calculate based on your logic
//     const totalFare = ride.fare || 1000;
//     const distance = ride.distance || 65;

//     // Calculate breakdown based on your RoundTrip component logic
//     const baseFare = Math.round(totalFare * 0.6); // 60% base fare
//     const distanceFare = Math.round(totalFare * 0.25); // 25% distance fare
//     const tax = Math.round(totalFare * 0.15); // 15% tax

//     return {
//       total: totalFare,
//       base: baseFare,
//       distance: distanceFare,
//       tax: tax,
//       distanceKm: distance,
//     };
//   };

//   const updateMapCenter = (location) => {
//     const locationCoordinates = {
//       delhi: [28.6139, 77.209],
//       mumbai: [19.076, 72.8777],
//       ambala: [30.3782, 76.7767],
//       chandigarh: [30.7333, 76.7794],
//     };

//     const lowerLocation = location.toLowerCase();
//     for (const [city, coords] of Object.entries(locationCoordinates)) {
//       if (lowerLocation.includes(city)) {
//         setMapCenter(coords);
//         return;
//       }
//     }
//   };

//   const handleEndTrip = async (ride) => {
//     try {
//       setVerifying(true);
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");

//       console.log("Ending trip for ride:", ride._id);

//       // Step 1: Complete the ride
//       const response = await fetch(`${BASE_URL_RIDE}/${ride._id}/complete`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       const responseData = await response.json();
//       console.log("Complete ride response:", response.status, responseData);

//       if (!response.ok) {
//         throw new Error(
//           responseData.error ||
//             responseData.message ||
//             "Failed to complete ride"
//         );
//       }

//       // Step 2: Fetch complete ride details with all information
//       let completeRideData;
//       try {
//         completeRideData = await fetchCompleteRideDetails(ride._id);
//         console.log("Complete ride details:", completeRideData);
//       } catch (error) {
//         console.warn("Could not fetch complete ride details, using basic data");
//         completeRideData = responseData;
//       }

//       // Step 3: Calculate fare breakdown
//       const fareBreakdown = calculateFareBreakdown(completeRideData);

//       // Step 4: Combine all data
//       const enhancedCompletedRide = {
//         ...completeRideData,
//         fareBreakdown: fareBreakdown,
//         baseFare: fareBreakdown?.base,
//         distanceFare: fareBreakdown?.distance,
//         tax: fareBreakdown?.tax,
//         // Ensure we have all required fields with fallbacks
//         pickup:
//           completeRideData.pickup ||
//           ride.pickup ||
//           "Pickup location not available",
//         dropoff:
//           completeRideData.dropoff ||
//           ride.dropoff ||
//           "Dropoff location not available",
//         distance: completeRideData.distance || ride.distance || "65",
//         fare: completeRideData.fare || ride.fare || "1000",
//         estimatedTime:
//           completeRideData.estimatedTime || ride.estimatedTime || "20",
//       };

//       setCompletedRide(enhancedCompletedRide);
//       setShowTripComplete(true);
//       await fetchOngoingRides();
//     } catch (error) {
//       console.error("Error completing ride:", error);
//       toast.error(
//         error.message || "Failed to complete ride. Please try again."
//       );
//     } finally {
//       setVerifying(false);
//     }
//   };

//   const handleContact = (phone) => {
//     if (phone) {
//       window.open(`tel:${phone}`, "_self");
//     }
//   };

//   const handleMessage = (phone) => {
//     if (phone) {
//       window.open(`sms:${phone}`, "_self");
//     }
//   };

//   const handleNavigate = (location) => {
//     if (location) {
//       const encodedLocation = encodeURIComponent(location);
//       window.open(
//         `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`,
//         "_blank"
//       );
//     }
//   };

//   const handleGoToDashboard = () => {
//     setShowTripComplete(false);
//     window.location.href = "/dashboard";
//   };

//   const handleAcceptNextRide = () => {
//     setShowTripComplete(false);
//     fetchOngoingRides();
//   };

//   const handlePaymentDone = () => {
//     toast.success("Payment marked as completed!");
//     // You can add additional payment processing logic here
//   };

//   if (loading) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.loading}>Loading ongoing rides...</div>
//       </div>
//     );
//   }

//   if (showTripComplete && completedRide) {
//     const fareBreakdown =
//       completedRide.fareBreakdown || calculateFareBreakdown(completedRide);

//     return (
//       <div className={styles.tripCompleteScreen}>
//         <div className={styles.completeHeader}>
//           <h1>Trip Complete</h1>
//         </div>

//         <div className={styles.completeContent}>
//           <div className={styles.leftSection}>
//             <div className={styles.card}>
//               <div className={styles.fareHeader}>
//                 <h2>Total Fare</h2>
//                 <button className={styles.paidBadge}>Paid</button>
//               </div>
//               <div className={styles.fareAmount}>
//                 ₹ {completedRide.fare || "1000"}
//               </div>
//               <div className={styles.fareBreakdown}>
//                 <div className={styles.breakdownItem}>
//                   <span>Base Fare</span>
//                   <span>
//                     ₹ {fareBreakdown?.base || completedRide.baseFare || "600"}
//                   </span>
//                 </div>
//                 <div className={styles.breakdownItem}>
//                   <span>
//                     Distance Fare (
//                     {fareBreakdown?.distanceKm ||
//                       completedRide.distance ||
//                       "65"}{" "}
//                     km)
//                   </span>
//                   <span>
//                     ₹{" "}
//                     {fareBreakdown?.distance ||
//                       completedRide.distanceFare ||
//                       "250"}
//                   </span>
//                 </div>
//                 <div className={styles.breakdownItem}>
//                   <span>Tax (18%)</span>
//                   <span>
//                     ₹ {fareBreakdown?.tax || completedRide.tax || "150"}
//                   </span>
//                 </div>
//                 {completedRide.bookingType === "roundTrip" && (
//                   <div className={styles.breakdownItem}>
//                     <span>Round Trip Multiplier</span>
//                     <span>× 1.8</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className={styles.card}>
//               <h2>Payment Method</h2>
//               <div className={styles.paymentOptions}>
//                 <label className={styles.paymentOption}>
//                   <input
//                     type="radio"
//                     name="payment"
//                     checked={selectedPayment === "cash"}
//                     onChange={() => setSelectedPayment("cash")}
//                   />
//                   <span>Cash</span>
//                 </label>
//                 <label className={styles.paymentOption}>
//                   <input
//                     type="radio"
//                     name="payment"
//                     checked={selectedPayment === "upi"}
//                     onChange={() => setSelectedPayment("upi")}
//                   />
//                   <span>UPI</span>
//                 </label>
//                 <label className={styles.paymentOption}>
//                   <input
//                     type="radio"
//                     name="payment"
//                     checked={selectedPayment === "card"}
//                     onChange={() => setSelectedPayment("card")}
//                   />
//                   <span>Card</span>
//                 </label>
//               </div>
//               <button className={styles.doneBtn} onClick={handlePaymentDone}>
//                 Mark as Paid
//               </button>
//             </div>

//             <div className={styles.mapCard}>
//               <MapContainer
//                 center={mapCenter}
//                 zoom={10}
//                 style={{ height: "100%", width: "100%", borderRadius: "12px" }}
//               >
//                 <TileLayer
//                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 <Marker position={mapCenter}>
//                   <Popup>
//                     <div>
//                       <strong>Trip Completed</strong>
//                       <br />
//                       From: {completedRide.pickup}
//                       <br />
//                       To: {completedRide.dropoff}
//                     </div>
//                   </Popup>
//                 </Marker>
//               </MapContainer>
//             </div>
//           </div>

//           <div className={styles.rightSection}>
//             <div className={styles.illustrationCard}>
//               <div className={styles.illustration}>
//                 <div className={styles.phone}>
//                   <div className={styles.checkmark}>✓</div>
//                 </div>
//                 <div className={styles.cardIcon}></div>
//               </div>
//             </div>

//             <div className={styles.card}>
//               <h2>Trip Summary</h2>
//               <div className={styles.summaryLocation}>
//                 <MapPin size={20} className={styles.locationIcon} />
//                 <div className={styles.locationInfo}>
//                   <strong>Pick Up</strong>
//                   <p>{completedRide.pickup}</p>
//                 </div>
//               </div>
//               <div className={styles.summaryLocation}>
//                 <MapPin size={20} className={styles.locationIcon} />
//                 <div className={styles.locationInfo}>
//                   <strong>Drop Off</strong>
//                   <p>{completedRide.dropoff}</p>
//                 </div>
//               </div>
//               <div className={styles.summaryStats}>
//                 <div className={styles.stat}>
//                   <Car size={18} />
//                   <span>{completedRide.distance || "65"} km</span>
//                 </div>
//                 <div className={styles.stat}>
//                   <IndianRupee size={18} />
//                   <span>₹{completedRide.fare || "1000"}</span>
//                 </div>
//                 <div className={styles.stat}>
//                   <Clock size={18} />
//                   <span>{completedRide.estimatedTime || "20"} min</span>
//                 </div>
//               </div>

//               {completedRide.driver && (
//                 <div className={styles.driverSummary}>
//                   <h4>Driver Information</h4>
//                   <p>
//                     <strong>Name:</strong>{" "}
//                     {completedRide.driver.name || "Driver"}
//                   </p>
//                   <p>
//                     <strong>Vehicle:</strong>{" "}
//                     {completedRide.driver.vehicle?.model || "Car"}
//                   </p>
//                   <p>
//                     <strong>Rating:</strong> ★{" "}
//                     {completedRide.driver.rating || "4.5"}
//                   </p>
//                 </div>
//               )}
//             </div>

//             <div className={styles.actionButtons}>
//               <button
//                 className={styles.dashboardBtn}
//                 onClick={handleGoToDashboard}
//               >
//                 Go to Dashboard
//               </button>
//               <button
//                 className={styles.nextRideBtn}
//                 onClick={handleAcceptNextRide}
//               >
//                 Accept Next Ride
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (ongoingRides.length === 0) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.noRides}>
//           <Car size={48} className={styles.noRidesIcon} />
//           <h3>No Ongoing Rides</h3>
//           <p>You don't have any ongoing rides at the moment.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1>Ongoing Trip</h1>
//         <div className={styles.onlineStatus}>
//           <div className={styles.onlineDot}></div>
//           Online
//         </div>
//       </div>

//       {ongoingRides.map((ride) => (
//         <div key={ride._id} className={styles.rideCard}>
//           <div className={styles.mapSection}>
//             <MapContainer
//               center={mapCenter}
//               zoom={13}
//               style={{ height: "450px", width: "90%" }}
//             >
//               <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               />
//               <Marker position={mapCenter}>
//                 <Popup>Pickup Location: {ride.pickup}</Popup>
//               </Marker>
//             </MapContainer>
//           </div>

//           <div>
//             <button
//               className={styles.navigateBtn}
//               onClick={() => handleNavigate(ride.pickup)}
//             >
//               <Navigation size={20} />
//               <span>Navigate to Pickup</span>
//             </button>

//             <div className={styles.userSection}>
//               <div className={styles.userInfo}>
//                 <div className={styles.avatar}>
//                   <User size={24} className={styles.avatarFallback} />
//                 </div>
//                 <div className={styles.userDetails}>
//                   <h2 className={styles.userName}>
//                     {ride.user?.name || ride.userId?.name || "Nitin"}
//                   </h2>
//                   <div className={styles.userActions}>
//                     <button
//                       className={styles.contactBtn}
//                       onClick={() => handleContact(ride.user?.phone)}
//                     >
//                       <Phone size={16} />
//                       Contact
//                     </button>
//                     <button
//                       className={styles.messageBtn}
//                       onClick={() => handleMessage(ride.user?.phone)}
//                     >
//                       <MessageCircle size={16} />
//                       Message
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <div className={styles.locations}>
//                 <div className={styles.location}>
//                   <MapPin size={20} className={styles.locationIcon} />
//                   <div className={styles.locationDetails}>
//                     <strong>Pick Up</strong>
//                     <p>
//                       {ride.pickup ||
//                         "123 Main Bazar, Sardar Bazar, Ambala Cantt"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className={styles.location}>
//                   <MapPin size={20} className={styles.locationIcon} />
//                   <div className={styles.locationDetails}>
//                     <strong>Drop Off</strong>
//                     <p>{ride.dropoff || "Railway station, Delhi"}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className={styles.rideInfo}>
//                 <div className={styles.infoItem}>
//                   <span className={styles.infoValue}>
//                     {ride.distance || "65"} km
//                   </span>
//                   <span className={styles.infoLabel}>Distance</span>
//                 </div>

//                 <div className={styles.infoItem}>
//                   <span className={styles.infoValue}>
//                     ₹{ride.fare || "1000"}
//                   </span>
//                   <span className={styles.infoLabel}>Fare</span>
//                 </div>

//                 <div className={styles.infoItem}>
//                   <span className={styles.infoValue}>
//                     {ride.estimatedTime || "20"} min
//                   </span>
//                   <span className={styles.infoLabel}>Time</span>
//                 </div>
//               </div>

//               <div className={styles.actions}>
//                 <button
//                   className={styles.endTripBtn}
//                   onClick={() => handleEndTrip(ride)}
//                   disabled={verifying}
//                 >
//                   {verifying ? "Ending Trip..." : "End Trip"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OngoingRides;

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  MessageCircle,
  Car,
  IndianRupee,
  Clock,
  User,
  Navigation,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";
import styles from "./ongoing.module.css";
import Image from "../../../../../public/assets/images/tripcomplete/image.png";

// Leaflet configuration
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

import { BASE_URL_RIDE } from "../../../../const/const";

const OngoingRides = () => {
  const [ongoingRides, setOngoingRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [mapCenter, setMapCenter] = useState([30.3782, 76.7767]);
  const [showTripComplete, setShowTripComplete] = useState(false);
  const [completedRide, setCompletedRide] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("cash");

  useEffect(() => {
    fetchOngoingRides();
    const interval = setInterval(fetchOngoingRides, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchOngoingRides = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await fetch(`${BASE_URL_RIDE}/find`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch rides");
      const data = await response.json();

      const ongoing = data.filter((ride) => ride.status === "ongoing");
      setOngoingRides(ongoing);

      if (ongoing.length > 0 && ongoing[0]?.pickup) {
        updateMapCenter(ongoing[0].pickup);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching rides:", err);
      setLoading(false);
    }
  };

  const fetchCompleteRideDetails = async (rideId) => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await fetch(`${BASE_URL_RIDE}/find/${rideId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch ride details");
      return await response.json();
    } catch (error) {
      console.error("Error fetching ride details:", error);
      throw error;
    }
  };

  const calculateFareBreakdown = (ride) => {
    if (!ride) return null;

    const totalFare = ride.fare || 1000;
    const distance = ride.distance || 65;

    const baseFare = Math.round(totalFare * 0.6); // 60% base fare
    const distanceFare = Math.round(totalFare * 0.25); // 25% distance fare
    const tax = Math.round(totalFare * 0.15); // 15% tax

    return {
      total: totalFare,
      base: baseFare,
      distance: distanceFare,
      tax: tax,
      distanceKm: distance,
    };
  };

  const updateMapCenter = (location) => {
    const locationCoordinates = {
      delhi: [28.6139, 77.209],
      mumbai: [19.076, 72.8777],
      ambala: [30.3782, 76.7767],
      chandigarh: [30.7333, 76.7794],
    };

    const lowerLocation = location.toLowerCase();
    for (const [city, coords] of Object.entries(locationCoordinates)) {
      if (lowerLocation.includes(city)) {
        setMapCenter(coords);
        return;
      }
    }
  };

  const handleEndTrip = async (ride) => {
    try {
      setVerifying(true);
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      console.log("Ending trip for ride:", ride._id);

      const response = await fetch(`${BASE_URL_RIDE}/${ride._id}/complete`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      console.log("Complete ride response:", response.status, responseData);

      if (!response.ok) {
        throw new Error(
          responseData.error ||
            responseData.message ||
            "Failed to complete ride"
        );
      }

      let completeRideData;
      try {
        completeRideData = await fetchCompleteRideDetails(ride._id);
        console.log("Complete ride details:", completeRideData);
      } catch (error) {
        console.warn("Could not fetch complete ride details, using basic data");
        completeRideData = responseData;
      }

      const fareBreakdown = calculateFareBreakdown(completeRideData);

      const enhancedCompletedRide = {
        ...completeRideData,
        fareBreakdown: fareBreakdown,
        baseFare: fareBreakdown?.base,
        distanceFare: fareBreakdown?.distance,
        tax: fareBreakdown?.tax,
        pickup:
          completeRideData.pickup ||
          ride.pickup ||
          "Pickup location not available",
        dropoff:
          completeRideData.dropoff ||
          ride.dropoff ||
          "Dropoff location not available",
        distance: completeRideData.distance || ride.distance || "65",
        fare: completeRideData.fare || ride.fare || "1000",
        estimatedTime:
          completeRideData.estimatedTime || ride.estimatedTime || "20",
      };

      setCompletedRide(enhancedCompletedRide);
      setShowTripComplete(true);
      await fetchOngoingRides();
    } catch (error) {
      console.error("Error completing ride:", error);
      toast.error(
        error.message || "Failed to complete ride. Please try again."
      );
    } finally {
      setVerifying(false);
    }
  };

  const handleContact = (phone) => {
    if (phone) {
      window.open(`tel:${phone}`, "_self");
    }
  };

  const handleMessage = (phone) => {
    if (phone) {
      window.open(`sms:${phone}`, "_self");
    }
  };

  const handleNavigate = (location) => {
    if (location) {
      const encodedLocation = encodeURIComponent(location);
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`,
        "_blank"
      );
    }
  };

  const handleGoToDashboard = () => {
    setShowTripComplete(false);
    window.location.href = "/dashboard";
  };

  const handleAcceptNextRide = () => {
    setShowTripComplete(false);
    fetchOngoingRides();
  };

  const handlePaymentDone = () => {
    toast.success("Payment marked as completed!");
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading ongoing rides...</div>
      </div>
    );
  }

  if (showTripComplete && completedRide) {
    const fareBreakdown =
      completedRide.fareBreakdown || calculateFareBreakdown(completedRide);

    return (
      <div className={styles.tripCompleteScreen}>
        <div className={styles.completeHeader}>
          <h1>Trip Complete</h1>
        </div>

        <div className={styles.completeContent}>
          <div className={styles.leftSection}>
            <div className={styles.combinedPaymentSection}>
              <div className={styles.paymentLeft}>
                <div className={styles.paymentHeader}>
                  <h2>Total Fare</h2>
                  <button className={styles.paidBadge}>Paid</button>
                </div>
                <div className={styles.fareAmount}>
                  ₹ {completedRide.fare || "1000"}
                </div>
                <div className={styles.fareBreakdown}>
                  <div className={styles.breakdownItem}>
                    <span>Base Fare</span>
                    <span>
                      ₹ {fareBreakdown?.base || completedRide.baseFare || "600"}
                    </span>
                  </div>
                  <div className={styles.breakdownItem}>
                    <span>
                      Distance Fare (
                      {fareBreakdown?.distanceKm ||
                        completedRide.distance ||
                        "65"}{" "}
                      km)
                    </span>
                    <span>
                      ₹{" "}
                      {fareBreakdown?.distance ||
                        completedRide.distanceFare ||
                        "250"}
                    </span>
                  </div>
                  <div className={styles.breakdownItem}>
                    <span>Tax (18%)</span>
                    <span>
                      ₹ {fareBreakdown?.tax || completedRide.tax || "150"}
                    </span>
                  </div>
                  {completedRide.bookingType === "roundTrip" && (
                    <div className={styles.breakdownItem}>
                      <span>Round Trip Multiplier</span>
                      <span>× 1.8</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.mapCard}>
              <MapContainer
                center={mapCenter}
                zoom={10}
                style={{ height: "100%", width: "100%", borderRadius: "12px" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={mapCenter}>
                  <Popup>
                    <div>
                      <strong>Trip Completed</strong>
                      <br />
                      From: {completedRide.pickup}
                      <br />
                      To: {completedRide.dropoff}
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          <div className={styles.rightSection}>
            {/* Combined Image and Trip Summary Container */}
            <div className={styles.combinedImageSummary}>
              <div className={styles.paymentRight}>
                <div className={styles.paymentMethod}>
                  <h3>Payment Done</h3>
                  <div className={styles.paymentOptions}>
                    <label className={styles.paymentOption}>
                      <input
                        type="radio"
                        name="payment"
                        checked={selectedPayment === "cash"}
                        onChange={() => setSelectedPayment("cash")}
                      />
                      <span>Cash</span>
                    </label>
                    <label className={styles.paymentOption}>
                      <input
                        type="radio"
                        name="payment"
                        checked={selectedPayment === "upi"}
                        onChange={() => setSelectedPayment("upi")}
                      />
                      <span>UPI</span>
                    </label>
                    <label className={styles.paymentOption}>
                      <input
                        type="radio"
                        name="payment"
                        checked={selectedPayment === "card"}
                        onChange={() => setSelectedPayment("card")}
                      />
                      <span>Card</span>
                    </label>
                  </div>
                  <button
                    className={styles.doneBtn}
                    onClick={handlePaymentDone}
                  >
                    Done
                  </button>
                </div>
              </div>
              <div className={styles.imageSection}>
                <div className={styles.illustrationCard}>
                  <div className={styles.illustrationContent}>
                    <img src={Image} alt="image" />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.summarySection}>
              <div className={styles.summaryCard}>
                <h2>Trip Summary</h2>
                <div className={styles.summaryLocation}>
                  <MapPin size={20} className={styles.locationIcon} />
                  <div className={styles.locationInfo}>
                    <strong>Pick Up</strong>
                    <p>{completedRide.pickup}</p>
                  </div>
                </div>
                <div className={styles.summaryLocation}>
                  <MapPin size={20} className={styles.locationIcon} />
                  <div className={styles.locationInfo}>
                    <strong>Drop Off</strong>
                    <p>{completedRide.dropoff}</p>
                  </div>
                </div>
                <div className={styles.summaryStats}>
                  <div className={styles.stat}>
                    <Car size={18} />
                    <span>{completedRide.distance || "65"} km</span>
                  </div>
                  <div className={styles.stat}>
                    <IndianRupee size={18} />
                    <span>₹{completedRide.fare || "1000"}</span>
                  </div>
                  <div className={styles.stat}>
                    <Clock size={18} />
                    <span>{completedRide.estimatedTime || "20"} min</span>
                  </div>
                </div>

                {completedRide.driver && (
                  <div className={styles.driverSummary}>
                    <h4>Driver Information</h4>
                    <p>
                      <strong>Name:</strong>{" "}
                      {completedRide.driver.name || "Driver"}
                    </p>
                    <p>
                      <strong>Vehicle:</strong>{" "}
                      {completedRide.driver.vehicle?.model || "Car"}
                    </p>
                    <p>
                      <strong>Rating:</strong> ★{" "}
                      {completedRide.driver.rating || "4.5"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button
                className={styles.dashboardBtn}
                onClick={handleGoToDashboard}
              >
                Go to Dashboard
              </button>
              <button
                className={styles.nextRideBtn}
                onClick={handleAcceptNextRide}
              >
                Accept Next Ride
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (ongoingRides.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.noRides}>
          <Car size={48} className={styles.noRidesIcon} />
          <h3>No Ongoing Rides</h3>
          <p>You don't have any ongoing rides at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Ongoing Trip</h1>
        <div className={styles.onlineStatus}>
          <div className={styles.onlineDot}></div>
          Online
        </div>
      </div>

      {ongoingRides.map((ride) => (
        <div key={ride._id} className={styles.rideCard}>
          <div className={styles.mapSection}>
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: "500px", width: "90%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={mapCenter}>
                <Popup>Pickup Location: {ride.pickup}</Popup>
              </Marker>
            </MapContainer>
          </div>

          <div>
            <button
              className={styles.navigateBtn}
              onClick={() => handleNavigate(ride.pickup)}
            >
              <Navigation size={20} />
              <span>Navigate to Pickup</span>
            </button>

            <div className={styles.userSection}>
              <div className={styles.userInfo}>
                <div className={styles.avatar}>
                  <User size={24} className={styles.avatarFallback} />
                </div>
                <div className={styles.userDetails}>
                  <h2 className={styles.userName}>
                    {ride.user?.name || ride.userId?.name || "Nitin"}
                  </h2>
                  <div className={styles.userActions}>
                    <button
                      className={styles.contactBtn}
                      onClick={() => handleContact(ride.user?.phone)}
                    >
                      <Phone size={16} />
                      Contact
                    </button>
                    <button
                      className={styles.messageBtn}
                      onClick={() => handleMessage(ride.user?.phone)}
                    >
                      <MessageCircle size={16} />
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className={styles.locations}>
                <div className={styles.location}>
                  <MapPin size={20} className={styles.locationIcon} />
                  <div className={styles.locationDetails}>
                    <strong>Pick Up</strong>
                    <p>
                      {ride.pickup ||
                        "123 Main Bazar, Sardar Bazar, Ambala Cantt"}
                    </p>
                  </div>
                </div>

                <div className={styles.location}>
                  <MapPin size={20} className={styles.locationIcon} />
                  <div className={styles.locationDetails}>
                    <strong>Drop Off</strong>
                    <p>{ride.dropoff || "Railway station, Delhi"}</p>
                  </div>
                </div>
              </div>

              <div className={styles.rideInfo}>
                <div className={styles.infoItem}>
                  <span className={styles.infoValue}>
                    {ride.distance || "65"} km
                  </span>
                  <span className={styles.infoLabel}>Distance</span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoValue}>
                    ₹{ride.fare || "1000"}
                  </span>
                  <span className={styles.infoLabel}>Fare</span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoValue}>
                    {ride.estimatedTime || "20"} min
                  </span>
                  <span className={styles.infoLabel}>Time</span>
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.endTripBtn}
                  onClick={() => handleEndTrip(ride)}
                  disabled={verifying}
                >
                  {verifying ? "Ending Trip..." : "End Trip"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OngoingRides;
