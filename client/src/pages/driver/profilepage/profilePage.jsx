import React from "react";
import Sidebar from "../../../components/local/driver/sidebar/sidebar";
import styles from "./profilepage.module.css";
import Profile from "./components/profile";

function ProfilePage() {
  return (
    <div className={styles.appContainer}>
      <Sidebar />

      <div className={styles.mainContent}>
        <Profile />
      </div>
    </div>
  );
}

export default ProfilePage;
