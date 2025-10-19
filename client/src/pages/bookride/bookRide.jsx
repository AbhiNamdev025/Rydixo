import React, { useState } from "react";
import styles from "./bookride.module.css";
import Image from "../../../public/assets/images/bookARide/image.png";
import Footer from "../../components/global/footer/footer";
import Header from "../../components/global/header/header";
import OneWayTrip from "./components/onewaytrip/oneWayTrip";
import RoundTrip from "./components/twowaytrip/roundTrip";
import ChooseRider from "./components/chooserider/chooseRider";
import NewRider from "./components/newrider/newRider";
import ScheduleLater from "./components/schedule/scheduleLater";
import Apple from "../../../public/assets/images/bookARide/apple.svg";
import Play from "../../../public/assets/images/bookARide/play.svg";
import { toast } from "react-toastify";
import { CheckCircle, Clock, Headphones, Car } from "lucide-react";

const BookRide = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [showOneWay, setShowOneWay] = useState(false);
  const [showRoundTrip, setShowRoundTrip] = useState(false);
  const [showChooseRider, setShowChooseRider] = useState(false);
  const [showNewRider, setShowNewRider] = useState(false);
  const [showScheduleLater, setShowScheduleLater] = useState(false);
  const [whenValue, setWhenValue] = useState("Pick Now");
  const [formData, setFormData] = useState({
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
  });
  const [selectedRider, setSelectedRider] = useState(null);
  const [tripType, setTripType] = useState("");

  const getCurrentUser = () => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error getting user data:", error);
      return null;
    }
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!isAuthenticated()) {
      toast.warn("Please log in to book a ride");
      return;
    }

    if (!formData.pickup || !formData.dropoff) {
      toast.warn("Please enter pickup and dropoff locations");
      return;
    }

    if (activeTab === "outstation" && !tripType) {
      toast.warn("Please select One Way or Round Trip");
      return;
    }

    setShowChooseRider(true);
  };

  const handleWhenChange = (e) => {
    const value = e.target.value;
    setWhenValue(value);
    if (value === "Schedule for later") {
      setShowScheduleLater(true);
    }
  };

  const handleForMeChange = (e) => {
    const value = e.target.value;
    if (value === "For Someone Else") {
      setShowNewRider(true);
    } else {
      setShowChooseRider(true);
    }
  };

  const handleRiderSelected = (riderData) => {
    console.log("Rider selected:", riderData);
    setSelectedRider(riderData);

    if (activeTab === "outstation") {
      if (tripType === "oneWay") {
        setShowOneWay(true);
      } else if (tripType === "roundTrip") {
        setShowRoundTrip(true);
      }
    } else {
      setShowOneWay(true);
    }
  };

  const handleNewRiderAdded = (riderData) => {
    console.log("New rider added:", riderData);
    setSelectedRider(riderData);
    setShowChooseRider(false);

    if (activeTab === "outstation") {
      if (tripType === "oneWay") {
        setShowOneWay(true);
      } else if (tripType === "roundTrip") {
        setShowRoundTrip(true);
      }
    } else {
      setShowOneWay(true);
    }
  };

  const handleSchedule = (scheduleData) => {
    setFormData((prev) => ({
      ...prev,
      date: scheduleData.date,
      time: scheduleData.time,
    }));
    setWhenValue(`Scheduled for ${scheduleData.date} at ${scheduleData.time}`);
  };

  const handleBookingSuccess = (bookingData) => {
    console.log("Booking successful:", bookingData);

    // Reset form
    setFormData({
      pickup: "",
      dropoff: "",
      date: "",
      time: "",
    });
    setSelectedRider(null);
    setWhenValue("Pick Now");
    setTripType("");

    // Show success message
    toast.success("Booking confirmed successfully!");
  };

  //  outstation
  const handleOneWayClick = () => {
    if (!isAuthenticated()) {
      toast.error("Please log in to book a ride");
      return;
    }
    setTripType("oneWay");
    setShowChooseRider(true);
  };

  const handleRoundTripClick = () => {
    if (!isAuthenticated()) {
      toast.error("Please log in to book a ride");
      return;
    }
    setTripType("roundTrip");
    setShowChooseRider(true);
  };

  const getCurrentDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  return (
    <>
      <Header />

      <div className={styles.container}>
        <div className={styles.mainWrapper}>
          <div className={styles.bookingSection}>
            <div className={styles.bookingHeading}>
              <h2>Book Your Ride with Rydixo</h2>
              <p>Reliable and convenient rides at your fingertips</p>
            </div>

            <div className={styles.tabs}>
              {["daily", "rental", "outstation"].map((tab) => (
                <button
                  key={tab}
                  className={`${styles.tab} ${
                    activeTab === tab ? styles.active : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "daily"
                    ? "Daily Ride"
                    : tab === "rental"
                    ? "Rental"
                    : "Outstation"}
                </button>
              ))}
            </div>

            <form className={styles.form} onSubmit={handleSearch}>
              <div className={styles.inputGroup}>
                <div className={styles.inputWrapper}>
                  <label>From *</label>
                  <input
                    type="text"
                    name="pickup"
                    placeholder="Enter the Location, City or Address"
                    value={formData.pickup}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <label>To *</label>
                  <input
                    type="text"
                    name="dropoff"
                    placeholder="Enter the Location, City or Address"
                    value={formData.dropoff}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {activeTab === "outstation" && (
                <>
                  <div className={styles.schedule}>
                    <label>When</label>
                    <select value={whenValue} onChange={handleWhenChange}>
                      <option>Pick Now</option>
                      <option>Schedule for later</option>
                    </select>
                  </div>

                  {whenValue === "Schedule for later" && (
                    <div className={styles.dateTime}>
                      <div className={styles.dateWrapper}>
                        <label>Date *</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          min={getCurrentDate()}
                          required
                        />
                      </div>
                      <div className={styles.timeWrapper}>
                        <label>Time *</label>
                        <input
                          type="time"
                          name="time"
                          placeholder="Select Time"
                          value={formData.time}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className={styles.tripType}>
                    <button
                      type="button"
                      className={`${styles.oneWay} ${
                        tripType === "oneWay" ? styles.active : ""
                      }`}
                      onClick={handleOneWayClick}
                    >
                      ● One Way Trip
                    </button>
                    <button
                      type="button"
                      className={`${styles.roundTrip} ${
                        tripType === "roundTrip" ? styles.active : ""
                      }`}
                      onClick={handleRoundTripClick}
                    >
                      ● Round Trip
                    </button>
                  </div>

                  <div className={styles.schedule}>
                    <label>Rider</label>
                    <select onChange={handleForMeChange} defaultValue="">
                      <option value="">For Me</option>
                      <option value="For Someone Else">For Someone Else</option>
                    </select>
                  </div>
                </>
              )}

              {activeTab !== "outstation" && (
                <div className={styles.schedule}>
                  <label>When</label>
                  <select value={whenValue} onChange={handleWhenChange}>
                    <option>Pick Now</option>
                    <option>Schedule for later</option>
                  </select>
                </div>
              )}

              {activeTab !== "outstation" &&
                whenValue === "Schedule for later" && (
                  <div className={styles.dateTime}>
                    <div className={styles.dateWrapper}>
                      <label>Date *</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        min={getCurrentDate()}
                        required
                      />
                    </div>
                    <div className={styles.timeWrapper}>
                      <label>Time *</label>
                      <input
                        type="time"
                        name="time"
                        placeholder="Select Time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                )}

              {activeTab !== "outstation" && (
                <div className={styles.schedule}>
                  <label>Rider</label>
                  <select onChange={handleForMeChange} defaultValue="">
                    <option value="">For Me</option>
                    <option value="For Someone Else">For Someone Else</option>
                  </select>
                </div>
              )}

              <button type="submit" className={styles.searchBtn}>
                Search Rides
              </button>
            </form>
          </div>

          {/* Info Section */}
          <div className={styles.infoSection}>
            <img src={Image} alt="Rydixo Ride" className={styles.image} />
            <h3>Why Choose Rydixo?</h3>

            <div className={styles.featureGrid}>
              <div className={styles.featureItem}>
                <CheckCircle size={22} />
                <p>Verified Driver</p>
              </div>
              <div className={styles.featureItem}>
                <Clock size={22} />
                <p>On Time Pickup</p>
              </div>
              <div className={styles.featureItem}>
                <Headphones size={22} />
                <p>Clean & Comfortable Cars</p>
              </div>
              <div className={styles.featureItem}>
                <Car size={22} />
                <p>24/7 Support</p>
              </div>
            </div>

            <h4>Download the Rydixo App</h4>
            <p>Get the best ride experience on your smartphone</p>

            <div className={styles.appButtons}>
              <button>
                <img src={Apple} alt="appleIcon" />
                App Store
              </button>
              <button>
                <img src={Play} alt="playStoreIcon" />
                Google Play
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={styles.faqSection}>
          <h3>Frequently Asked Questions</h3>
          <details>
            <summary>How can I cancel a booking?</summary>
            <p>
              You can cancel your booking from the app under "My Rides".
              Cancellation charges may apply based on policy.
            </p>
          </details>
          <details>
            <summary>What payment options are available?</summary>
            <p>
              We accept UPI, credit/debit cards, wallets, and cash depending on
              location.
            </p>
          </details>
          <details>
            <summary>Is it possible to book a ride in advance?</summary>
            <p>
              Yes, you can schedule your ride in advance by selecting the date
              and time before confirming your booking.
            </p>
          </details>
          <details>
            <summary>How do I change my pickup location?</summary>
            <p>
              You can change your pickup location before the driver is assigned.
              After assignment, please contact the driver directly.
            </p>
          </details>
        </div>
      </div>

      {/* Trip Type Modals */}
      <OneWayTrip
        isOpen={showOneWay}
        onClose={() => {
          setShowOneWay(false);
          setSelectedRider(null);
        }}
        initialData={formData}
        selectedRider={selectedRider}
        onBookingSuccess={handleBookingSuccess}
      />

      <RoundTrip
        isOpen={showRoundTrip}
        onClose={() => {
          setShowRoundTrip(false);
          setSelectedRider(null);
        }}
        initialData={formData}
        selectedRider={selectedRider}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Other Modals */}
      <ChooseRider
        isOpen={showChooseRider}
        onClose={() => setShowChooseRider(false)}
        onRiderSelected={handleRiderSelected}
      />

      <NewRider
        isOpen={showNewRider}
        onClose={() => setShowNewRider(false)}
        onRiderAdded={handleNewRiderAdded}
      />

      <ScheduleLater
        isOpen={showScheduleLater}
        onClose={() => setShowScheduleLater(false)}
        onSchedule={handleSchedule}
      />

      <Footer />
    </>
  );
};

export default BookRide;
