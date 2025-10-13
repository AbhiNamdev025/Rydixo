import React from "react";
import Footer from "../../global/footer/footer";
import Header from "../../global/header/header";
import styles from "./help.module.css";
import { HiOutlineMenu } from "react-icons/hi";

const supportTopics = [
  "Help with a Trip",
  "Account",
  "Membership",
  "Accessibility",
  "Map Issue",
  "Cancellation",
  "Guide",
];

function Help() {
  return (
    <>
      <Header />
      <div className={styles.helpContainer}>
        <div>
          <h1 className={styles.helpTitle}>
            Support Resources for RYDIXO Riders
          </h1>

          <div className={styles.helpContent}>
            <div className={styles.left}>
              <h3 className={styles.title}>All Topic</h3>
              <ul className={styles.topicList}>
                {supportTopics.map((topic, index) => (
                  <li key={index} className={styles.topicListItem}>
                    <button className={styles.topicButton}>
                      <HiOutlineMenu className={styles.listItemIcon} />
                      <span className={styles.topicText}>{topic}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.right}></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Help;
