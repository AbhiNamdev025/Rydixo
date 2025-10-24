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
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  const [driverData, setDriverData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

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

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {isMobile && (
        <button className={styles.menuButton} onClick={toggleSidebar}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      )}

      {isMobile && isOpen && (
        <div className={styles.overlay} onClick={toggleSidebar}></div>
      )}

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
          <button
            onClick={() => handleNavigation("/dashboard")}
            className={`${styles.navItem} ${
              isActive("/dashboard") ? styles.navItemActive : ""
            }`}
          >
            <Home size={20} className={styles.navIcon} />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => handleNavigation("/rides")}
            className={`${styles.navItem} ${
              isActive("/rides") ? styles.navItemActive : ""
            }`}
          >
            <Car size={20} className={styles.navIcon} />
            <span>Ride</span>
          </button>
          <button
            onClick={() => handleNavigation("/earning")}
            className={`${styles.navItem} ${
              isActive("/earning") ? styles.navItemActive : ""
            }`}
          >
            <DollarSign size={20} className={styles.navIcon} />
            <span>Earning</span>
          </button>
          <button
            onClick={() => handleNavigation("/ongoing")}
            className={`${styles.navItem} ${
              isActive("/ongoing") ? styles.navItemActive : ""
            }`}
          >
            <Navigation size={20} className={styles.navIcon} />
            <span>Ongoing Trip</span>
          </button>

          <button
            onClick={() => handleNavigation("/profile")}
            className={`${styles.navItem} ${
              isActive("/profile") ? styles.navItemActive : ""
            }`}
          >
            <User size={20} className={styles.navIcon} />
            <span>Profile</span>
          </button>
          <button onClick={handleLogout} className={styles.navItem}>
            <LogOut className={styles.navIcon} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
