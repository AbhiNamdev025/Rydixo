import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { IndianRupee, Car, Clock, X } from "lucide-react";
import styles from "./earning.module.css";
import Image from "../../../../../public/assets/images/driver/earning.png";

const Earning = () => {
  const [driverData, setDriverData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState("weekly");

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        let driverId = localStorage.getItem("driverId");

        if (!driverId) {
          const userStr = localStorage.getItem("user");
          if (userStr) {
            try {
              const user = JSON.parse(userStr);
              driverId = user._id || user.id;
            } catch (e) {
              console.error("Error parsing user data:", e);
            }
          }
        }

        if (!driverId) {
          setDriverData(getDummyData());
          setLoading(false);
          return;
        }

        const res = await fetch(
          `http://localhost:2525/driver/find/${driverId}`
        );
        if (!res.ok) throw new Error("Failed to fetch driver data");
        const data = await res.json();
        setDriverData(data);
      } catch (err) {
        console.error("Error fetching driver data:", err);
        setDriverData(getDummyData());
      } finally {
        setLoading(false);
      }
    };
    fetchDriverData();
  }, []);

  const getDummyData = () => ({
    income: {
      daily: [{ amount: 1250, rides: 10 }],
      weekly: [
        { amount: 2000, rides: 15 },
        { amount: 1800, rides: 12 },
        { amount: 2200, rides: 14 },
        { amount: 2500, rides: 16 },
      ],
      monthly: [{ amount: 45000, rides: 120 }],
    },
    incentive: 5000,
  });

  if (loading) {
    return <div className={styles.loading}>Loading earnings data...</div>;
  }

  // Get amounts safely from arrays
  const totalBalance = driverData?.income?.monthly?.[0]?.amount || 0;
  const todayEarning = driverData?.income?.daily?.[0]?.amount || 0;
  const incentive = driverData?.incentive || 0;

  // Chart data based on selected timeframe
  let chartData = [];
  if (timeFrame === "daily") {
    chartData =
      driverData?.income?.daily?.map((item, index) => ({
        period: `Day ${index + 1}`,
        earnings: item.amount,
      })) || [];
  } else if (timeFrame === "weekly") {
    chartData =
      driverData?.income?.weekly?.map((item, index) => ({
        period: `Week ${index + 1}`,
        earnings: item.amount,
      })) || [];
  } else if (timeFrame === "monthly") {
    chartData =
      driverData?.income?.monthly?.map((item, index) => ({
        period: `Month ${index + 1}`,
        earnings: item.amount,
      })) || [];
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Total Balance</h1>
        <div className={styles.balance}>
          <IndianRupee size={24} />
          <span className={styles.balanceAmount}>
            {totalBalance.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Time Frame Selector */}
      <div className={styles.timeFrameSelector}>
        {["daily", "weekly", "monthly"].map((tf) => (
          <button
            key={tf}
            className={`${styles.timeFrameBtn} ${
              timeFrame === tf ? styles.active : ""
            }`}
            onClick={() => setTimeFrame(tf)}
          >
            {tf.charAt(0).toUpperCase() + tf.slice(1)}
          </button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className={styles.contentGrid}>
        {/* Left Column - Chart */}
        <div className={styles.leftColumn}>
          <div className={styles.earningsChartCard}>
            <h2 className={styles.sectionTitle}>Earnings</h2>
            <div className={styles.chartContainer}>
              <ResponsiveBar
                data={chartData}
                keys={["earnings"]}
                indexBy="period"
                margin={{ top: 20, right: 20, bottom: 50, left: 40 }}
                padding={0.3}
                valueScale={{ type: "linear" }}
                colors="#000"
                borderRadius={4}
                axisTop={null}
                axisRight={null}
                axisBottom={{ tickSize: 0, tickPadding: 10, tickRotation: 0 }}
                axisLeft={{ tickSize: 0, tickPadding: 10 }}
                enableLabel={false}
                enableGridY={true}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Incentive & Today Earning */}
        <div className={styles.rightColumn}>
          <div className={styles.incentiveCard}>
            <div className={styles.cardImageContainer}>
              <img
                src={Image}
                alt="Credit Card"
                className={styles.cardImage}
              />
            </div>
            <div className={styles.incentiveContent}>
              <h3>Incentive</h3>
              <div className={styles.incentiveAmount}>
                <IndianRupee size={16} />
                <span>+ {incentive.toLocaleString("en-IN")}</span>
              </div>
              <button className={styles.addButton}>Add with Amount</button>
            </div>
          </div>

          <div className={styles.todayEarningCard}>
            <h3>Today Earning</h3>
            <div className={styles.todayAmount}>
              <IndianRupee size={18} />
              <span>{todayEarning.toLocaleString("en-IN")}</span>
            </div>
            <button className={styles.addButton}>Add to Amount</button>
          </div>
        </div>
      </div>

      {/* Performance Stats Footer */}
      <div className={styles.performanceFooter}>
        <div className={styles.statItem}>
          <div className={styles.statIcon}>
            <Car size={20} />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statValue}>150</div>
            <div className={styles.statLabel}>Trips Completed</div>
          </div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statIcon}>
            <Clock size={20} />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statValue}>15</div>
            <div className={styles.statLabel}>Hours Online</div>
          </div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statIcon}>
            <X size={20} />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statValue}>6%</div>
            <div className={styles.statLabel}>Trips Cancel</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earning;
