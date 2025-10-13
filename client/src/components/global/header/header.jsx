import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import logo from "../../../../public/assets/svgs/mainlogo.svg";
import NavActions from "../../local/navactions/navActions";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLinkClick = () => setIsMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
    setIsDropdownOpen(false);
  };

  const userName = localStorage.getItem("userName");

  return (
    <>
      <div className={styles.header}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <div className={styles.logoImageContainer}>
            <img src={logo} alt="logo" className={styles.logo} />
          </div>
          <div className={styles.logoName}>Rydixo</div>
        </div>
        {/* Desktop Navlinks */}
        <div className={styles.navlinks}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.navlink} ${isActive ? styles.active : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/book-ride"
            className={({ isActive }) =>
              `${styles.navlink} ${isActive ? styles.active : ""}`
            }
          >
            Book A Ride
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${styles.navlink} ${isActive ? styles.active : ""}`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${styles.navlink} ${isActive ? styles.active : ""}`
            }
          >
            Contact Us
          </NavLink>
        </div>
        {/* NavActions */}
        {/* <div className={styles.navActions}>
          {userName ? (
            <div className={styles.userDropdown}>
              <div onClick={toggleDropdown} className={styles.userButton}>
                {userName} ▼
              </div>
              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <button onClick={handleLogout} className={styles.dropdownItem}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/signup" className={({ isActive }) => `${styles.navlink} ${isActive ? styles.active : ""}`}>Sign Up</NavLink>
              <NavLink to="/login" className={({ isActive }) => `${styles.navlink} ${isActive ? styles.active : ""}`}>Sign In</NavLink>
            </>
          )}
        </div> */}

        <NavActions
          userName={userName}
          onLogout={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userName");
            navigate("/login");
          }}
        />
        {/* Hamburger */}
        <div className={styles.hamburger} onClick={toggleMenu}>
          <div className={styles.hamburgerLine}></div>
          <div className={styles.hamburgerLine}></div>
          <div className={styles.hamburgerLine}></div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <div className={styles.mobileNavlinks}>
          <NavLink
            to="/"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `${styles.mobileNavlink} ${isActive ? styles.active : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/book-ride"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `${styles.mobileNavlink} ${isActive ? styles.active : ""}`
            }
          >
            Book A Ride
          </NavLink>
          <NavLink
            to="/about"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `${styles.mobileNavlink} ${isActive ? styles.active : ""}`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `${styles.mobileNavlink} ${isActive ? styles.active : ""}`
            }
          >
            Contact Us
          </NavLink>
        </div>

        <div className={styles.mobileNavActions}>
          {userName ? (
            <>
              <div className={styles.mobileUserButton} onClick={toggleDropdown}>
                {userName} ▼
              </div>
              {isDropdownOpen && (
                <button
                  onClick={handleLogout}
                  className={styles.mobileDropdownItem}
                >
                  Logout
                </button>
              )}
            </>
          ) : (
            <>
              <NavLink
                to="/signup"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `${styles.mobileNavlink} ${isActive ? styles.active : ""}`
                }
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/login"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `${styles.mobileNavlink} ${isActive ? styles.active : ""}`
                }
              >
                Sign In
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
