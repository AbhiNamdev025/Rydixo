// import React, { useState } from "react";
// import Modal from "../../../../components/local/modal/modal";
// import styles from "./oneWayTrip.module.css";

// function OneWayTrip({ isOpen, onClose }) {
//   const [formData, setFormData] = useState({
//     pickup: "",
//     dropoff: "",
//     vehicleType: "Sedan",
//     passengers: "1",
//     date: "01/01/2025",
//     time: "12:50",
//   });

//   const vehicles = [
//     {
//       id: 1,
//       name: "SUV",
//       details: "Arriving in 6 min",
//       description: "Affordable AC Cabs with free Wi-Fi",
//       price: "₹ 1049",
//     },
//     {
//       id: 2,
//       name: "MINI",
//       details: "Indica Micro itz",
//       description: "Affordable AC Cabs with free Wi-Fi",
//       price: "₹ 1049",
//     },
//     {
//       id: 3,
//       name: "Sedan",
//       details: "Desire,Etios,Sunny",
//       description: "Affordable AC Cabs with free Wi-Fi",
//       price: "₹ 1231",
//     },
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     console.log("One Way Trip Data:", formData);
//     onClose();
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <div className={styles.container}>
//         <h2 className={styles.title}>One Way Trip</h2>

//         <div className={styles.form}>
//           <div className={styles.formGroup}>
//             <label className={styles.label}>Pickup Location</label>
//             <input
//               type="text"
//               name="pickup"
//               placeholder="Enter pickup the Location"
//               value={formData.pickup}
//               onChange={handleChange}
//               className={styles.input}
//               required
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label className={styles.label}>Drop-Off Location</label>
//             <input
//               type="text"
//               name="dropoff"
//               placeholder="Enter Drop off the Location"
//               value={formData.dropoff}
//               onChange={handleChange}
//               className={styles.input}
//               required
//             />
//           </div>

//           <div className={styles.rowGroup}>
//             <div className={styles.formGroup}>
//               <label className={styles.label}>Vehicle Type</label>
//               <select
//                 name="vehicleType"
//                 value={formData.vehicleType}
//                 onChange={handleChange}
//                 className={styles.input}
//               >
//                 <option>Sedan</option>
//                 <option>Mini</option>
//                 <option>SUV</option>
//               </select>
//             </div>
//             <div className={styles.formGroup}>
//               <label className={styles.label}>Passenger count</label>
//               <input
//                 type="number"
//                 name="passengers"
//                 value={formData.passengers}
//                 onChange={handleChange}
//                 className={styles.input}
//                 min="1"
//               />
//             </div>
//           </div>

//           <div className={styles.rowGroup}>
//             <div className={styles.formGroup}>
//               <label className={styles.label}>Date</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleChange}
//                 className={styles.input}
//               />
//             </div>
//             <div className={styles.formGroup}>
//               <label className={styles.label}>Time</label>
//               <input
//                 type="time"
//                 name="time"
//                 value={formData.time}
//                 onChange={handleChange}
//                 className={styles.input}
//               />
//             </div>
//           </div>

//           <div className={styles.vehicleList}>
//             {vehicles.map((vehicle) => (
//               <div key={vehicle.id} className={styles.vehicleCard}>
//                 <div className={styles.vehicleIcon}>🚗</div>
//                 <div className={styles.vehicleInfo}>
//                   <h4 className={styles.vehicleName}>{vehicle.name}</h4>
//                   <p className={styles.vehicleDetails}>{vehicle.details}</p>
//                   <p className={styles.vehicleDesc}>{vehicle.description}</p>
//                 </div>
//                 <div className={styles.vehiclePrice}>{vehicle.price}</div>
//               </div>
//             ))}
//           </div>

//           <div className={styles.buttonGroup}>
//             <button className={styles.cancelBtn} onClick={onClose}>
//               Cancel
//             </button>
//             <button className={styles.continueBtn} onClick={handleSubmit}>
//               Continue
//             </button>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// export default OneWayTrip;

import React, { useState } from "react";
import Modal from "../../../../components/local/modal/modal";
import styles from "./oneWayTrip.module.css";
import { bookingService } from "../../services/bookingServices";

function OneWayTrip({ isOpen, onClose, initialData, onBookingSuccess }) {
  const getCurrentUser = () => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  };

  const getUserName = () => {
    return localStorage.getItem("userName");
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  const user = getCurrentUser();

  const [formData, setFormData] = useState({
    pickup: initialData?.pickup || "",
    dropoff: initialData?.dropoff || "",
    vehicleType: "Sedan",
    passengers: 1,
    date: initialData?.date || "",
    time: initialData?.time || "",
    riderName: user?.name || getUserName() || "",
    riderPhone: user?.phone?.toString() || "",
    bookingType: "oneWay",
  });

  const [loading, setLoading] = useState(false);

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
    setFormData((prev) => ({
      ...prev,
      [name]: name === "passengers" ? parseInt(value) : value,
    }));
  };

 const handleSubmit = async () => {
  if (!isAuthenticated() || !user) {
    alert("Please log in to book a ride");
    return;
  }

  if (
    !formData.pickup ||
    !formData.dropoff ||
    !formData.date ||
    !formData.time ||
    !formData.riderName ||
    !formData.riderPhone
  ) {
    alert("Please fill all required fields");
    return;
  }

  setLoading(true);
  try {
    const bookingData = {
      userId: user._id,
      pickup: formData.pickup,
      dropoff: formData.dropoff,
      vehicleType: formData.vehicleType,
      passengers: formData.passengers,
      date: formData.date,
      time: formData.time,
      riderName: formData.riderName,
      riderPhone: formData.riderPhone,
      bookingType: "oneWay",
    };

    const result = await bookingService.createBooking(bookingData);
    console.log("Booking created:", result);
    
    // CLOSE MODAL FIRST
    onClose();
    
    // ADD TIMEOUT TO ENSURE MODAL IS CLOSED BEFORE REDIRECT
    setTimeout(() => {
      if (result.booking && result.booking._id) {
        console.log("Redirecting to booking status...");
        window.location.href = `/booking-status/${result.booking._id}`;
      } else {
        alert("Booking created! Check your bookings.");
      }
    }, 100);

  } catch (error) {
    alert("Failed to create booking. Please try again.");
  } finally {
    setLoading(false);
  }
};

  if (!isAuthenticated()) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className={styles.container}>
          <h2 className={styles.title}>Authentication Required</h2>
          <p>Please log in to book a ride.</p>
          <div className={styles.buttonGroup}>
            <button className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button
              className={styles.continueBtn}
              onClick={() => {
                onClose();
                window.location.href = "/login";
              }}
            >
              Go to Login
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>One Way Trip</h2>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Pickup Location *</label>
            <input
              type="text"
              name="pickup"
              placeholder="Enter pickup location"
              value={formData.pickup}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Drop-Off Location *</label>
            <input
              type="text"
              name="dropoff"
              placeholder="Enter drop off location"
              value={formData.dropoff}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.rowGroup}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Vehicle Type *</label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className={styles.input}
                required
              >
                <option value="Sedan">Sedan</option>
                <option value="Mini">Mini</option>
                <option value="SUV">SUV</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Passengers *</label>
              <input
                type="number"
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                className={styles.input}
                min="1"
                max="10"
                required
              />
            </div>
          </div>

          <div className={styles.rowGroup}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Time *</label>
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

          <div className={styles.riderInfo}>
            <h4>Rider Information</h4>
            <div className={styles.formGroup}>
              <label className={styles.label}>Rider Name *</label>
              <input
                type="text"
                name="riderName"
                placeholder="Rider name"
                value={formData.riderName}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Rider Phone *</label>
              <input
                type="tel"
                name="riderPhone"
                placeholder="Rider phone number"
                value={formData.riderPhone}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.vehicleList}>
            <h4>Select Vehicle Type</h4>
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className={`${styles.vehicleCard} ${
                  formData.vehicleType === vehicle.name ? styles.selected : ""
                }`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    vehicleType: vehicle.name,
                  }))
                }
              >
                <div className={styles.vehicleIcon}>🚗</div>
                <div className={styles.vehicleInfo}>
                  <h4 className={styles.vehicleName}>{vehicle.name}</h4>
                  <p className={styles.vehicleDetails}>{vehicle.details}</p>
                  <p className={styles.vehicleDesc}>{vehicle.description}</p>
                </div>
                <div className={styles.vehiclePrice}>{vehicle.price}</div>
              </div>
            ))}
          </div>

          <div className={styles.buttonGroup}>
            <button
              className={styles.cancelBtn}
              onClick={onClose}
              disabled={loading}
              type="button"
            >
              Cancel
            </button>
            <button
              className={styles.continueBtn}
              onClick={handleSubmit}
              disabled={loading}
              type="button"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default OneWayTrip;
