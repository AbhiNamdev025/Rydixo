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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";
import styles from "./ongoing.module.css";

// Leaflet configuration
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const OngoingRides = () => {
  const [ongoingRides, setOngoingRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [mapCenter, setMapCenter] = useState([30.3782, 76.7767]); 

  useEffect(() => {
    fetchOngoingRides();
    const interval = setInterval(fetchOngoingRides, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchOngoingRides = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:2525/ride/find", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch rides");
      const data = await response.json();

      // Filter only ongoing rides
      const ongoing = data.filter((ride) => ride.status === "ongoing");
      setOngoingRides(ongoing);

      if (ongoing.length > 0 && ongoing[0]?.pickup) {
        updateMapCenter(ongoing[0].pickup);
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

  const handleEndTrip = async (ride) => {
    try {
      setVerifying(true);
      const token = localStorage.getItem("token");

      console.log("Ending trip for ride:", ride._id);

      const response = await fetch(
        `http://localhost:2525/ride/${ride._id}/complete`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      console.log("Complete ride response:", response.status, responseData);

      if (!response.ok) {
        throw new Error(
          responseData.error ||
            responseData.message ||
            "Failed to complete ride"
        );
      }

      toast.success("Ride completed successfully!");
      await fetchOngoingRides();
    } catch (error) {
      console.error("Error completing ride:", error);
      toast.error(
        error.message || "Failed to complete ride. Please try again."
      );
    } finally {
      setVerifying(false);
    }
  };

  const handleContact = (phone) => {
    if (phone) {
      window.open(`tel:${phone}`, "_self");
    }
  };

  const handleMessage = (phone) => {
    if (phone) {
      window.open(`sms:${phone}`, "_self");
    }
  };

  const handleNavigate = (location) => {
    if (location) {
      const encodedLocation = encodeURIComponent(location);
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`,
        "_blank"
      );
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading ongoing rides...</div>
      </div>
    );
  }

  if (ongoingRides.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.noRides}>
          <Car size={48} className={styles.noRidesIcon} />
          <h3>No Ongoing Rides</h3>
          <p>You don't have any ongoing rides at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Ongoing Trip</h1>
        <div className={styles.onlineStatus}>
          <div className={styles.onlineDot}></div>
          Online
        </div>
      </div>

      {ongoingRides.map((ride) => (
        <div key={ride._id} className={styles.rideCard}>
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
            <button
              className={styles.navigateBtn}
              onClick={() => handleNavigate(ride.pickup)}
            >
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
                    {ride.user?.name || ride.userId?.name || "Nitin"}
                  </h2>
                  <div className={styles.userActions}>
                    <button
                      className={styles.contactBtn}
                      onClick={() => handleContact(ride.user?.phone)}
                    >
                      <Phone size={16} />
                      Contact
                    </button>
                    <button
                      className={styles.messageBtn}
                      onClick={() => handleMessage(ride.user?.phone)}
                    >
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
                        "123 Main Bazar, Sardar Bazar, Ambala Cantt"}
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
                  <span className={styles.infoValue}>
                    ₹{ride.fare || "1000"}
                  </span>
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
                  className={styles.endTripBtn}
                  onClick={() => handleEndTrip(ride)}
                  disabled={verifying}
                >
                  {verifying ? "Ending Trip..." : "End Trip"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OngoingRides;
