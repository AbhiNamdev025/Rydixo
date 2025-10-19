import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import styles from "./home.module.css";

const DriverDashboard = () => {
  const [driverData, setDriverData] = useState(null);
  const [pendingRides, setPendingRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");

  useEffect(() => {
    fetchDriverData();
    fetchPendingRides();
  }, []);

  const fetchDriverData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const payload = JSON.parse(atob(token.split(".")[1]));
      const driverId = payload.id || payload.userId || payload._id;

      const response = await fetch(
        `http://localhost:2525/driver/find/${driverId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch driver data");
      const data = await response.json();
      setDriverData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchPendingRides = async () => {
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

      const pending = data.filter((ride) => ride.status === "pending");
      setPendingRides(pending);
    } catch (err) {
      console.error("Error fetching rides:", err);
    }
  };

  const getChartData = () => {
    if (!driverData?.income) return [];
    const incomeData = driverData.income[selectedPeriod] || [];
    return incomeData.slice(-6).map((item, index) => ({
      period:
        selectedPeriod === "weekly"
          ? `Week ${index + 1}`
          : selectedPeriod === "monthly"
          ? `Month ${index + 1}`
          : `Day ${index + 1}`,
      amount: item.amount || 0,
      rides: item.rides || 0,
    }));
  };

  const getTodayEarning = () => {
    if (!driverData?.income?.daily?.length) return 0;
    const today = driverData.income.daily[driverData.income.daily.length - 1];
    return today?.amount || 0;
  };

  const getTotalRides = () => {
    if (!driverData?.income?.[selectedPeriod]?.length) return 0;
    return driverData.income[selectedPeriod].reduce(
      (sum, period) => sum + (period.rides || 0),
      0
    );
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  const chartData = getChartData();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.earningSection}>
          <div className={styles.sectionHeader}>
            <h2>📊 Earning Statistics</h2>
            <select
              className={styles.periodSelector}
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className={styles.todayEarning}>
            <span>Today's Earning</span>
            <strong>₹ {getTodayEarning()}</strong>
          </div>

          <button className={styles.withdrawBtn}>Withdraw to Bank</button>

          <div className={styles.chartContainer}>
            <ResponsiveBar
              data={chartData}
              keys={["amount"]}
              indexBy="period"
              margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
              padding={0.3}
              valueScale={{ type: "linear" }}
              colors="#000000"
              borderRadius={4}
              axisTop={null}
              axisRight={null}
              axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                format: (v) => `₹${v}`,
              }}
              enableLabel={false}
              theme={{
                axis: { ticks: { text: { fontSize: 11, fill: "#666" } } },
              }}
            />
          </div>

          <div className={styles.incentives}>
            <span>Incentives</span>
            <span>{getTotalRides()}/20 Rides</span>
          </div>
        </section>

        <section className={styles.performanceSection}>
          <div className={styles.driveRating}>
            <h3>My Drive Rating</h3>
            <div className={styles.ratingScore}>4.0</div>
            <div className={styles.stars}>⭐⭐⭐⭐</div>
            <p className={styles.ratingMessage}>Great Drive, Keep it up!</p>
          </div>

          <div className={styles.performance}>
            <h3>Performance</h3>
            <div className={styles.perfGrid}>
              <div className={styles.perfItem}>
                <div className={styles.perfValue}>12h</div>
                <div className={styles.perfLabel}>Online Hours</div>
              </div>
              <div className={styles.perfItem}>
                <div className={styles.perfValue}>150</div>
                <div className={styles.perfLabel}>Total Ride Complete</div>
              </div>
              <div className={styles.perfItem}>
                <div className={styles.perfValue}>2%</div>
                <div className={styles.perfLabel}>Cancellation Rate</div>
              </div>
              <div className={styles.perfItem}>
                <div className={styles.perfValue}>98%</div>
                <div className={styles.perfLabel}>Acceptance Rate</div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.shortcuts}>
          <h3>ShortCuts</h3>
          <div className={styles.shortcutGrid}>
            <button className={styles.shortcutBtn}>
              <span>💳</span>
              <span>Wallet</span>
            </button>
            <button className={styles.shortcutBtn}>
              <span>⚙️</span>
              <span>Support</span>
            </button>
            <button className={styles.shortcutBtn}>
              <span>📋</span>
              <span>Ride History</span>
            </button>
          </div>
        </section>
      </main>

      <aside className={styles.rightSidebar}>
        <section className={styles.vehicleCard}>
          <div className={styles.vehicleHeader}>
            <h3>🚗 Vehicle</h3>
            <span className={styles.activeBadge}>Active 🟢</span>
          </div>
          <div className={styles.vehicleInfo}>
            <div className={styles.vehicleImage}>
              <img
                src="https://www.group1mahindra.co.za/wp-content/uploads/mahindra-scorpio-n-review.jpg"
                className={styles.carImage}
              />
            </div>
            <h4>{driverData?.vehicle_details?.vehicle_name || "Scorpio N"}</h4>
            <p>{driverData?.vehicle_details?.vehicle_number || "HR 09-2526"}</p>
            <p>Diesel</p>
          </div>
        </section>

        <section className={styles.rideRequests}>
          <h3>Ride Requests</h3>
          <div className={styles.requestsList}>
            {pendingRides.length === 0 ? (
              <p className={styles.noRides}>No pending rides</p>
            ) : (
              pendingRides.map((ride, index) => (
                <div key={ride._id || index} className={styles.requestItem}>
                  <div className={styles.requestAvatar}>
                    {ride.user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className={styles.requestInfo}>
                    <strong>{ride.user?.name || "User"}</strong>
                    <p>
                      {ride.pickup_location} to {ride.drop_location}
                    </p>
                  </div>
                  <div className={styles.requestActions}>
                    <span className={styles.fare}>₹ {ride.fare || 0}</span>
                    <button className={styles.viewDetailsBtn}>
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className={styles.rideHistory}>
          <div className={styles.historyHeader}>
            <h3>Ride History</h3>
            <a href="#" className={styles.viewAll}>
              View All →
            </a>
          </div>
          <p className={styles.historySubtitle}>My Previous Rides</p>
          <div className={styles.historyItem}>
            <div className={styles.historyIcon}>🚗</div>
            <div className={styles.historyDetails}>
              <strong>June 15, 2025</strong>
              <p>12:30 pm | 23 mahesh nagar to chandigarh</p>
              <span className={styles.historyFare}>₹ 800</span>
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
};

export default DriverDashboard;
