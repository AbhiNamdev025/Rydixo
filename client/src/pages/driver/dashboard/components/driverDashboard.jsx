// import React, { useState, useEffect } from "react";
// import { ResponsiveBar } from "@nivo/bar";
// import {
//   BarChart3,
//   Wallet,
//   Settings,
//   History,
//   Car,
//   Star,
//   Clock,
//   CheckCircle2,
//   XCircle,
//   TrendingUp,
//   User,
//   MapPin,
//   Calendar,
//   ArrowRight,
//   Circle,
// } from "lucide-react";
// import styles from "./home.module.css";
// import RideModal from "./modal/rideModal";
// import SendOTPModal from "../../../../components/local/sendotp/sendOtpModal";
// import OTPVerificationModal from "../../../../components/local/confirmotp/confirmOtp";

// const DriverDashboard = () => {
//   const [driverData, setDriverData] = useState(null);
//   const [rides, setRides] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedPeriod, setSelectedPeriod] = useState("weekly");
//   const [selectedRide, setSelectedRide] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [isSendOTPModalOpen, setIsSendOTPModalOpen] = useState(false);
//   const [isConfirmOTPModalOpen, setIsConfirmOTPModalOpen] = useState(false);
//   const [activeRide, setActiveRide] = useState(null);

//   const openSendOTPModal = (ride) => {
//     setActiveRide(ride);
//     setIsSendOTPModalOpen(true);
//   };

//   const closeSendOTPModal = () => setIsSendOTPModalOpen(false);

//   const openConfirmOTPModal = () => {
//     setIsSendOTPModalOpen(false);
//     setIsConfirmOTPModalOpen(true);
//   };

//   const closeConfirmOTPModal = () => setIsConfirmOTPModalOpen(false);

//   const handleVerifyOTP = (otp) => {
//     console.log("OTP Verified:", otp);
//     closeConfirmOTPModal();
//     alert("Ride Started Successfully!");
//   };

//   useEffect(() => {
//     fetchDriverData();
//     fetchAllRides();

//     const interval = setInterval(fetchAllRides, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   const openModal = (ride) => {
//     setSelectedRide(ride);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedRide(null);
//   };

//   const fetchDriverData = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("No authentication token found");

//       const payload = JSON.parse(atob(token.split(".")[1]));
//       const driverId = payload.id || payload.userId || payload._id;

//       const response = await fetch(
//         `http://localhost:2525/driver/find/${driverId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) throw new Error("Failed to fetch driver data");
//       const data = await response.json();
//       setDriverData(data);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const fetchAllRides = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("http://localhost:2525/ride/find", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) throw new Error("Failed to fetch rides");
//       const data = await response.json();
//       setRides(data);
//     } catch (err) {
//       console.error("Error fetching rides:", err);
//     }
//   };

//   const handleRideResponse = async (rideId, action) => {
//     try {
//       const userData = JSON.parse(localStorage.getItem("user"));
//       if (!userData || !userData._id) throw new Error("User not found");

//       const response = await fetch(
//         `http://localhost:2525/ride/${rideId}/respond`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ action, driverId: userData._id }),
//         }
//       );

//       if (!response.ok) throw new Error("Failed to respond to ride");

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error responding to ride:", error);
//       throw error;
//     }
//   };

//   const getChartData = () => {
//     if (!driverData?.income) return [];
//     const incomeData = driverData.income[selectedPeriod] || [];
//     return incomeData.slice(-6).map((item, index) => ({
//       period:
//         selectedPeriod === "weekly"
//           ? `Week ${index + 1}`
//           : selectedPeriod === "monthly"
//           ? `Month ${index + 1}`
//           : `Day ${index + 1}`,
//       amount: item.amount || 0,
//       rides: item.rides || 0,
//     }));
//   };

//   const getTodayEarning = () => {
//     if (!driverData?.income?.daily?.length) return 0;
//     const today = driverData.income.daily[driverData.income.daily.length - 1];
//     return today?.amount || 0;
//   };

//   const getTotalRides = () => {
//     if (!driverData?.income?.[selectedPeriod]?.length) return 0;
//     return driverData.income[selectedPeriod].reduce(
//       (sum, period) => sum + (period.rides || 0),
//       0
//     );
//   };

//   if (loading) return <div className={styles.loading}>Loading...</div>;
//   if (error) return <div className={styles.error}>Error: {error}</div>;

//   const chartData = getChartData();

//   return (
//     <div className={styles.container}>
//       <main className={styles.main}>
//         <section className={styles.earningSection}>
//           <div className={styles.sectionHeader}>
//             <div className={styles.headerLeft}>
//               <BarChart3 size={20} className={styles.headerIcon} />
//               <h2>Earning Statistics</h2>
//             </div>
//             <select
//               className={styles.periodSelector}
//               value={selectedPeriod}
//               onChange={(e) => setSelectedPeriod(e.target.value)}
//             >
//               <option value="daily">Last Week</option>
//               <option value="weekly">Last Month</option>
//               <option value="monthly">Last Year</option>
//             </select>
//           </div>

//           <div className={styles.todayEarning}>
//             <span>Today's Earning</span>
//             <strong>₹ {getTodayEarning()}</strong>
//           </div>

//           <button className={styles.withdrawBtn}>Withdraw to Bank</button>

//           <div className={styles.chartContainer}>
//             <ResponsiveBar
//               data={chartData}
//               keys={["amount"]}
//               indexBy="period"
//               margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
//               padding={0.3}
//               valueScale={{ type: "linear" }}
//               colors="#000000"
//               borderRadius={8}
//               axisTop={null}
//               axisRight={null}
//               axisBottom={{
//                 tickSize: 0,
//                 tickPadding: 10,
//                 tickRotation: 0,
//               }}
//               axisLeft={{
//                 tickSize: 0,
//                 tickPadding: 10,
//                 tickRotation: 0,
//                 format: (v) => `${v}`,
//               }}
//               enableLabel={false}
//               enableGridY={true}
//               gridYValues={5}
//               theme={{
//                 axis: {
//                   ticks: { text: { fontSize: 11, fill: "#999" } },
//                 },
//                 grid: {
//                   line: { stroke: "#f0f0f0", strokeWidth: 1 },
//                 },
//               }}
//             />
//           </div>

//           <div className={styles.incentives}>
//             <span>Incentives</span>
//             <span className={styles.incentiveValue}>
//               {getTotalRides()}/20 Rides
//             </span>
//           </div>
//         </section>

//         <section className={styles.performanceSection}>
//           <div className={styles.driveRating}>
//             <h3>My Drive Rating</h3>
//             <div className={styles.ratingScore}>4.0</div>
//             <div className={styles.stars}>
//               <Star size={20} fill="currentColor" />
//               <Star size={20} fill="currentColor" />
//               <Star size={20} fill="currentColor" />
//               <Star size={20} fill="currentColor" />
//               <Star size={20} />
//             </div>
//             <p className={styles.ratingMessage}>Great Drive, Keep it up!</p>
//           </div>

//           <div className={styles.performance}>
//             <h3>Performance</h3>
//             <div className={styles.perfGrid}>
//               <div className={styles.perfItem}>
//                 <div className={styles.perfValue}>12h</div>
//                 <div className={styles.perfLabel}>Online Hours</div>
//               </div>
//               <div className={styles.perfItem}>
//                 <div className={styles.perfValue}>150</div>
//                 <div className={styles.perfLabel}>Total Ride Complete</div>
//               </div>
//               <div className={styles.perfItem}>
//                 <div className={styles.perfValue}>2%</div>
//                 <div className={styles.perfLabel}>Cancellation Rate</div>
//               </div>
//               <div className={styles.perfItem}>
//                 <div className={styles.perfValue}>98%</div>
//                 <div className={styles.perfLabel}>Acceptance Rate</div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className={styles.shortcuts}>
//           <h3>ShortCuts</h3>
//           <div className={styles.shortcutGrid}>
//             <button className={styles.shortcutBtn}>
//               <div className={styles.shortcutIcon}>
//                 <Wallet size={24} />
//               </div>
//               <span>Wallet</span>
//             </button>
//             <button className={styles.shortcutBtn}>
//               <div className={styles.shortcutIcon}>
//                 <Settings size={24} />
//               </div>
//               <span>Support</span>
//             </button>
//             <button className={styles.shortcutBtn}>
//               <div className={styles.shortcutIcon}>
//                 <History size={24} />
//               </div>
//               <span>Ride History</span>
//             </button>
//           </div>
//         </section>
//       </main>

//       <aside className={styles.rightSidebar}>
//         <section className={styles.vehicleCard}>
//           <div className={styles.vehicleHeader}>
//             <div className={styles.vehicleHeaderLeft}>
//               <Car size={18} className={styles.vehicleIcon} />
//               <h3>Vehicle</h3>
//             </div>
//             <span className={styles.activeBadge}>
//               Active{" "}
//               <Circle
//                 size={8}
//                 fill="#4caf50"
//                 className={styles.activeIndicator}
//               />
//             </span>
//           </div>
//           <div className={styles.vehicleInfo}>
//             <div className={styles.vehicleData}>
//               <h4>{driverData?.vehicle_details?.vehicle_name || "Etios"}</h4>
//               <p className={styles.vehicleNumber}>
//                 {driverData?.vehicle_details?.vehicle_number || "HR 09-2026"}
//               </p>
//               <p className={styles.fuelType}>Petrol</p>
//             </div>
//             <div className={styles.vehicleImage}>
//               <img
//                 src="https://www.group1mahindra.co.za/wp-content/uploads/mahindra-scorpio-n-review.jpg"
//                 className={styles.carImage}
//                 alt="Vehicle"
//               />
//             </div>
//           </div>
//         </section>

//         <section className={styles.rideRequests}>
//           <h3>Ride Requests</h3>
//           <div className={styles.requestsList}>
//             {rides.filter(
//               (ride) => ride.status === "pending" || ride.status === "confirmed"
//             ).length === 0 ? (
//               <p className={styles.noRides}>No ride Requests</p>
//             ) : (
//               rides
//                 .filter((ride) => ride.status === "pending")
//                 .map((ride, index) => (
//                   <div key={ride._id || index} className={styles.requestItem}>
//                     <div className={styles.requestLeft}>
//                       <div className={styles.requestAvatar}>
//                         <User size={16} color="#fff" />
//                       </div>
//                       <div className={styles.requestInfo}>
//                         <strong>{ride.user?.name || "User"}</strong>
//                         <p>
//                           {ride.pickup} to {ride.dropoff}
//                         </p>
//                         <p>Status: {ride.status}</p>
//                       </div>
//                     </div>
//                     <div className={styles.requestActions}>
//                       <span className={styles.fare}>₹ {ride.fare || 0}</span>
//                       <button
//                         className={styles.viewDetailsBtn}
//                         onClick={() => openModal(ride)}
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 ))
//             )}
//           </div>
//         </section>

//         <section className={styles.rideHistory}>
//           <div className={styles.historyHeader}>
//             <h3>Ride History</h3>
//             <a href="#" className={styles.viewAll}>
//               View All <ArrowRight size={16} />
//             </a>
//           </div>
//           <p className={styles.historySubtitle}>My Previous Rides</p>
//           <div className={styles.historyItem}>
//             <div className={styles.historyIcon}>
//               <Car size={20} />
//             </div>
//             <div className={styles.historyDetails}>
//               <strong>June 15, 2025</strong>
//               <p>12:30 pm, 123 maheshnagar to chandigarh</p>
//               <span className={styles.historyFare}>₹ 800</span>
//             </div>
//           </div>
//         </section>
//       </aside>

//       <RideModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         ride={selectedRide}
//         onRideResponse={handleRideResponse}
//         onOpenSendOTP={openSendOTPModal}
//       />

//       <SendOTPModal
//         isOpen={isSendOTPModalOpen}
//         onClose={closeSendOTPModal}
//         ride={activeRide}
//         onSendOTP={openConfirmOTPModal}
//       />

//       <OTPVerificationModal
//         isOpen={isConfirmOTPModalOpen}
//         onClose={closeConfirmOTPModal}
//         ride={activeRide}
//         onVerifyOTP={handleVerifyOTP}
//       />
//     </div>
//   );
// };

// export default DriverDashboard;

// import React, { useState, useEffect } from "react";
// import { ResponsiveBar } from "@nivo/bar";
// import {
//   BarChart3,
//   Wallet,
//   Settings,
//   History,
//   Car,
//   Star,
//   Circle,
//   ArrowRight,
//   User,
// } from "lucide-react";
// import styles from "./home.module.css";
// import RideModal from "./modal/rideModal";
// import SendOTPModal from "../../../../components/local/sendotp/sendOtpModal";
// import OTPVerificationModal from "../../../../components/local/confirmotp/confirmOtp";

// const DriverDashboard = () => {
//   const [driverData, setDriverData] = useState(null);
//   const [rides, setRides] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedPeriod, setSelectedPeriod] = useState("weekly");
//   const [selectedRide, setSelectedRide] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [isSendOTPModalOpen, setIsSendOTPModalOpen] = useState(false);
//   const [isConfirmOTPModalOpen, setIsConfirmOTPModalOpen] = useState(false);
//   const [activeRide, setActiveRide] = useState(null);
//   const [responding, setResponding] = useState(false);

//   const openSendOTPModal = (ride) => {
//     if (!ride || !ride._id) {
//       console.error("Invalid ride data:", ride);
//       return;
//     }
//     setActiveRide(ride);
//     setIsSendOTPModalOpen(true);
//   };

//   const closeSendOTPModal = () => setIsSendOTPModalOpen(false);

//   const openConfirmOTPModal = () => {
//     setIsSendOTPModalOpen(false);
//     setIsConfirmOTPModalOpen(true);
//   };

//   const closeConfirmOTPModal = () => setIsConfirmOTPModalOpen(false);

//   const handleVerifyOTP = async (otp) => {
//     try {
//       if (!activeRide || !activeRide._id) {
//         alert("Invalid ride data");
//         return;
//       }

//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `http://localhost:2525/ride/${activeRide._id}/start`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ otp }),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to start ride");
//       }

//       closeConfirmOTPModal();
//       alert("Ride Started Successfully!");
//       await fetchAllRides();
//     } catch (error) {
//       console.error("Error starting ride:", error);
//       alert(error.message || "Invalid OTP. Please try again.");
//     }
//   };

//   useEffect(() => {
//     fetchDriverData();
//     fetchAllRides();
//     const interval = setInterval(fetchAllRides, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   const openModal = (ride) => {
//     if (!ride || !ride._id) {
//       console.error("Invalid ride data:", ride);
//       return;
//     }
//     setSelectedRide(ride);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedRide(null);
//   };

//   const fetchDriverData = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("No authentication token found");
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       const driverId = payload.id || payload.userId || payload._id;

//       const response = await fetch(
//         `http://localhost:2525/driver/find/${driverId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) throw new Error("Failed to fetch driver data");
//       const data = await response.json();
//       setDriverData(data);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const fetchAllRides = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("http://localhost:2525/ride/find", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) throw new Error("Failed to fetch rides");
//       const data = await response.json();
//       setRides(data);
//     } catch (err) {
//       console.error("Error fetching rides:", err);
//     }
//   };

//   const handleRideResponse = async (rideId, action) => {
//     try {
//       if (!rideId) {
//         throw new Error("Invalid ride ID");
//       }

//       const userData = JSON.parse(localStorage.getItem("user"));
//       if (!userData || !userData._id) throw new Error("User not found");

//       const otp = Math.floor(1000 + Math.random() * 9000);

//       const response = await fetch(
//         `http://localhost:2525/ride/${rideId}/respond`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             action,
//             driverId: userData._id,
//             otp: action === "accepted" ? otp : undefined,
//           }),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to respond to ride");
//       }

//       const data = await response.json();
//       await fetchAllRides();
//       return data;
//     } catch (error) {
//       console.error("Error responding to ride:", error);
//       throw error;
//     }
//   };

//   const handleSendOTP = async () => {
//     if (!activeRide || !activeRide._id) {
//       alert("Invalid ride data");
//       return;
//     }

//     try {
//       await handleRideResponse(activeRide._id, "accepted");

//       openConfirmOTPModal();

//       await fetchAllRides();
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       alert("Failed to send OTP. Please try again.");
//     }
//   };

//   const handleAcceptRide = async (ride) => {
//     if (responding || !ride || !ride._id) return;

//     setResponding(true);
//     try {
//       await handleRideResponse(ride._id, "accepted");
//       closeModal();
//       openSendOTPModal(ride);
//     } catch (error) {
//       console.error("Accept failed:", error);
//       alert("Failed to confirm ride. Please try again.");
//     } finally {
//       setResponding(false);
//     }
//   };

//   const getChartData = () => {
//     if (!driverData?.income) return [];
//     const incomeData = driverData.income[selectedPeriod] || [];
//     return incomeData.slice(-6).map((item, index) => ({
//       period:
//         selectedPeriod === "weekly"
//           ? `Week ${index + 1}`
//           : selectedPeriod === "monthly"
//           ? `Month ${index + 1}`
//           : `Day ${index + 1}`,
//       amount: item.amount || 0,
//       rides: item.rides || 0,
//     }));
//   };

//   const getTodayEarning = () => {
//     if (!driverData?.income?.daily?.length) return 0;
//     const today = driverData.income.daily[driverData.income.daily.length - 1];
//     return today?.amount || 0;
//   };

//   const getTotalRides = () => {
//     if (!driverData?.income?.[selectedPeriod]?.length) return 0;
//     return driverData.income[selectedPeriod].reduce(
//       (sum, period) => sum + (period.rides || 0),
//       0
//     );
//   };

//   if (loading) return <div className={styles.loading}>Loading...</div>;
//   if (error) return <div className={styles.error}>Error: {error}</div>;

//   const chartData = getChartData();

//   return (
//     <div className={styles.container}>
//       <main className={styles.main}>
//         {/* Earnings Section */}
//         <section className={styles.earningSection}>
//           <div className={styles.sectionHeader}>
//             <div className={styles.headerLeft}>
//               <BarChart3 size={20} className={styles.headerIcon} />
//               <h2>Earning Statistics</h2>
//             </div>
//             <select
//               className={styles.periodSelector}
//               value={selectedPeriod}
//               onChange={(e) => setSelectedPeriod(e.target.value)}
//             >
//               <option value="daily">Last Week</option>
//               <option value="weekly">Last Month</option>
//               <option value="monthly">Last Year</option>
//             </select>
//           </div>
//           <div className={styles.todayEarning}>
//             <span>Today's Earning</span>
//             <strong>₹ {getTodayEarning()}</strong>
//           </div>
//           <button className={styles.withdrawBtn}>Withdraw to Bank</button>
//           <div className={styles.chartContainer}>
//             <ResponsiveBar
//               data={chartData}
//               keys={["amount"]}
//               indexBy="period"
//               margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
//               padding={0.3}
//               valueScale={{ type: "linear" }}
//               colors="#000000"
//               borderRadius={8}
//               axisTop={null}
//               axisRight={null}
//               axisBottom={{
//                 tickSize: 0,
//                 tickPadding: 10,
//                 tickRotation: 0,
//               }}
//               axisLeft={{
//                 tickSize: 0,
//                 tickPadding: 10,
//                 tickRotation: 0,
//                 format: (v) => `${v}`,
//               }}
//               enableLabel={false}
//               enableGridY={true}
//               gridYValues={5}
//               theme={{
//                 axis: {
//                   ticks: { text: { fontSize: 11, fill: "#999" } },
//                 },
//                 grid: {
//                   line: { stroke: "#f0f0f0", strokeWidth: 1 },
//                 },
//               }}
//             />
//           </div>
//           <div className={styles.incentives}>
//             <span>Incentives</span>
//             <span className={styles.incentiveValue}>
//               {getTotalRides()}/20 Rides
//             </span>
//           </div>
//         </section>

//         {/* Performance Section */}
//         <section className={styles.performanceSection}>
//           <div className={styles.driveRating}>
//             <h3>My Drive Rating</h3>
//             <div className={styles.ratingScore}>4.0</div>
//             <div className={styles.stars}>
//               <Star size={20} fill="currentColor" />
//               <Star size={20} fill="currentColor" />
//               <Star size={20} fill="currentColor" />
//               <Star size={20} fill="currentColor" />
//               <Star size={20} />
//             </div>
//             <p className={styles.ratingMessage}>Great Drive, Keep it up!</p>
//           </div>
//         </section>
//       </main>

//       <aside className={styles.rightSidebar}>
//         {/* Vehicle Section */}
//         <section className={styles.vehicleCard}>
//           <div className={styles.vehicleHeader}>
//             <div className={styles.vehicleHeaderLeft}>
//               <Car size={18} className={styles.vehicleIcon} />
//               <h3>Vehicle</h3>
//             </div>
//             <span className={styles.activeBadge}>
//               Active{" "}
//               <Circle
//                 size={8}
//                 fill="#4caf50"
//                 className={styles.activeIndicator}
//               />
//             </span>
//           </div>
//           <div className={styles.vehicleInfo}>
//             <div className={styles.vehicleData}>
//               <h4>{driverData?.vehicle_details?.vehicle_name || "Etios"}</h4>
//               <p className={styles.vehicleNumber}>
//                 {driverData?.vehicle_details?.vehicle_number || "HR 09-2026"}
//               </p>
//               <p className={styles.fuelType}>Petrol</p>
//             </div>
//             <div className={styles.vehicleImage}>
//               <img
//                 src="https://www.group1mahindra.co.za/wp-content/uploads/mahindra-scorpio-n-review.jpg"
//                 className={styles.carImage}
//                 alt="Vehicle"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Ride Requests Section */}
//         <section className={styles.rideRequests}>
//           <h3>Ride Requests</h3>
//           <div className={styles.requestsList}>
//             {rides.filter(
//               (ride) =>
//                 ride.status === "pending" ||
//                 ride.status === "confirmed" ||
//                 ride.status === "ongoing"
//             ).length === 0 ? (
//               <p className={styles.noRides}>No ride Requests</p>
//             ) : (
//               rides
//                 .filter(
//                   (ride) =>
//                     ride.status === "pending" ||
//                     ride.status === "confirmed" ||
//                     ride.status === "ongoing"
//                 )
//                 .map((ride, index) => (
//                   <div key={ride._id || index} className={styles.requestItem}>
//                     <div className={styles.requestLeft}>
//                       <div className={styles.requestAvatar}>
//                         <User size={16} color="#fff" />
//                       </div>
//                       <div className={styles.requestInfo}>
//                         <strong>
//                           {ride.user?.name || ride.userId?.name || "User"}
//                         </strong>
//                         <p>
//                           {ride.pickup} to {ride.dropoff}
//                         </p>
//                         <p>
//                           Status:{" "}
//                           <span
//                             style={{
//                               color:
//                                 ride.status === "pending"
//                                   ? "#f59e0b"
//                                   : ride.status === "confirmed"
//                                   ? "#3b82f6"
//                                   : ride.status === "ongoing"
//                                   ? "#10b981"
//                                   : "#6b7280",
//                               fontWeight: "600",
//                             }}
//                           >
//                             {ride.status === "pending"
//                               ? "Waiting"
//                               : ride.status === "confirmed"
//                               ? "Accepted"
//                               : ride.status === "ongoing"
//                               ? "In Progress"
//                               : ride.status}
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                     <div className={styles.requestActions}>
//                       <span className={styles.fare}>₹ {ride.fare || 0}</span>
//                       <button
//                         className={styles.viewDetailsBtn}
//                         onClick={() => {
//                           if (!ride._id) {
//                             console.error("Invalid ride ID");
//                             return;
//                           }
//                           if (
//                             ride.status === "confirmed" ||
//                             ride.status === "ongoing"
//                           ) {
//                             openSendOTPModal(ride);
//                           } else {
//                             openModal(ride);
//                           }
//                         }}
//                       >
//                         {ride.status === "pending"
//                           ? "View Details"
//                           : ride.status === "confirmed"
//                           ? "Start Ride"
//                           : "End Trip"}
//                       </button>
//                     </div>
//                   </div>
//                 ))
//             )}
//           </div>
//         </section>
//       </aside>

//       <RideModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         ride={selectedRide}
//         onRideResponse={handleAcceptRide}
//         onOpenSendOTP={openSendOTPModal}
//       />

//       <SendOTPModal
//         isOpen={isSendOTPModalOpen}
//         onClose={closeSendOTPModal}
//         ride={activeRide}
//         onSendOTP={handleSendOTP}
//       />

//       <OTPVerificationModal
//         isOpen={isConfirmOTPModalOpen}
//         onClose={closeConfirmOTPModal}
//         ride={activeRide}
//         onVerifyOTP={handleVerifyOTP}
//       />
//     </div>
//   );
// };

// export default DriverDashboard;
import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import {
  BarChart3,
  Wallet,
  Settings,
  History,
  Car,
  Star,
  Circle,
  ArrowRight,
  User,
} from "lucide-react";
import styles from "./home.module.css";
import RideModal from "./modal/rideModal";
import SendOTPModal from "../../../../components/local/sendotp/sendOtpModal";
import OTPVerificationModal from "../../../../components/local/confirmotp/confirmOtp";

const DriverDashboard = () => {
  const [driverData, setDriverData] = useState(null);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const [selectedRide, setSelectedRide] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSendOTPModalOpen, setIsSendOTPModalOpen] = useState(false);
  const [isConfirmOTPModalOpen, setIsConfirmOTPModalOpen] = useState(false);
  const [activeRide, setActiveRide] = useState(null);
  const [responding, setResponding] = useState(false);

  const openSendOTPModal = (ride) => {
    if (!ride || !ride._id) return;
    setActiveRide(ride);
    setIsSendOTPModalOpen(true);
  };

  const closeSendOTPModal = () => setIsSendOTPModalOpen(false);

  const openConfirmOTPModal = () => {
    setIsSendOTPModalOpen(false);
    setIsConfirmOTPModalOpen(true);
  };

  const closeConfirmOTPModal = () => setIsConfirmOTPModalOpen(false);

  const handleSendOTP = async () => {
    if (!activeRide || !activeRide._id) return;
    try {
      await handleRideResponse(activeRide._id, "accepted");
      await fetchAllRides();
      openConfirmOTPModal();
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOTP = async (otp) => {
    if (!activeRide || !activeRide._id) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:2525/ride/${activeRide._id}/start`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to start ride");
      }

      closeConfirmOTPModal();
      alert("Ride Started Successfully!");
      await fetchAllRides();
    } catch (error) {
      console.error("Error starting ride:", error);
      alert(error.message || "Invalid OTP. Please try again.");
    }
  };

  useEffect(() => {
    fetchDriverData();
    fetchAllRides();
    const interval = setInterval(fetchAllRides, 10000);
    return () => clearInterval(interval);
  }, []);

  const openModal = (ride) => {
    if (!ride || !ride._id) return;
    setSelectedRide(ride);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRide(null);
  };

  const fetchDriverData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");
      const payload = JSON.parse(atob(token.split(".")[1]));
      const driverId = payload.id || payload.userId || payload._id;

      const response = await fetch(
        `http://localhost:2525/driver/find/${driverId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch driver data");
      const data = await response.json();
      setDriverData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchAllRides = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:2525/ride/find", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch rides");
      const data = await response.json();
      setRides(data);
    } catch (err) {
      console.error("Error fetching rides:", err);
    }
  };

  const handleRideResponse = async (rideId, action) => {
    if (!rideId) throw new Error("Invalid ride ID");
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData || !userData._id) throw new Error("User not found");
    const otp = Math.floor(1000 + Math.random() * 9000);

    const response = await fetch(
      `http://localhost:2525/ride/${rideId}/respond`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          driverId: userData._id,
          otp: action === "accepted" ? otp : undefined,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to respond to ride");
    }

    const data = await response.json();
    await fetchAllRides();
    return data;
  };

  const handleAcceptRide = async (ride) => {
    if (responding || !ride || !ride._id) return;
    setResponding(true);
    try {
      await handleRideResponse(ride._id, "accepted");
      closeModal();
      openSendOTPModal(ride);
    } catch (error) {
      console.error("Accept failed:", error);
      alert("Failed to confirm ride. Please try again.");
    } finally {
      setResponding(false);
    }
  };

  const getChartData = () => {
    if (!driverData?.income) return [];
    const incomeData = driverData.income[selectedPeriod] || [];
    return incomeData.slice(-6).map((item, index) => ({
      period:
        selectedPeriod === "weekly"
          ? `Week ${index + 1}`
          : selectedPeriod === "monthly"
          ? `Month ${index + 1}`
          : `Day ${index + 1}`,
      amount: item.amount || 0,
      rides: item.rides || 0,
    }));
  };

  const getTodayEarning = () => {
    if (!driverData?.income?.daily?.length) return 0;
    const today = driverData.income.daily[driverData.income.daily.length - 1];
    return today?.amount || 0;
  };

  const getTotalRides = () => {
    if (!driverData?.income?.[selectedPeriod]?.length) return 0;
    return driverData.income[selectedPeriod].reduce(
      (sum, period) => sum + (period.rides || 0),
      0
    );
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  const chartData = getChartData();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Earnings Section */}
        <section className={styles.earningSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.headerLeft}>
              <BarChart3 size={20} className={styles.headerIcon} />
              <h2>Earning Statistics</h2>
            </div>
            <select
              className={styles.periodSelector}
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="daily">Last Week</option>
              <option value="weekly">Last Month</option>
              <option value="monthly">Last Year</option>
            </select>
          </div>
          <div className={styles.todayEarning}>
            <span>Today's Earning</span>
            <strong>₹ {getTodayEarning()}</strong>
          </div>
          <button className={styles.withdrawBtn}>Withdraw to Bank</button>
          <div className={styles.chartContainer}>
            <ResponsiveBar
              data={chartData}
              keys={["amount"]}
              indexBy="period"
              margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
              padding={0.3}
              valueScale={{ type: "linear" }}
              colors="#000000"
              borderRadius={8}
              axisTop={null}
              axisRight={null}
              axisBottom={{ tickSize: 0, tickPadding: 10, tickRotation: 0 }}
              axisLeft={{ tickSize: 0, tickPadding: 10, tickRotation: 0 }}
              enableLabel={false}
              enableGridY={true}
              gridYValues={5}
              theme={{
                axis: { ticks: { text: { fontSize: 11, fill: "#999" } } },
                grid: { line: { stroke: "#f0f0f0", strokeWidth: 1 } },
              }}
            />
          </div>
          <div className={styles.incentives}>
            <span>Incentives</span>
            <span className={styles.incentiveValue}>
              {getTotalRides()}/20 Rides
            </span>
          </div>
        </section>

        {/* Performance Section */}
        <section className={styles.performanceSection}>
          <div className={styles.driveRating}>
            <h3>My Drive Rating</h3>
            <div className={styles.ratingScore}>4.0</div>
            <div className={styles.stars}>
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} />
            </div>
            <p className={styles.ratingMessage}>Great Drive, Keep it up!</p>
          </div>
        </section>
      </main>

      <aside className={styles.rightSidebar}>
        {/* Vehicle Section */}
        <section className={styles.vehicleCard}>
          <div className={styles.vehicleHeader}>
            <div className={styles.vehicleHeaderLeft}>
              <Car size={18} className={styles.vehicleIcon} />
              <h3>Vehicle</h3>
            </div>
            <span className={styles.activeBadge}>
              Active{" "}
              <Circle
                size={8}
                fill="#4caf50"
                className={styles.activeIndicator}
              />
            </span>
          </div>
          <div className={styles.vehicleInfo}>
            <div className={styles.vehicleData}>
              <h4>{driverData?.vehicle_details?.vehicle_name || "Etios"}</h4>
              <p className={styles.vehicleNumber}>
                {driverData?.vehicle_details?.vehicle_number || "HR 09-2026"}
              </p>
              <p className={styles.fuelType}>Petrol</p>
            </div>
            <div className={styles.vehicleImage}>
              <img
                src="https://www.group1mahindra.co.za/wp-content/uploads/mahindra-scorpio-n-review.jpg"
                className={styles.carImage}
                alt="Vehicle"
              />
            </div>
          </div>
        </section>

        {/* Ride Requests Section */}
        <section className={styles.rideRequests}>
          <h3>Ride Requests</h3>
          <div className={styles.requestsList}>
            {rides.filter(
              (ride) =>
                ride.status === "pending" ||
                ride.status === "confirmed" ||
                ride.status === "ongoing"
            ).length === 0 ? (
              <p className={styles.noRides}>No ride Requests</p>
            ) : (
              rides
                .filter(
                  (ride) =>
                    ride.status === "pending" ||
                    ride.status === "confirmed" ||
                    ride.status === "ongoing"
                )
                .map((ride, index) => (
                  <div key={ride._id || index} className={styles.requestItem}>
                    <div className={styles.requestLeft}>
                      <div className={styles.requestAvatar}>
                        <User size={16} color="#fff" />
                      </div>
                      <div className={styles.requestInfo}>
                        <strong>
                          {ride.user?.name || ride.userId?.name || "User"}
                        </strong>
                        <p>
                          {ride.pickup} to {ride.dropoff}
                        </p>
                        <p>
                          Status:{" "}
                          <span
                            style={{
                              color:
                                ride.status === "pending"
                                  ? "#f59e0b"
                                  : ride.status === "confirmed"
                                  ? "#3b82f6"
                                  : ride.status === "ongoing"
                                  ? "#10b981"
                                  : "#6b7280",
                              fontWeight: "600",
                            }}
                          >
                            {ride.status === "pending"
                              ? "Waiting"
                              : ride.status === "confirmed"
                              ? "Accepted"
                              : ride.status === "ongoing"
                              ? "In Progress"
                              : ride.status}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className={styles.requestActions}>
                      <span className={styles.fare}>₹ {ride.fare || 0}</span>
                      <button
                        className={styles.viewDetailsBtn}
                        onClick={() => {
                          if (!ride._id) return;
                          if (
                            ride.status === "confirmed" ||
                            ride.status === "ongoing"
                          ) {
                            openSendOTPModal(ride);
                          } else {
                            openModal(ride);
                          }
                        }}
                      >
                        {ride.status === "pending"
                          ? "View Details"
                          : ride.status === "confirmed"
                          ? "Start Ride"
                          : "End Trip"}
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </section>
      </aside>

      {/* Modals */}
      <RideModal
        isOpen={isModalOpen}
        onClose={closeModal}
        ride={selectedRide}
        onRideResponse={handleAcceptRide}
        onOpenSendOTP={openSendOTPModal}
      />
      <SendOTPModal
        isOpen={isSendOTPModalOpen}
        onClose={closeSendOTPModal}
        ride={activeRide}
        onSendOTP={handleSendOTP}
      />
      <OTPVerificationModal
        isOpen={isConfirmOTPModalOpen}
        onClose={closeConfirmOTPModal}
        ride={activeRide}
        onVerifyOTP={handleVerifyOTP}
      />
    </div>
  );
};

export default DriverDashboard;
