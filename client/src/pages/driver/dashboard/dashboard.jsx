import React from "react";
import DriverDashboard from "./components/driverDashboard";
import Sidebar from "../../../components/local/driver/sidebar/sidebar";
import styles from "./dashboard.module.css";

function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <div>
        <Sidebar />
      </div>
      <div>
        <DriverDashboard />
      </div>
    </div>
  );
}

export default Dashboard;
