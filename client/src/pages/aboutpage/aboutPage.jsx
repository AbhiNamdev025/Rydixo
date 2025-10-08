import React from "react";
import styles from "./about.module.css";
import Footer from "../../components/global/footer/footer";
import Header from "../../components/global/header/header";
import Hero from "./components/hero/hero";
import Cta from "./components/cta/cta";
import Cards from "./components/cards/cards";

function AboutPage() {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <Hero />
        <Cta/>
        <Cards/>
        <Footer />
      </div>
    </>
  );
}

export default AboutPage;
