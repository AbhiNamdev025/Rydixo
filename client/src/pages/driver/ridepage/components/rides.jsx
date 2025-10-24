import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  MessageCircle,
  Car,
  IndianRupee,
  Clock,
  User,
  Navigation,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./rides.module.css";
import DriverRide from "./driverRide";
import SendOTPModal from "../../../../components/local/sendotp/sendOtpModal";
import OTPVerificationModal from "../../../../components/local/confirmotp/confirmOtp";
import { BASE_URL_RIDE } from "../../../../const/const";
import { toast } from "react-toastify";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Rides = () => {
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responding, setResponding] = useState(false);
  const [isRideModalOpen, setIsRideModalOpen] = useState(false);
  const [isSendOTPModalOpen, setIsSendOTPModalOpen] = useState(false);
  const [isConfirmOTPModalOpen, setIsConfirmOTPModalOpen] = useState(false);
  const [activeRide, setActiveRide] = useState(null);
  const [mapCenter, setMapCenter] = useState([30.3782, 76.7767]); // Default to Ambala

  useEffect(() => {
    fetchLatestRide();
  }, []);

  const fetchLatestRide = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const userData = JSON.parse(
        localStorage.getItem("user") || sessionStorage.getItem("user")
      );

      if (!token || !userData?._id) {
        setLoading(false);
        return;
      }

      const response = await fetch(`${BASE_URL_RIDE}/find`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch rides");

      const rides = await response.json();

      const latestRide = rides
        .filter((ride) => ride.status === "pending")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

      setRide(latestRide || null);

      if (latestRide?.pickup) {
        updateMapCenter(latestRide.pickup);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching rides:", err);
      setLoading(false);
    }
  };

  const updateMapCenter = (location) => {
    const locationCoordinates = {
      delhi: [28.6139, 77.209],
      mumbai: [19.076, 72.8777],
      ambala: [30.3782, 76.7767],
      chandigarh: [30.7333, 76.7794],
    };

    const lowerLocation = location.toLowerCase();
    for (const [city, coords] of Object.entries(locationCoordinates)) {
      if (lowerLocation.includes(city)) {
        setMapCenter(coords);
        return;
      }
    }
  };

  const openRideModal = () => {
    if (!ride) return;
    setIsRideModalOpen(true);
  };

  const closeRideModal = () => {
    setIsRideModalOpen(false);
  };

  const openSendOTPModal = () => {
    if (!ride) return;
    setActiveRide(ride);
    setIsSendOTPModalOpen(true);
  };

  const closeSendOTPModal = () => {
    setIsSendOTPModalOpen(false);
  };

  const openConfirmOTPModal = () => {
    setIsSendOTPModalOpen(false);
    setIsConfirmOTPModalOpen(true);
  };

  const closeConfirmOTPModal = () => {
    setIsConfirmOTPModalOpen(false);
  };

  const handleRideResponse = async (action) => {
    if (!ride || !ride._id || responding) return;

    setResponding(true);
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const userData = JSON.parse(
        localStorage.getItem("user") || sessionStorage.getItem("user")
      );

      const response = await fetch(`${BASE_URL_RIDE}/${ride._id}/respond`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action,
          driverId: userData._id,
          ...(action === "accepted" && {
            otp: Math.floor(1000 + Math.random() * 9000),
          }),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to respond to ride");
      }

      if (action === "accepted") {
        openSendOTPModal();
      } else {
        await fetchLatestRide();
      }
    } catch (err) {
      console.error("Ride response failed:", err);
      toast.warn(err.message || "Failed to process ride request");
    } finally {
      setResponding(false);
    }
  };

  const handleSendOTP = async () => {
    if (!activeRide || !activeRide._id) return;
    try {
      openConfirmOTPModal();
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.warn("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOTP = async (otp) => {
    if (!activeRide || !activeRide._id) return;
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await fetch(`${BASE_URL_RIDE}/${activeRide._id}/start`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to start ride");
      }

      closeConfirmOTPModal();
      toast.success("Ride Started Successfully!");
      await fetchLatestRide();
    } catch (error) {
      console.error("Error starting ride:", error);
      toast.warn(error.message || "Invalid OTP. Please try again.");
    }
  };

  const handleContact = () => {
    if (ride?.user?.phone) {
      window.open(`tel:${ride.user.phone}`, "_self");
    }
  };

  const handleMessage = () => {
    if (ride?.user?.phone) {
      window.open(`sms:${ride.user.phone}`, "_self");
    }
  };

  const handleNavigate = () => {
    if (ride?.pickup) {
      const encodedLocation = encodeURIComponent(ride.pickup);
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`,
        "_blank"
      );
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading rides...</div>
      </div>
    );
  }

  if (!ride) {
    return (
      <div className={styles.container}>
        <div className={styles.noRides}>
          <Car size={48} className={styles.noRidesIcon} />
          <h3>No Ride Requests</h3>
          <p>You don't have any pending ride requests at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.rideCard}>
        {/* Map Section */}
        <div className={styles.mapSection}>
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: "450px", width: "90%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={mapCenter}>
              <Popup>Pickup Location: {ride.pickup}</Popup>
            </Marker>
          </MapContainer>
        </div>
        <div>
          <button className={styles.navigateBtn} onClick={handleNavigate}>
            <Navigation size={20} />
            <span>Navigate to Pickup</span>
          </button>
          <div className={styles.userSection}>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                <User size={24} className={styles.avatarFallback} />
              </div>
              <div className={styles.userDetails}>
                <h2 className={styles.userName}>
                  {ride.user?.name || "Nitin"}
                </h2>
                <div className={styles.userActions}>
                  <button className={styles.contactBtn} onClick={handleContact}>
                    <Phone size={16} />
                    Contact
                  </button>
                  <button className={styles.messageBtn} onClick={handleMessage}>
                    <MessageCircle size={16} />
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.locations}>
              <div className={styles.location}>
                <MapPin size={20} className={styles.locationIcon} />
                <div className={styles.locationDetails}>
                  <strong>Pick Up</strong>
                  <p>
                    {ride.pickup ||
                      "123, Main Basar, Sadar Basar, Ambala Cantt"}
                  </p>
                </div>
              </div>

              <div className={styles.location}>
                <MapPin size={20} className={styles.locationIcon} />
                <div className={styles.locationDetails}>
                  <strong>Drop Off</strong>
                  <p>{ride.dropoff || "Railway station, Delhi"}</p>
                </div>
              </div>
            </div>

            <div className={styles.rideInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoValue}>
                  {ride.distance || "65"} km
                </span>
                <span className={styles.infoLabel}>Distance</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoValue}>₹{ride.fare || "1000"}</span>
                <span className={styles.infoLabel}>Fare</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoValue}>
                  {ride.estimatedTime || "20"} min
                </span>
                <span className={styles.infoLabel}>Time</span>
              </div>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.cancelBtn}
                onClick={() => handleRideResponse("rejected")}
                disabled={responding}
              >
                Cancel
              </button>
              <button
                className={styles.acceptBtn}
                onClick={() => handleRideResponse("accepted")}
                disabled={responding}
              >
                {responding ? "Accepting..." : "Accept Ride"}
              </button>
            </div>

            <div className={styles.moreDetails}>
              <button onClick={openRideModal}>See Details</button>
            </div>
          </div>
        </div>
      </div>

      <DriverRide
        isOpen={isRideModalOpen}
        onClose={closeRideModal}
        ride={ride}
        onRideResponse={handleRideResponse}
        onOpenSendOTP={openSendOTPModal}
      />

      <SendOTPModal
        isOpen={isSendOTPModalOpen}
        onClose={closeSendOTPModal}
        ride={activeRide}
        onSendOTP={handleSendOTP}
      />

      <OTPVerificationModal
        isOpen={isConfirmOTPModalOpen}
        onClose={closeConfirmOTPModal}
        ride={activeRide}
        onVerifyOTP={handleVerifyOTP}
      />
    </div>
  );
};

export default Rides;
