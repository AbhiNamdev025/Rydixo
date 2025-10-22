// import React, { useState, useEffect } from "react";
// import {
//   Home,
//   Car,
//   DollarSign,
//   Navigation,
//   Star,
//   User,
//   Menu,
// } from "lucide-react";
// import styles from "./sidebar.module.css";

// const Sidebar = () => {
//   const [driverData, setDriverData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isOnline, setIsOnline] = useState(true);
//   const [isOpen, setIsOpen] = useState(true);

//   useEffect(() => {
//     fetchDriverData();
//   }, []);

//   const fetchDriverData = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setLoading(false);
//         return;
//       }

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

//       if (response.ok) {
//         const data = await response.json();
//         setDriverData(data);
//       }
//     } catch (err) {
//       console.error("Error fetching driver data in sidebar:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOnlineToggle = () => {
//     setIsOnline(!isOnline);
//   };

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <button className={styles.menuButton} onClick={toggleSidebar}>
//         <Menu size={24} />
//       </button>

//       <aside
//         className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
//       >
//         {loading ? (
//           <div className={styles.profile}>
//             <div className={styles.avatar}>D</div>
//             <h3 className={styles.profileName}>Loading...</h3>
//             <p className={styles.profileEmail}>Loading...</p>
//             <div className={styles.onlineStatus}>
//               <label>Online</label>
//               <div className={styles.toggleSwitch}>
//                 <input
//                   type="checkbox"
//                   checked={isOnline}
//                   onChange={handleOnlineToggle}
//                 />
//                 <span className={styles.slider}></span>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className={styles.profile}>
//             <div className={styles.avatar}>
//               {driverData?.name?.charAt(0).toUpperCase() || "D"}
//             </div>
//             <h3 className={styles.profileName}>
//               {driverData?.name || "Driver"}
//             </h3>
//             <p className={styles.profileEmail}>
//               {driverData?.email || "driver@example.com"}
//             </p>
//             <div className={styles.onlineStatus}>
//               <label>{isOnline ? "Online" : "Offline"}</label>
//               <div className={styles.toggleSwitch}>
//                 <input
//                   type="checkbox"
//                   checked={isOnline}
//                   onChange={handleOnlineToggle}
//                 />
//                 <span className={styles.slider}></span>
//               </div>
//             </div>
//           </div>
//         )}

//         <nav className={styles.nav}>
//           <a href="#" className={`${styles.navItem} ${styles.navItemActive}`}>
//             <Home size={20} className={styles.navIcon} />
//             <span>Dashboard</span>
//           </a>
//           <a href="#" className={styles.navItem}>
//             <Car size={20} className={styles.navIcon} />
//             <span>Ride</span>
//           </a>
//           <a href="#" className={styles.navItem}>
//             <DollarSign size={20} className={styles.navIcon} />
//             <span>Earning</span>
//           </a>
//           <a href="#" className={styles.navItem}>
//             <Navigation size={20} className={styles.navIcon} />
//             <span>Ongoing Trip</span>
//           </a>
//           <a href="#" className={styles.navItem}>
//             <Star size={20} className={styles.navIcon} />
//             <span>Rating</span>
//           </a>
//           <a href="#" className={styles.navItem}>
//             <User size={20} className={styles.navIcon} />
//             <span>Profile</span>
//           </a>
//         </nav>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from "react";
import {
  Home,
  Car,
  DollarSign,
  Navigation,
  Star,
  User,
  Menu,
  X,
} from "lucide-react";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  const [driverData, setDriverData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (driverData?.status) {
      setIsOnline(driverData.status === "online");
    }
  }, [driverData]);

  useEffect(() => {
    fetchDriverData();
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const checkScreenSize = () => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);

    // On desktop, sidebar should always be open
    if (!mobile) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const fetchDriverData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

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

      if (response.ok) {
        const data = await response.json();
        setDriverData(data);
      }
    } catch (err) {
      console.error("Error fetching driver data in sidebar:", err);
    } finally {
      setLoading(false);
    }
  };

  // const handleOnlineToggle = () => {
  //   const newStatus = !isOnline;
  //   setIsOnline(newStatus);
  // };

  const handleOnlineToggle = async () => {
    const newStatus = isOnline ? "offline" : "online";
    setIsOnline(!isOnline);

    try {
      const token = localStorage.getItem("token");
      if (!token || !driverData?._id) return;

      await fetch(`http://localhost:2525/driver/status/${driverData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Ham */}
      {isMobile && (
        <button className={styles.menuButton} onClick={toggleSidebar}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      )}

      {isMobile && isOpen && (
        <div className={styles.overlay} onClick={toggleSidebar}></div>
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
      >
        {loading ? (
          <div className={styles.profile}>
            <div className={styles.avatar}>D</div>
            <h3 className={styles.profileName}>Loading...</h3>
            <p className={styles.profileEmail}>Loading...</p>
          </div>
        ) : (
          <div className={styles.profile}>
            <div className={styles.avatar}>
              {driverData?.name?.charAt(0).toUpperCase() || "D"}
            </div>
            <h3 className={styles.profileName}>
              {driverData?.name || "Driver"}
            </h3>
            <p className={styles.profileEmail}>
              {driverData?.email || "driver@example.com"}
            </p>
            <div className={styles.onlineStatus}>
              <label>{isOnline ? "Online" : "Offline"}</label>
              <div className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={isOnline}
                  onChange={handleOnlineToggle}
                />
                <span className={styles.slider}></span>
              </div>
            </div>
          </div>
        )}

        <nav className={styles.nav}>
          <a href="#" className={`${styles.navItem} ${styles.navItemActive}`}>
            <Home size={20} className={styles.navIcon} />
            <span>Dashboard</span>
          </a>
          <a href="#" className={styles.navItem}>
            <Car size={20} className={styles.navIcon} />
            <span>Ride</span>
          </a>
          <a href="#" className={styles.navItem}>
            <DollarSign size={20} className={styles.navIcon} />
            <span>Earning</span>
          </a>
          <a href="#" className={styles.navItem}>
            <Navigation size={20} className={styles.navIcon} />
            <span>Ongoing Trip</span>
          </a>
          <a href="#" className={styles.navItem}>
            <Star size={20} className={styles.navIcon} />
            <span>Rating</span>
          </a>
          <a href="#" className={styles.navItem}>
            <User size={20} className={styles.navIcon} />
            <span>Profile</span>
          </a>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
