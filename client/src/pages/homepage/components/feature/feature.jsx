import React from "react";
import styles from "./feature.module.css";

// Images Import
import featureimage from "../../../../../public/assets/images/homepage/feature/featureimage.png";
import svg1 from "../../../../../public/assets/images/homepage/feature/svg1.svg";
import svg2 from "../../../../../public/assets/images/homepage/feature/svg2.svg";
import svg3 from "../../../../../public/assets/images/homepage/feature/svg3.svg";
import svg4 from "../../../../../public/assets/images/homepage/feature/svg4.svg";

function Feature() {
  return (
    <>
      <div className={styles.content}>
        <div>
          {" "}
          <h2 className={styles.heading}>Why you should ride with us???</h2>
          <div className={styles.features}>
            <div className={styles.featureItem}>
              <img src={svg1} alt="Registered Customers" />
              <p>2K+ registered customers</p>
            </div>

            <div className={styles.featureItem}>
              <img src={svg2} alt="Medical Support" />
              <p>24/7 medical support ready</p>
            </div>

            <div className={styles.featureItem}>
              <img src={svg3} alt="Global Reach" />
              <p>Wider service coverage</p>
            </div>

            <div className={styles.featureItem}>
              <img src={svg4} alt="Vehicle Safety" />
              <p>Safe, well-maintained vehicles</p>
            </div>
          </div>
        </div>
        <div className={styles.imageBox}>
          <img src={featureimage} alt="Driving Experience" />
          <p className={styles.text}>
            Rydixo is your first choice for traveling anywhere – be it a short
            city ride or a long-distance journey. With our reliable and timely
            service, well-maintained vehicles, and trained drivers, we ensure
            your travel experience is smooth, safe, and comfortable.
          </p>
        </div>
      </div>
    </>
  );
}

export default Feature;
