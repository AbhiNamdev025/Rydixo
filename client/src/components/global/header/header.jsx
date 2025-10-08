import React, { useState } from "react";
import styles from "./header.module.css";
import logo from "../../../assets/svgs/mainlogo.svg";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <div className={styles.logoImageContainer}>
            <img src={logo} alt="logo" className={styles.logo} />
          </div>
          <div className={styles.logoName}>
            <span>Rydixo</span>
          </div>
        </div>

        <div className={styles.navlinks}>
          <div className={`${styles.navlink} ${styles.active}`}>Home</div>
          <div className={styles.navlink}>Book A Ride</div>
          <div className={styles.navlink}>About Us</div>
          <div className={styles.navlink}>Contact Us</div>
        </div>

        <div className={styles.navActions}>
          <div className={`${styles.navlink} ${styles.active}`}>Sign Up</div>
          <div className={styles.navlink}>Sign In</div>
        </div>

        {/* Ham Menu */}
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
          <div className={`${styles.mobileNavlink} ${styles.active}`}>Home</div>
          <div className={styles.mobileNavlink}>Book A Ride</div>
          <div className={styles.mobileNavlink}>About Us</div>
          <div className={styles.mobileNavlink}>Contact Us</div>
        </div>

        <div className={styles.mobileNavActions}>
          <div className={styles.mobileNavlink}>Sign Up</div>
          <div className={styles.mobileNavlink}>Sign In</div>
        </div>
      </div>
    </>
  );
}

export default Header;
