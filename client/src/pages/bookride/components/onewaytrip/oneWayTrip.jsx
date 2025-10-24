import React, { useState } from "react";
import Modal from "../../../../components/local/modal/modal";
import styles from "./oneWayTrip.module.css";
import { bookingService } from "../../services/bookingServices";
import { toast } from "react-toastify";

function OneWayTrip({
  isOpen,
  onClose,
  initialData,
  onBookingSuccess,
  calculatedFare,
}) {
  const getCurrentUser = () => {
    try {
      const userData =
        localStorage.getItem("user") || sessionStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  };

  const getUserName = () => {
    return (
      localStorage.getItem("userName") || sessionStorage.getItem("userName")
    );
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("token") || sessionStorage.getItem("token");
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
      basePrice: 1049,
    },
    {
      id: 2,
      name: "MINI",
      details: "Indica Micro itz",
      description: "Affordable AC Cabs with free Wi-Fi",
      basePrice: 849,
    },
    {
      id: 3,
      name: "Sedan",
      details: "Desire,Etios,Sunny",
      description: "Affordable AC Cabs with free Wi-Fi",
      basePrice: 949,
    },
  ];

  const getFinalFare = () => {
    if (!calculatedFare) return 0;

    const selectedVehicle = vehicles.find(
      (v) => v.name === formData.vehicleType
    );
    if (!selectedVehicle) return calculatedFare.total;

    //  vehicle type price
    const vehicleMultiplier = selectedVehicle.basePrice / 1000;
    return Math.round(calculatedFare.total * vehicleMultiplier);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "passengers" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async () => {
    if (!isAuthenticated() || !user) {
      toast.warn("Please log in to book a ride");
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
      toast.warn("Please fill all required fields");
      return;
    }

    if (!calculatedFare) {
      toast.warn("Please wait while we calculate your fare");
      return;
    }

    setLoading(true);
    try {
      const finalFare = getFinalFare();

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
        fare: finalFare,
        distance: calculatedFare.distanceKm,
      };

      const result = await bookingService.createBooking(bookingData);
      console.log("Booking created:", result);

      onClose();

      setTimeout(() => {
        if (result.booking && result.booking._id) {
          console.log("Redirecting to booking status...");
          window.location.href = `/booking-status/${result.booking._id}`;
        } else {
          toast.success("Booking created! Check your bookings.");
        }
      }, 100);
    } catch (error) {
      toast.warn("Failed to create booking. Please try again.");
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

  const finalFare = getFinalFare();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>One Way Trip</h2>

        {/* Fare Summary Section */}
        {calculatedFare && (
          <div className={styles.fareSummary}>
            <h3>Fare Summary</h3>
            <div className={styles.fareBreakdown}>
              <div className={styles.fareRow}>
                <span>Base Fare:</span>
                <span>₹{calculatedFare.base}</span>
              </div>
              <div className={styles.fareRow}>
                <span>Distance Fare ({calculatedFare.distanceKm} km):</span>
                <span>₹{calculatedFare.distance}</span>
              </div>
              <div className={styles.fareRow}>
                <span>Tax (18%):</span>
                <span>₹{calculatedFare.tax}</span>
              </div>
              <div className={styles.fareRow}>
                <span>Vehicle Type ({formData.vehicleType}):</span>
                <span>+ ₹{finalFare - calculatedFare.total}</span>
              </div>
              <div className={styles.fareTotal}>
                <span>Total Fare:</span>
                <span>₹{finalFare}</span>
              </div>
            </div>
          </div>
        )}

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
                <option value="MINI">MINI</option>
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
            {vehicles.map((vehicle) => {
              const vehicleFare = calculatedFare
                ? Math.round(calculatedFare.total * (vehicle.basePrice / 1000))
                : vehicle.basePrice;

              return (
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
                  <div className={styles.vehiclePrice}>₹ {vehicleFare}</div>
                </div>
              );
            })}
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
              disabled={loading || !calculatedFare}
              type="button"
            >
              {loading ? "Booking..." : `Confirm Booking - ₹${finalFare}`}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default OneWayTrip;
