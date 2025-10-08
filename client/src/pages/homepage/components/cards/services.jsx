import React from "react";
import styles from "./cards.module.css";

import rentalCarImage from "../../../../assets/images/homepage/services/carimage.png";
import bikeAutoImage from "../../../../assets/images/homepage/services/scooter.png";
import dailyCarImage from "../../../../assets/images/homepage/services/bluecar.png";

const Cards = [
  {
    title: "For any duration",
    description:
      "Easily plan a day out without having to worry about conveyance with an hour-based package from Rental.",
    imageSrc: rentalCarImage,
    imageAlt: "Car Image",
  },
  {
    title: "For any budget",
    description:
      "From Bikes and Autos to Prime Sedans and Prime SUVs, you will find a ride in your budget at your convenience any time.",
    imageSrc: bikeAutoImage,
    imageAlt: "bike image",
  },
  {
    title: "For any distance",
    description:
      "Book rides within the city with Daily, or take a trip to your favourite destinations outside the city with Outstation.",
    imageSrc: dailyCarImage,
    imageAlt: "Blue car",
  },
];

const Services = () => {
  return (
    <div className={styles.servicesContainer}>
      <h2 className={styles.heading}>OUR SERVICES</h2>
      <div className={styles.cardsWrapper}>
        {Cards.map((service, index) => (
          <div key={index} className={styles.card}>
            <img
              src={service.imageSrc}
              alt={service.imageAlt}
              className={styles.cardImage}
            />

            <h3 className={styles.cardTitle}>{service.title}</h3>
            <p className={styles.cardDescription}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
