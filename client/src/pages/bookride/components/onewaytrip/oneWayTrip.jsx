import React, { useState } from "react";
import Modal from "../../../../components/local/modal/modal";
import styles from "./oneWayTrip.module.css";

function OneWayTrip({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    pickup: "",
    dropoff: "",
    vehicleType: "Sedan",
    passengers: "1",
    date: "01/01/2025",
    time: "12:50",
  });

  const vehicles = [
    {
      id: 1,
      name: "SUV",
      details: "Arriving in 6 min",
      description: "Affordable AC Cabs with free Wi-Fi",
      price: "₹ 1049",
    },
    {
      id: 2,
      name: "MINI",
      details: "Indica Micro itz",
      description: "Affordable AC Cabs with free Wi-Fi",
      price: "₹ 1049",
    },
    {
      id: 3,
      name: "Sedan",
      details: "Desire,Etios,Sunny",
      description: "Affordable AC Cabs with free Wi-Fi",
      price: "₹ 1231",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("One Way Trip Data:", formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>One Way Trip</h2>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Pickup Location</label>
            <input
              type="text"
              name="pickup"
              placeholder="Enter pickup the Location"
              value={formData.pickup}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Drop-Off Location</label>
            <input
              type="text"
              name="dropoff"
              placeholder="Enter Drop off the Location"
              value={formData.dropoff}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.rowGroup}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Vehicle Type</label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className={styles.input}
              >
                <option>Sedan</option>
                <option>Mini</option>
                <option>SUV</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Passenger count</label>
              <input
                type="number"
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                className={styles.input}
                min="1"
              />
            </div>
          </div>

          <div className={styles.rowGroup}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.vehicleList}>
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className={styles.vehicleCard}>
                <div className={styles.vehicleIcon}>🚗</div>
                <div className={styles.vehicleInfo}>
                  <h4 className={styles.vehicleName}>{vehicle.name}</h4>
                  <p className={styles.vehicleDetails}>{vehicle.details}</p>
                  <p className={styles.vehicleDesc}>
                    {vehicle.description}
                  </p>
                </div>
                <div className={styles.vehiclePrice}>{vehicle.price}</div>
              </div>
            ))}
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.continueBtn} onClick={handleSubmit}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default OneWayTrip;