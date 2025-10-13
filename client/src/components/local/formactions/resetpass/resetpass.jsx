import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./resetpass.module.css";
import { toast } from "react-toastify";

function ResetPassword() {
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // see uh
  //   toast.success("Password changed successfully");
  //   navigate("/login");

  //   console.log("Password reset");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;
    const email = localStorage.getItem("userEmail");

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:2525/auth/password/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Password reset successfully");
        localStorage.removeItem("verificationCode");
        localStorage.removeItem("userEmail");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error resetting password");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}></div>

      <div className={styles.right}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Reset Password</h2>
          <p className={styles.subTitle}>Enter your new Password</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="New Password"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
