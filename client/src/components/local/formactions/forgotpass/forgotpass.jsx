import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./forget.module.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //dekhte baad mai
    navigate("/resetpassword")
    console.log("Password reset requested");
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}></div>

      <div className={styles.right}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Forgot Password</h2>
          <p className={styles.subTitle}>
            No Worries, we'll send you reset instruction
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your Email"
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Reset Password
          </button>

          <div className={styles.footer}>
            <p className={styles.link}>
              <span> &larr;</span> Back to
              <span onClick={handleBackToLogin}>Login</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
