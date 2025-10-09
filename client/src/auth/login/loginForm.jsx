import React from "react";
import styles from "./loginform.module.css";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FaApple } from "react-icons/fa6";

function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // baad m likhuga
    console.log("Form submitted");
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}></div>

      <div className={styles.right}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Welcome Back</h2>
          <p className={styles.subTitle}>
            Enter your email and password to access your account
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

          <div className={styles.inputGroup}>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your Password"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.actions}>
            <label htmlFor="remember" className={styles.action}>
              <input type="checkbox" name="remember" id="remember" />
              Remember me
            </label>
            <a href="#" className={styles.action}>
              Forgot Password
            </a>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Sign In
          </button>

          <div className={styles.others}>
            <div className={styles.divider}>
              <span>Or Login With</span>
            </div>
            <div className={styles.socialButtons}>
              <button className={styles.socialBtn}>
                <FaFacebook className={styles.socialIcon} />
              </button>
              <button className={styles.socialBtn}>
                <FaTwitter className={styles.socialIcon} />
              </button>
              <button className={styles.socialBtn}>
                <FaApple className={styles.socialIcon} />
              </button>
            </div>
          </div>

          <div className={styles.footer}>
            <p>
              Don't have any account?{" "}
              <span className={styles.link}>Sign Up</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
