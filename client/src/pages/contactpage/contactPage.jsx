import React from "react";
import styles from "./contact.module.css";
import Footer from "../../components/global/footer/footer";
import Header from "../../components/global/header/header";
import ContactSection from "./contactSection/contactSection";

function ContactPage() {
  return (
    <>
      <>
        <div className={styles.container}>
          <Header />
          <ContactSection/>
          <Footer />
        </div>
      </>
    </>
  );
}

export default ContactPage;
