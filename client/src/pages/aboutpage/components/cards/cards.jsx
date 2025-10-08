import React from "react";
import styles from "./cards.module.css";

// Image Imports
import luxury from "../../../../assets/images/aboutpage/cards/card1.png";
import promise from "../../../../assets/images/aboutpage/cards/card2.png";
import booking from "../../../../assets/images/aboutpage/cards/card3.png";
import safety from "../../../../assets/images/aboutpage/cards/card4.png";
import customize from "../../../../assets/images/aboutpage/cards/card5.png";
import taxi from "../../../../assets/images/aboutpage/cards/card6.png";

// Card Data
const cardsData = [
  {
    title: "Luxury on Wheels",
    description:
      "Choose from a wide range of premium vehicles, from executive sedans to high-end SUVs, offering the comfort you deserve.",
    imageSrc: luxury,
    imageAlt: "Luxury car",
  },
  {
    title: "On-Time Promise",
    description:
      "Powered by real-time GPS tracking and an intelligent scheduling system, we value your time as much as you do.",
    imageSrc: promise,
    imageAlt: "On-time service",
  },
  {
    title: "Smart Booking Experience",
    description:
      "Our intuitive and responsive platform makes booking a ride effortless — with just a few taps, your car is ready.",
    imageSrc: booking,
    imageAlt: "Booking experience",
  },
  {
    title: "Safety First",
    description:
      "Your safety is our top priority. All our rides are regularly sanitized, and our drivers are professionally trained.",
    imageSrc: safety,
    imageAlt: "Safety measures",
  },
  {
    title: "Customized for You",
    description:
      "Whether it’s a daily commute or a weekend getaway, our rides are tailored to meet your exact travel preferences.",
    imageSrc: customize,
    imageAlt: "Customized rides",
  },
  {
    title: "Anytime, Anywhere",
    description:
      "Book your ride anytime, anywhere — we’re available 24/7 to get you where you need to go, hassle-free.",
    imageSrc: taxi,
    imageAlt: "Taxi service",
  },
];

const Cards = () => {
  return (
    <div className={styles.servicesContainer}>
      <h2 className={styles.heading}>What Makes Rydixo Different</h2>
      <div className={styles.cardsWrapper}>
        {cardsData.map((card, index) => (
          <div key={index} className={styles.card}>
            <img
              src={card.imageSrc}
              alt={card.imageAlt}
              className={styles.cardImage}
            />
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDescription}>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
