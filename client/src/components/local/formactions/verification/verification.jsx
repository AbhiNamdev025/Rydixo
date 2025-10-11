import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./verification.module.css";

function VerificationCode() {
  const navigate = useNavigate();
  const email = "abhi@gmail.com";

  const handleSubmit = (e) => {
    e.preventDefault();
    // add here
    navigate("/resetpassword");
  };

  const handleResend = () => {
    // Add resend logic here
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}></div>

      <div className={styles.right}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Enter Verification Code</h2>
          <p className={styles.subTitle}>
            Verification code sent to your Email.
          </p>
          <p className={styles.emailText}>
            Code Send to <span className={styles.email}>({email})</span>
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.codeInputs}>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="1"
              className={styles.codeInput}
              required
            />
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="1"
              className={styles.codeInput}
              required
            />
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="1"
              className={styles.codeInput}
              required
            />
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="1"
              className={styles.codeInput}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </form>

        <div className={styles.resendContainer}>
          <p className={styles.resendText}>
            If you don't receive the code,{" "}
            <button
              type="button"
              className={styles.resendBtn}
              onClick={handleResend}
            >
              resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerificationCode;
