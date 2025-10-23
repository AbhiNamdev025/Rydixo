import React from "react";
import Sidebar from "../../../components/local/driver/sidebar/sidebar";
import styles from "./earningpage.module.css";
import Earning from "./components/earning";

function EarningPage() {
  return (
    <div className={styles.appContainer}>
      <Sidebar />

      <div className={styles.mainContent}>
        <Earning />
      </div>
    </div>
  );
}

export default EarningPage;
