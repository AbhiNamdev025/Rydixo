import React from "react";
import styles from "./contact.module.css";
import Footer from "../../components/global/footer/footer";
import Header from "../../components/global/header/header";

function ContactPage() {
  return (
    <>
      <>
        <div className={styles.container}>
          <Header />
          <h1>contact hu</h1>
          <Footer />
        </div>
      </>
    </>
  );
}

export default ContactPage;
