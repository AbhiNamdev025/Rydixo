import React from "react";
import Header from "../../components/global/header/header";
import styles from "./homePage.module.css";
import Hero from "./components/hero/hero";
import Feature from "./components/feature/feature";
import Cta from "./components/cta/cta";
import Footer from "../../components/global/footer/footer";
import Services from "./components/cards/services";
function HomePage() {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <Hero />
        <Feature />
        <Cta />
        <Services />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;


