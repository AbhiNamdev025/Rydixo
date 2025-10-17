// import React, { useState } from "react";
// import Modal from "../../../../components/local/modal/modal";
// import styles from "./schedule.module.css";

// function ScheduleLater({ isOpen, onClose }) {
//   const [formData, setFormData] = useState({
//     date: "01/01/2025",
//     time: "12:50",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSchedule = () => {
//     console.log("Ride scheduled for:", formData);
//     onClose();
//   };

//   const handleCancel = () => {
//     onClose();
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <div className={styles.container}>
//         <h2 className={styles.title}>Ride scheduled for Later</h2>

//         <div className={styles.form}>
//           <div className={styles.formGroup}>
//             <label className={styles.label}>Date</label>
//             <div className={styles.inputWrapper}>
//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleChange}
//                 className={styles.input}
//               />
//             </div>
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.label}>Time</label>
//             <div className={styles.inputWrapper}>
//               <input
//                 type="time"
//                 name="time"
//                 value={formData.time}
//                 onChange={handleChange}
//                 className={styles.input}
//               />
//             </div>
//           </div>

//           <div className={styles.buttonGroup}>
//             <button className={styles.cancelBtn} onClick={handleCancel}>
//               Cancel
//             </button>
//             <button className={styles.scheduleBtn} onClick={handleSchedule}>
//               Schedule
//             </button>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// export default ScheduleLater;

import React, { useState } from "react";
import Modal from "../../../../components/local/modal/modal";
import styles from "./schedule.module.css";

function ScheduleLater({ isOpen, onClose, onSchedule }) {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSchedule = async () => {
    if (!formData.date || !formData.time) {
      alert("Please select both date and time");
      return;
    }

    setLoading(true);
    try {
      console.log("Ride scheduled for:", formData);

      if (onSchedule) {
        onSchedule(formData);
      }

      onClose();
    } catch (error) {
      console.error("Error scheduling ride:", error);
      alert("Failed to schedule ride. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  // Set minimum date to today
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Schedule Ride for Later</h2>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Date *</label>
            <div className={styles.inputWrapper}>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={styles.input}
                min={getMinDate()}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Time *</label>
            <div className={styles.inputWrapper}>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.note}>
            <p>Your ride will be scheduled for the selected date and time.</p>
            <p>You can cancel or modify up to 30 minutes before pickup.</p>
          </div>

          <div className={styles.buttonGroup}>
            <button
              className={styles.cancelBtn}
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className={styles.scheduleBtn}
              onClick={handleSchedule}
              disabled={loading}
            >
              {loading ? "Scheduling..." : "Schedule Ride"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ScheduleLater;
