import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import logo from "../../../../public/assets/svgs/mainlogo.svg";
import NavActions from "../../local/navactions/navActions";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMyRidesOpen, setIsMyRidesOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMyRides = () => setIsMyRidesOpen(!isMyRidesOpen);

  const handleLinkClick = () => setIsMenuOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    setIsDropdownOpen(false);
  };

  const handleHelp = () => {
    navigate("/help");
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const handlePreviousRides = () => {
    navigate("/ride-history");
    setIsDropdownOpen(false);
    setIsMyRidesOpen(false);
    setIsMenuOpen(false);
  };

  const userName = localStorage.getItem("userName");

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logoContainer} onClick={() => navigate("/")}>
          <div className={styles.logoImageContainer}>
            <img src={logo} alt="logo" className={styles.logo} />
          </div>
          <div className={styles.logoName}>Rydixo</div>
        </div>

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

        <NavActions
          userName={userName}
          onLogout={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userName");
            navigate("/login");
          }}
        />

        <div className={styles.hamburger} onClick={toggleMenu}>
          <div className={styles.hamburgerLine}></div>
          <div className={styles.hamburgerLine}></div>
          <div className={styles.hamburgerLine}></div>
        </div>
      </div>

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
                <div className={styles.mobileDropdownMenu}>
                  <button
                    onClick={toggleMyRides}
                    className={styles.mobileDropdownItem}
                  >
                    My Rides
                  </button>
                  {isMyRidesOpen && (
                    <div className={styles.mobileNestedMenu}>
                      <button
                        onClick={handlePreviousRides}
                        className={styles.mobileNestedItem}
                      >
                        View My Previous Rides
                      </button>
                    </div>
                  )}
                  <button
                    onClick={handleHelp}
                    className={styles.mobileDropdownItem}
                  >
                    Help
                  </button>
                  <button
                    onClick={handleLogout}
                    className={styles.mobileDropdownItem}
                  >
                    Logout
                  </button>
                </div>
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
