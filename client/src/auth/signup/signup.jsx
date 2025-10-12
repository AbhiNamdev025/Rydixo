import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./signup.module.css";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Combine first name and last name
    const userData = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    try {
      const response = await fetch("http://localhost:2525/user/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Account created successfully");

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });

        console.log("Signup successful:", data);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        response.json(err)(err, "Failed to create account");
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(" Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:2525/auth/google";
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}></div>

      <div className={styles.right}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Sign Up</h2>
          <p className={styles.subTitle}>
            Let's get you all set up so you can access your personal account
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.nameRow}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                className={styles.input}
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                className={styles.input}
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.contactRow}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className={styles.input}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                className={styles.input}
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className={styles.input}
              value={formData.password}
              onChange={handleChange}
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
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.terms}>
            <label htmlFor="terms" className={styles.termsLabel}>
              <input type="checkbox" name="terms" id="terms" required />I agree
              with the Term And Conditions.
            </label>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Create Account
          </button>

          <div className={styles.others}>
            <div className={styles.divider}>
              <span>Or Sign Up With</span>
            </div>
          </div>
        </form>
        <div className={styles.socialButtons}>
          <button type="button" className={styles.socialBtn}>
            <FaFacebook className={styles.socialIcon} />
          </button>
          <button type="button" className={styles.socialBtn}>
            <FaGoogle
              className={styles.socialIcon}
              onClick={handleGoogleSignup}
            />
          </button>
        </div>
        <div className={styles.footer}>
          <p>
            Already a member?{" "}
            <span className={styles.link} onClick={handleLoginClick}>
              Login
            </span>
          </p>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
}

export default SignUpForm;
