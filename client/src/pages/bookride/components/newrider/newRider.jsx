import React, { useState } from "react";
import Modal from "../../../../components/local/modal/modal";
import styles from "./newRider.module.css";

function NewRider({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPassenger = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.phoneNumber) {
      console.log("New rider added:", formData);
      setFormData({ firstName: "", lastName: "", phoneNumber: "" });
      onClose();
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>New Rider</h2>

        <div className={styles.description}>
          <p>Driver will see this name.</p>
        </div>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone No."
              value={formData.phoneNumber}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.disclaimer}>
            <p>Rydixo won't share this phone number with drivers.</p>
            <p>
              By tapping 'Add rider', you confirm that your friend agreed to
              share their contact information with rydixo and to receive SMS
              about this trip
            </p>
          </div>

          <button className={styles.addBtn} onClick={handleAddPassenger}>
            Add Passenger
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default NewRider;
