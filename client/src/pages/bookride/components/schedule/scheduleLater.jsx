import React, { useState } from "react";
import Modal from "../../../../components/local/modal/modal";
import styles from "./schedule.module.css";

function ScheduleLater({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    date: "01/01/2025",
    time: "12:50",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSchedule = () => {
    console.log("Ride scheduled for:", formData);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Ride scheduled for Later</h2>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Date</label>
            <div className={styles.inputWrapper}>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Time</label>
            <div className={styles.inputWrapper}>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.cancelBtn} onClick={handleCancel}>
              Cancel
            </button>
            <button className={styles.scheduleBtn} onClick={handleSchedule}>
              Schedule
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ScheduleLater;
