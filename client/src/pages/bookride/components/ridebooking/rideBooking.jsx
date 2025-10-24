import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Check,
  X,
  Car,
  Key,
  Users,
  Calendar,
} from "lucide-react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import styles from "./ridebooking.module.css";
import { bookingService } from "../../services/bookingServices";
import { BASE_URL_DRIVER } from "../../../../const/const";

const BookingRoutingMachine = ({ pickup, dropoff }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    const geocode = async (location) => {
      const locationDatabase = {
        nahan: [30.5596, 77.2948],
        panchkula: [30.6942, 76.8606],
        ambala: [30.3782, 76.7767],
        chandigarh: [30.7333, 76.7794],
        shimla: [31.1048, 77.1734],
        delhi: [28.7041, 77.1025],
        kalka: [30.8371, 76.939],
        rajpura: [30.4789, 76.5937],
        yamunanagar: [30.129, 77.2674],
        karnal: [29.6857, 76.9905],
        panipat: [29.3909, 76.9635],
        kurukshetra: [29.9695, 76.8783],
      };
      const normalized = location.toLowerCase().trim();
      if (locationDatabase[normalized]) return locationDatabase[normalized];
      for (const [city, coords] of Object.entries(locationDatabase)) {
        if (normalized.includes(city) || city.includes(normalized))
          return coords;
      }
      return [30.7333, 76.7794];
    };

    const initRouting = async () => {
      if (routingControlRef.current)
        map.removeControl(routingControlRef.current);

      const pickupCoords = await geocode(pickup);
      const dropoffCoords = await geocode(dropoff);

      const pickupIcon = L.divIcon({
        className: "custom-marker",
        html: '<div style="background:#22c55e;width:30px;height:30px;border-radius:50%;border:3px solid white;"></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });
      const dropoffIcon = L.divIcon({
        className: "custom-marker",
        html: '<div style="background:#ef4444;width:30px;height:30px;border-radius:50%;border:3px solid white;"></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(pickupCoords[0], pickupCoords[1]),
          L.latLng(dropoffCoords[0], dropoffCoords[1]),
        ],
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        lineOptions: {
          styles: [{ color: "#3b82f6", weight: 6, opacity: 0.8 }],
        },
        createMarker: (i, waypoint) =>
          L.marker(waypoint.latLng, {
            icon: i === 0 ? pickupIcon : dropoffIcon,
          }),
        router: L.Routing.osrmv1({
          serviceUrl: "https://router.project-osrm.org/route/v1",
        }),
      }).addTo(map);

      const container = routingControl.getContainer();
      if (container) container.style.display = "none";
      routingControlRef.current = routingControl;
    };

    if (pickup && dropoff) initRouting();
    return () => {
      if (routingControlRef.current)
        map.removeControl(routingControlRef.current);
    };
  }, [pickup, dropoff, map]);

  return null;
};

const RideBookingFlow = ({ bookingId }) => {
  const [bookingStage, setBookingStage] = useState("searching");
  const [countdown, setCountdown] = useState(20);
  const [bookingData, setBookingData] = useState(null);
  const [driverData, setDriverData] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const getCurrentUser = () => {
    try {
      const u = localStorage.getItem("user");
      return u ? JSON.parse(u) : null;
    } catch (e) {
      return null;
    }
  };
  const user = getCurrentUser();

  useEffect(() => {
    if (!bookingId) return;

    const fetchData = async () => {
      try {
        const data = await bookingService.getBookingById(bookingId);
        setBookingData(data);
        updateStageFromStatus(data);

        if (data.status === "confirmed" && data.driverId) {
          let actualDriverId;

          if (typeof data.driverId === "string") {
            actualDriverId = data.driverId;
          } else if (data.driverId._id) {
            actualDriverId = data.driverId._id;
          } else if (data.driverId.id) {
            actualDriverId = data.driverId.id;
          } else {
            actualDriverId = data.driverId.toString();
          }

          if (actualDriverId && actualDriverId !== "[object Object]") {
            await fetchDriverData(actualDriverId, data.otp);
          }
        }
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [bookingId]);

  useEffect(() => {
    if (bookingStage === "searching" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (bookingStage === "searching" && countdown === 0) {
      setBookingStage("pending");
    }
  }, [bookingStage, countdown]);

  const updateStageFromStatus = (data) => {
    if (data.status === "pending") setBookingStage("pending");
    else if (data.status === "confirmed" && data.driverId) {
      setBookingStage("requested");
    } else if (data.status === "ongoing") setBookingStage("ongoing");
    else if (data.status === "completed") setBookingStage("confirmed");
    else if (data.status === "cancelled") setBookingStage("cancelled");
  };

  const fetchDriverData = async (driverId, bookingOtp) => {
    if (!driverId || driverId === "[object Object]") {
      const fallbackData = {
        name: "Driver",
        phone: "+91 9876543210",
        vehicle: {
          model: "Car",
          number: "HR09AB1234",
          type: "Sedan",
        },
        rating: 4.5,
        otp: bookingOtp || Math.floor(1000 + Math.random() * 9000),
      };
      setDriverData(fallbackData);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const driverIdStr = String(driverId).trim();
      const response = await fetch(`${BASE_URL_AUTH}/find/${driverIdStr}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const driver = await response.json();

      const driverDataObj = {
        name: driver.name || "Driver",
        phone:
          driver.phone ||
          driver.personal_info?.contact_number ||
          "+91 0000000000",
        vehicle: {
          model: driver.vehicle_details?.vehicle_name || "Car Model",
          number: driver.vehicle_details?.vehicle_number || "XX00XX0000",
          type: "Sedan",
        },
        rating: 4.5,
        otp: bookingOtp || Math.floor(1000 + Math.random() * 9000),
      };

      setDriverData(driverDataObj);
    } catch (error) {
      const fallbackData = {
        name: "Driver",
        phone: "+91 9876543210",
        vehicle: {
          model: "Car",
          number: "HR09AB1234",
          type: "Sedan",
        },
        rating: 4.5,
        otp: bookingOtp || Math.floor(1000 + Math.random() * 9000),
      };
      setDriverData(fallbackData);
    }
  };

  const updateBookingStatus = async (status) => {
    setUpdatingStatus(true);
    try {
      const res = await bookingService.updateBookingStatus(bookingId, status);
      setBookingData(res.booking);
      updateStageFromStatus(res.booking);
    } catch (e) {
      console.error(e);
      alert("Failed to update booking");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleStartRide = async () => {
    if (!driverData) return;
    setUpdatingStatus(true);
    try {
      const res = await bookingService.startRide(bookingId, driverData.otp);
      setBookingData(res.booking);
      updateStageFromStatus(res.booking);
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleCompleteRide = async () => {
    setUpdatingStatus(true);
    try {
      const res = await bookingService.completeRide(bookingId);
      setBookingData(res.booking);
      updateStageFromStatus(res.booking);
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleCancelBooking = async () => {
    await updateBookingStatus("cancelled");
  };

  const handleCallDriver = () => {
    if (driverData) window.open(`tel:${driverData.phone}`, "_self");
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.grid}>
          <div className={styles.mapSection}>
            {bookingStage === "searching" && (
              <div className={`${styles.statusBar} ${styles.searching}`}>
                Searching Car - {countdown}s
              </div>
            )}
            {bookingStage === "pending" && (
              <div className={`${styles.statusBar} ${styles.pending}`}>
                Waiting for driver acceptance...
              </div>
            )}
            {bookingStage === "requested" && (
              <div className={`${styles.statusBar} ${styles.arriving}`}>
                Driver Assigned - Arriving in 5 min
              </div>
            )}
            {bookingStage === "ongoing" && (
              <div className={`${styles.statusBar} ${styles.ongoing}`}>
                Ride Started
              </div>
            )}
            {bookingStage === "cancelled" && (
              <div className={`${styles.statusBar} ${styles.cancelled}`}>
                <X size={18} /> Ride Cancelled
              </div>
            )}
            {bookingStage === "confirmed" && (
              <div className={`${styles.statusBar} ${styles.confirmed}`}>
                <Check size={18} /> Ride Completed
              </div>
            )}

            <div className={styles.mapContainer}>
              {bookingData?.pickup && bookingData?.dropoff ? (
                <MapContainer
                  key={`map-${bookingId}`}
                  center={[30.7333, 76.7794]}
                  zoom={10}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <BookingRoutingMachine
                    pickup={bookingData.pickup}
                    dropoff={bookingData.dropoff}
                  />
                </MapContainer>
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f3f4f6",
                  }}
                >
                  <MapPin size={48} style={{ opacity: 0.3 }} />
                </div>
              )}
            </div>
          </div>

          <div className={styles.detailsSection}>
            {bookingStage === "searching" && (
              <div className={styles.card}>
                <h3 className={`${styles.cardTitle} ${styles.cardTitleblue}`}>
                  Ride Requested
                </h3>
                <p className={styles.cardSubtitle}>Finding drivers nearby</p>

                {bookingData && (
                  <div className={styles.locationInfo}>
                    <div className={styles.locationItem}>
                      <MapPin className={styles.icon} size={20} />
                      <div>
                        <p className={styles.locationLabel}>Pickup Location</p>
                        <p className={styles.locationValue}>
                          {bookingData.pickup}
                        </p>
                      </div>
                    </div>
                    <div className={styles.locationItem}>
                      <MapPin className={styles.icon} size={20} />
                      <div>
                        <p className={styles.locationLabel}>
                          Drop-off Location
                        </p>
                        <p className={styles.locationValue}>
                          {bookingData.dropoff}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className={styles.fareInfo}>
                  <Clock className={styles.icon} size={20} />
                  <span className={styles.fareLabel}>
                    Estimated Fare: ₹ 499
                  </span>
                  <span className={styles.fareType}>Cash</span>
                </div>

                <button
                  className={styles.cancelBtn}
                  onClick={handleCancelBooking}
                  disabled={updatingStatus}
                >
                  {updatingStatus ? "Cancelling..." : "Cancel Ride"}
                </button>
              </div>
            )}

            {bookingStage === "pending" && (
              <div className={styles.card}>
                <h3 className={`${styles.cardTitle} ${styles.cardTitleblue}`}>
                  Ride Request Sent
                </h3>
                <p className={styles.cardSubtitle}>
                  Waiting for driver acceptance
                </p>

                {bookingData && (
                  <div className={styles.locationInfo}>
                    <div className={styles.locationItem}>
                      <MapPin className={styles.icon} size={20} />
                      <div>
                        <p className={styles.locationLabel}>Pickup Location</p>
                        <p className={styles.locationValue}>
                          {bookingData.pickup}
                        </p>
                      </div>
                    </div>
                    <div className={styles.locationItem}>
                      <MapPin className={styles.icon} size={20} />
                      <div>
                        <p className={styles.locationLabel}>
                          Drop-off Location
                        </p>
                        <p className={styles.locationValue}>
                          {bookingData.dropoff}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className={styles.fareInfo}>
                  <Clock className={styles.icon} size={20} />
                  <span className={styles.fareLabel}>
                    Estimated Fare: ₹ 264.51
                  </span>
                  <span className={styles.fareType}>Cash</span>
                </div>

                <div className={styles.pendingMessage}>
                  <p>Your ride request has been sent to nearby drivers.</p>
                  <p>Waiting for a driver to accept your ride...</p>
                </div>

                <button
                  className={styles.cancelBtn}
                  onClick={handleCancelBooking}
                  disabled={updatingStatus}
                >
                  {updatingStatus ? "Cancelling..." : "Cancel Ride"}
                </button>
              </div>
            )}

            {bookingStage === "requested" && driverData && (
              <div className={styles.card}>
                <h3 className={`${styles.cardTitle} ${styles.cardTitleGreen}`}>
                  Ride Confirmed
                </h3>

                {bookingData && (
                  <div className={styles.locationInfo}>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>Pickup Location</span>
                      <span className={styles.value}>{bookingData.pickup}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>Drop-off Location</span>
                      <span className={styles.value}>
                        {bookingData.dropoff}
                      </span>
                    </div>
                  </div>
                )}

                <div className={styles.driverInfo}>
                  <div className={styles.driverCard}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVcnImBmZ1U-IhsHjdDYaTS9_GpU5CQn9-KA&s"
                      alt="Driver"
                      className={styles.driverImage}
                    />
                    <div className={styles.driverDetails}>
                      <p className={styles.driverName}>{driverData.name}</p>
                      <p className={styles.driverVehicle}>
                        ★ {driverData.rating} • {driverData.vehicle.type}
                      </p>
                    </div>
                    <button
                      className={styles.callBtn}
                      onClick={handleCallDriver}
                    >
                      <Phone size={20} />
                    </button>
                  </div>

                  <div className={styles.vehicleInfo}>
                    <div className={styles.vehicleIcon}>
                      <Car size={24} className={styles.icon} />
                    </div>
                    <div>
                      <p className={styles.vehicleName}>
                        {driverData.vehicle.model}
                      </p>
                      <p className={styles.vehicleModel}>
                        AC {driverData.vehicle.type}
                      </p>
                    </div>
                    <span className={styles.vehicleNumber}>
                      {driverData.vehicle.number}
                    </span>
                  </div>

                  <div className={styles.otpInfo}>
                    <div className={styles.otpIcon}>
                      <Key size={20} className={styles.icon} />
                    </div>
                    <span className={styles.otpLabel}>OTP</span>
                    <span className={styles.otpValue}>{driverData.otp}</span>
                  </div>
                </div>

                <div className={styles.actionButtons}>
                  <button
                    className={styles.keepBtn}
                    onClick={handleStartRide}
                    disabled={updatingStatus}
                  >
                    {updatingStatus ? "Starting..." : "Start Ride"}
                  </button>
                  <button
                    className={styles.cancelBtnSecondary}
                    onClick={handleCancelBooking}
                    disabled={updatingStatus}
                  >
                    {updatingStatus ? "Cancelling..." : "Cancel Booking"}
                  </button>
                </div>
              </div>
            )}

            {bookingStage === "ongoing" && driverData && (
              <div className={styles.card}>
                <h3 className={`${styles.cardTitle} ${styles.cardTitleGreen}`}>
                  Ride In Progress
                </h3>

                {bookingData && (
                  <div className={styles.locationInfo}>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>Pickup Location</span>
                      <span className={styles.value}>{bookingData.pickup}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>Drop-off Location</span>
                      <span className={styles.value}>
                        {bookingData.dropoff}
                      </span>
                    </div>
                  </div>
                )}

                <div className={styles.driverInfo}>
                  <div className={styles.driverCard}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVcnImBmZ1U-IhsHjdDYaTS9_GpU5CQn9-KA&s"
                      alt="Driver"
                      className={styles.driverImage}
                    />
                    <div className={styles.driverDetails}>
                      <p className={styles.driverName}>{driverData.name}</p>
                      <p className={styles.driverVehicle}>
                        ★ {driverData.rating} • {driverData.vehicle.type}
                      </p>
                    </div>
                    <button
                      className={styles.callBtn}
                      onClick={handleCallDriver}
                    >
                      <Phone size={20} />
                    </button>
                  </div>
                </div>

                <div className={styles.actionButtons}>
                  <button
                    className={styles.keepBtn}
                    onClick={handleCompleteRide}
                    disabled={updatingStatus}
                  >
                    {updatingStatus ? "Completing..." : "Complete Ride"}
                  </button>
                </div>
              </div>
            )}

            {bookingStage === "cancelled" && (
              <div className={styles.card}>
                <h3 className={`${styles.cardTitle} ${styles.cardTitlered}`}>
                  Ride Cancelled
                </h3>

                {bookingData && (
                  <div className={styles.locationInfo}>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>Pickup Location</span>
                      <span className={styles.value}>{bookingData.pickup}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>Drop-off Location</span>
                      <span className={styles.value}>
                        {bookingData.dropoff}
                      </span>
                    </div>
                  </div>
                )}

                <div className={styles.cancelledMessage}>
                  <p>Your ride has been cancelled successfully.</p>
                  <p>No cancellation charges applied.</p>
                </div>

                <button
                  className={styles.keepBtn}
                  onClick={() => (window.location.href = "/book-ride")}
                >
                  Book New Ride
                </button>
              </div>
            )}

            {bookingStage === "confirmed" && (
              <div className={styles.card}>
                <div className={styles.successMessage}>
                  <Check className={styles.successIcon} size={48} />
                  <h3 className={styles.successTitle}>Ride Completed!</h3>
                  <p className={styles.successText}>
                    Thank you for choosing Rydixo
                  </p>
                  {driverData && (
                    <div className={styles.driverEta}>
                      <p>
                        Driver: <strong>{driverData.name}</strong>
                      </p>
                      <p>
                        Vehicle: <strong>{driverData.vehicle.model}</strong>
                      </p>
                    </div>
                  )}
                  <button
                    className={styles.keepBtn}
                    onClick={() => (window.location.href = "/book-ride")}
                  >
                    Book Another Ride
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.bottomCards}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Car size={24} className={styles.icon} />
            </div>
            <div className={styles.featureContent}>
              <h4 className={styles.featureTitle}>Request more rides</h4>
              <p className={styles.featureText}>For yourself or guest</p>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Users size={24} className={styles.icon} />
            </div>
            <div className={styles.featureContent}>
              <h4 className={styles.featureTitle}>Send and receive</h4>
              <p className={styles.featureText}>One or multiple items</p>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Calendar size={24} className={styles.icon} />
            </div>
            <div className={styles.featureContent}>
              <h4 className={styles.featureTitle}>Reserve a ride</h4>
              <p className={styles.featureText}>Up to 90 days ahead</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideBookingFlow;
