import React from "react";
import styles from "./hero.module.css";
function Hero() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}></div>

        <div className={styles.right}>
          <h1 className={styles.title}>About Rydixo</h1>

          <p className={styles.description}>
            Welcome to RYDIXO, where luxury meets convenience on every ride.
            Founded with a vision to revolutionize urban and intercity travel,
            RYDIXO is a premium car booking platform designed to deliver a
            seamless, safe, and stylish transportation experience. In today’s
            fast-paced world, we understand that your time is valuable and your
            comfort is non-negotiable. Whether you’re heading to a business
            meeting, catching a flight, or exploring a new city, RYDIXO ensures
            that you arrive on time and in style. Our platform connects you to a
            fleet of top-tier, well-maintained vehicles driven by verified,
            professional drivers who prioritize safety, cleanliness, and
            customer service. We’re building more than a ride-hailing platform —
            we’re building a trusted travel companion. Our goal is to make
            RYDIXO synonymous with dependable mobility, whether you're a solo
            traveller, a corporate professional, or a family on the go. RYDIXO
            isn’t just a service — it’s a movement toward better, more
            dependable urban mobility.We’re here to change how people perceive
            and experience travel — turning daily commutes and road journeys
            into something seamless, comfortable, and reliable.
          </p>
          <div>
            <div className={styles.heroButton}>Explore More</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
