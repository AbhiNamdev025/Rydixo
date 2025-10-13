import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./loginpopup.module.css";

const LoginPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    onClose();
    setTimeout(() => {
      window.location.href = "/login";
    }, 100);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.content}>
          <div className={styles.icon}>🚗</div>
          <h2 className={styles.title}>Login Required</h2>
          <p className={styles.message}>
            To book a ride, please login to your account
          </p>

          <div className={styles.buttonGroup}>
            <button className={styles.loginButton} onClick={handleLogin}>
              Login
            </button>

            <button className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
