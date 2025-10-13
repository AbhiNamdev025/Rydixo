import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./verification.module.css";
import { toast } from "react-toastify";

function VerificationCode() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  const [codeInput, setCodeInput] = useState(["", "", "", ""]);

  const handleChange = (e, idx) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
      const newCode = [...codeInput];
      newCode[idx] = val;
      setCodeInput(newCode);

      if (val && idx < 3) {
        const nextInput = document.getElementById(`code-${idx + 1}`);
        nextInput && nextInput.focus();
      }
      if (!val && idx > 0) {
        const prevInput = document.getElementById(`code-${idx - 1}`);
        prevInput && prevInput.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredCode = codeInput.join("");
    const storedCode = localStorage.getItem("verificationCode");

    if (enteredCode === storedCode) {
      navigate("/resetpassword");
    } else {
      toast.error("Invalid code");
    }
  };

  const handleResend = async () => {
    const response = await fetch(
      "http://localhost:2525/auth/password/send-code",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("verificationCode", data.code);
      toast.success("Code resent!");
      setCodeInput(["", "", "", ""]);
    } else {
      toast.error(data.message);
    }
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
            Code sent to <span className={styles.email}>({email})</span>
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.codeInputs}>
            {codeInput.map((val, idx) => (
              <input
                key={idx}
                id={`code-${idx}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={val}
                className={styles.codeInput}
                required
                onChange={(e) => handleChange(e, idx)}
              />
            ))}
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
