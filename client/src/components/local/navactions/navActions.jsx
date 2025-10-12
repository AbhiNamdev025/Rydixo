import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./navaction.module.css";
import bellIcon from "../../../assets/svgs/bell.svg";
import searchIcon from "../../../assets/svgs/search.svg";
import userAvatar from "../../../assets/images/header/userAvtar.png";
import menuIcon from "../../../assets/svgs/menu.svg";

function NavActions({ userName, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    if (onLogout) onLogout();
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.navActions}>
      <img
        src={bellIcon}
        alt="Notifications"
        className={styles.icon}
        title="Notifications"
      />

      <img
        src={searchIcon}
        alt="Search"
        className={styles.icon}
        title="Search"
      />

      {userName ? (
        <div className={styles.userDropdown}>
          <img
            src={userAvatar}
            alt={userName}
            className={styles.avatar}
            onClick={toggleDropdown}
            title={`Logged in as ${userName}`}
          />

          <img
            src={menuIcon}
            alt="menu"
            className={styles.menuIcon}
            title="menu"
          />

          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownHeader}>
                Signed in as <strong>{userName}</strong>
              </div>
              <button
                onClick={handleLogout}
                className={styles.dropdownItem}
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `${styles.navlink} ${isActive ? styles.active : ""}`
            }
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${styles.navlink} ${isActive ? styles.active : ""}`
            }
          >
            Sign In
          </NavLink>
        </>
      )}
    </div>
  );
}

export default NavActions;
