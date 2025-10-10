import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./header.module.css";
import logo from "../../../assets/svgs/mainlogo.svg";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <>
      <div className={styles.header}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <div className={styles.logoImageContainer}>
            <img src={logo} alt="logo" className={styles.logo} />
          </div>
          <div className={styles.logoName}>
            <span>Rydixo</span>
          </div>
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

        {/* navActions */}
        
        <div className={styles.navActions}>
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
        </div>

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
        </div>
      </div>
    </>
  );
}

export default Header;
