import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./loginform.module.css";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { useState } from "react";
import { toast } from "react-toastify";

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:2525/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const userData = await response.json();

      if (response.status === 200) {
        const token = userData.token;
        localStorage.setItem("token", token);
        const userName = userData.user.name;
        localStorage.setItem("userName", userName);

        toast.success("Login successful");
        console.log("Login successful:", userData);

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error("Wrong Details");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Wrong Details");
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:2525/auth/google";
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
              value={formData.email}
              onChange={changeHandler}
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
              value={formData.password}
              onChange={changeHandler}
              required
            />
          </div>

          <div className={styles.actions}>
            <label htmlFor="remember" className={styles.action}>
              <input type="checkbox" name="remember" id="remember" />
              Remember me
            </label>
            <a href="/forgotpassword" className={styles.action}>
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
                <FaGoogle
                  className={styles.socialIcon}
                  onClick={handleGoogleLogin}
                />
              </button>
            </div>
          </div>

          <div className={styles.footer}>
            <p>
              Don't have any account?{" "}
              <span className={styles.link} onClick={handleSignUpClick}>
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
