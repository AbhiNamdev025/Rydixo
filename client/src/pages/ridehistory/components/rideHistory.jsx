import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Car,
  Clock,
  ChevronRight,
  IndianRupee,
  Loader,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import styles from "./rideHistory.module.css";
import { BASE_URL_RIDE } from "../../../const/const";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Routing Component
const RoutingMachine = ({ pickup, dropoff }) => {
  const map = useMap();
  const routingControlRef = useRef(null);
  const [loading, setLoading] = useState(true);

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
      const normalizedLocation = location.toLowerCase().trim();
      if (locationDatabase[normalizedLocation]) {
        return locationDatabase[normalizedLocation];
      }

      for (const [city, coords] of Object.entries(locationDatabase)) {
        if (
          normalizedLocation.includes(city) ||
          city.includes(normalizedLocation)
        ) {
          return coords;
        }
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            location + ", India"
          )}&limit=1`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
          }
        }
      } catch (error) {
        console.warn("Nominatim geocoding failed, using fallback:", error);
      }

      // Default fallback to Chandigarh area
      console.warn(
        `Could not geocode "${location}", using default coordinates`
      );
      return [30.7333, 76.7794];
    };

    const initRouting = async () => {
      setLoading(true);

      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }

      try {
        const pickupCoords = await geocode(pickup);
        const dropoffCoords = await geocode(dropoff);

        if (!pickupCoords || !dropoffCoords) {
          console.error("Unable to geocode locations");
          setLoading(false);
          return;
        }

        const pickupIcon = L.divIcon({
          className: "custom-marker",
          html: '<div style="background: #22c55e; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        const dropoffIcon = L.divIcon({
          className: "custom-marker",
          html: '<div style="background: #ef4444; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
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
          createMarker: function (i, waypoint, n) {
            return L.marker(waypoint.latLng, {
              draggable: false,
              icon: i === 0 ? pickupIcon : dropoffIcon,
            });
          },
          router: L.Routing.osrmv1({
            serviceUrl: "https://router.project-osrm.org/route/v1",
          }),
        }).addTo(map);

        const container = routingControl.getContainer();
        if (container) {
          container.style.display = "none";
        }

        routingControlRef.current = routingControl;
        setLoading(false);
      } catch (error) {
        console.error("Routing error:", error);
        setLoading(false);
      }
    };

    initRouting();

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [pickup, dropoff, map]);

  return null;
};

const RideHistory = () => {
  const [selectedRide, setSelectedRide] = useState(null);
  const [rideHistory, setRideHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCurrentUser = () => {
    try {
      const userData =
        localStorage.getItem("user") || sessionStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        return {
          id: user._id || user.id,
          name: user.name,
          email: user.email,
        };
      }
      const userId =
        localStorage.getItem("userId") || sessionStorage.getItem("userId");
      if (userId) {
        return { id: userId };
      }
      return null;
    } catch (error) {
      console.error("Error getting user data:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchUserRides();
  }, []);

  const fetchUserRides = async () => {
    try {
      setLoading(true);
      const user = getCurrentUser();

      if (!user || !user.id) {
        setError("Please log in to view your ride history");
        setLoading(false);
        return;
      }

      const response = await fetch(`${BASE_URL_RIDE}/find/user/${user.id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch rides: ${response.status}`);
      }

      const data = await response.json();

      // Process rides to ensure status field is properly set
      const processedRides = (Array.isArray(data) ? data : [data]).map(
        (ride) => ({
          ...ride,
          status: ride.status || "pending", // Default to pending if no status
        })
      );

      setRideHistory(processedRides);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching ride history:", err);
      setError(err.message || "Failed to load ride history");
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      pending: styles.statusPending,
      confirmed: styles.statusConfirmed,
      completed: styles.statusCompleted,
      cancelled: styles.statusCancelled,
    };
    return statusMap[status] || styles.statusPending;
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <Loader className={styles.spinner} size={48} />
          <p>Loading your ride history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={fetchUserRides} className={styles.retryBtn}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.grid}>
          <div className={styles.mapSection}>
            <div className={styles.header}>
              <h1>My Ride History</h1>
            </div>
            <div className={styles.mapHeader}>
              <h2>
                {selectedRide
                  ? `Route: ${
                      selectedRide.pickup || selectedRide.pickupLocation
                    } to ${
                      selectedRide.dropoff || selectedRide.dropoffLocation
                    }`
                  : "Select a ride to view route"}
              </h2>
              {selectedRide && (
                <div
                  className={`${styles.statusBadge} ${getStatusBadgeClass(
                    selectedRide.status
                  )}`}
                >
                  {selectedRide.status.toUpperCase()}
                </div>
              )}
            </div>
            <div className={styles.mapContainer}>
              {selectedRide ? (
                <MapContainer
                  key={`map-${selectedRide._id || selectedRide.id}`}
                  center={[30.7333, 76.7794]}
                  zoom={10}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <RoutingMachine
                    pickup={selectedRide.pickup || selectedRide.pickupLocation}
                    dropoff={
                      selectedRide.dropoff || selectedRide.dropoffLocation
                    }
                  />
                </MapContainer>
              ) : (
                <div className={styles.mapPlaceholder}>
                  <MapPin size={48} />
                  <p>Select a ride from history to view the route</p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.ridesSection}>
            <h2 className={styles.sectionTitle}>My Previous Rides</h2>

            {rideHistory.length === 0 ? (
              <div className={styles.noRides}>
                <Car size={48} />
                <p>No rides found</p>
                <button
                  className={styles.bookBtn}
                  onClick={() => (window.location.href = "/book-ride")}
                >
                  Book Your First Ride
                </button>
              </div>
            ) : (
              <div className={styles.ridesList}>
                {rideHistory.map((ride) => (
                  <div
                    key={ride.id || ride._id}
                    onClick={() => setSelectedRide(ride)}
                    className={`${styles.rideCard} ${
                      selectedRide?.id === ride.id ||
                      selectedRide?._id === ride._id
                        ? styles.rideCardSelected
                        : ""
                    }`}
                  >
                    <div className={styles.rideCardContent}>
                      <div className={styles.carIcon}>
                        <Car size={24} />
                      </div>

                      <div className={styles.rideDetails}>
                        <div className={styles.rideHeader}>
                          <div>
                            <div className={styles.rideDate}>
                              {formatDate(
                                ride.createdAt || ride.bookingDate || ride.date
                              )}
                            </div>
                            <div className={styles.rideTime}>
                              <Clock size={14} />
                              {formatTime(
                                ride.createdAt || ride.bookingDate || ride.date
                              )}
                            </div>
                          </div>
                          <div className={styles.rideFare}>
                            <IndianRupee size={16} />
                            {ride.fare || ride.price || ride.amount || "499"}
                          </div>
                        </div>

                        <div className={styles.rideRoute}>
                          <strong>{ride.pickup || ride.pickupLocation}</strong>{" "}
                          to{" "}
                          <strong>
                            {ride.dropoff || ride.dropoffLocation}
                          </strong>
                        </div>

                        <div className={styles.rideStatus}>
                          <span
                            className={`${
                              styles.statusBadge
                            } ${getStatusBadgeClass(ride.status)}`}
                          >
                            {ride.status.toUpperCase()}
                          </span>
                        </div>

                        {(selectedRide?.id === ride.id ||
                          selectedRide?._id === ride._id) && (
                          <div className={styles.rideExtraDetails}>
                            <div className={styles.detailGrid}>
                              {ride.driverName && (
                                <div>
                                  <span className={styles.detailLabel}>
                                    Driver:{" "}
                                  </span>
                                  <span className={styles.detailValue}>
                                    {ride.driverName}
                                  </span>
                                </div>
                              )}
                              {ride.vehicleModel && (
                                <div>
                                  <span className={styles.detailLabel}>
                                    Vehicle:{" "}
                                  </span>
                                  <span className={styles.detailValue}>
                                    {ride.vehicleModel}
                                  </span>
                                </div>
                              )}
                              {ride.vehicleNumber && (
                                <div className={styles.detailFullWidth}>
                                  <span className={styles.detailLabel}>
                                    Number:{" "}
                                  </span>
                                  <span className={styles.detailValue}>
                                    {ride.vehicleNumber}
                                  </span>
                                </div>
                              )}
                              {ride.bookingType && (
                                <div>
                                  <span className={styles.detailLabel}>
                                    Type:{" "}
                                  </span>
                                  <span className={styles.detailValue}>
                                    {ride.bookingType}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <ChevronRight size={20} className={styles.chevron} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.bottomCards}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🚗</div>
            <div className={styles.featureContent}>
              <h4 className={styles.featureTitle}>Request more rides</h4>
              <p className={styles.featureText}>For yourself or guest</p>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>👥</div>
            <div className={styles.featureContent}>
              <h4 className={styles.featureTitle}>Send and receive</h4>
              <p className={styles.featureText}>One or multiple items</p>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📅</div>
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

export default RideHistory;
