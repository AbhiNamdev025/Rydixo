import React from "react";
import styles from "./ridespage.module.css";
import Sidebar from "../../../components/local/driver/sidebar/sidebar";
import Rides from "./components/rides";

function RidesPage() {
  return (
    <div className={styles.appContainer}>
      <Sidebar />

      <div className={styles.mainContent}>
        <Rides />
      </div>
    </div>
  );
}

export default RidesPage;
