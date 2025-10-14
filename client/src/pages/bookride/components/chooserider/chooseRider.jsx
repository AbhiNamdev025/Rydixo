import React, { useState } from "react";
import Modal from "../../../../components/local/modal/modal";
import styles from "./chooseRider.module.css";

function ChooseRider({ isOpen, onClose }) {
  const [selectedRider, setSelectedRider] = useState("me");
  const [riders, setRiders] = useState([
    { id: "Gurpreet", name: "Gurpreet", icon: "👤" },
    { id: "bittu", name: "Bittu", icon: "👤" },
  ]);

  const handleRemoveRider = (id) => {
    if (id !== "me") {
      setRiders(riders.filter((rider) => rider.id !== id));
    }
  };

  const handleDone = () => {
    console.log("Selected rider:", selectedRider);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Choose a rider</h2>

        <div className={styles.ridersList}>
          {riders.map((rider) => (
            <div
              key={rider.id}
              className={`${styles.riderItem} ${
                selectedRider === rider.id ? styles.selected : ""
              }`}
              onClick={() => setSelectedRider(rider.id)}
            >
              <div className={styles.riderInfo}>
                <span className={styles.icon}>{rider.icon}</span>
                <span className={styles.name}>{rider.name}</span>
              </div>
              {rider.id !== "me" && (
                <button
                  className={styles.removeBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveRider(rider.id);
                  }}
                >
                  ✕
                </button>
              )}
              {rider.id === "me" && selectedRider === "me" && (
                <span className={styles.checkmark}>●</span>
              )}
              {rider.id !== "me" && selectedRider === rider.id && (
                <span className={styles.checkmark}>●</span>
              )}
            </div>
          ))}

          <div className={styles.orderOption}>
            <span className={styles.orderIcon}>👥</span>
            <span>order a trip for someone else</span>
          </div>
        </div>

        <button className={styles.doneBtn} onClick={handleDone}>
          Done
        </button>
      </div>
    </Modal>
  );
}

export default ChooseRider;
