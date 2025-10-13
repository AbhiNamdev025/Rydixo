import React from "react";
import styles from "./footer.module.css";
import {
  FaTwitter,
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaGlobe,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import logo from "../../../../public/assets/svgs/mainlogo.svg";

function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.headerRow}>
            <div className={styles.logoSection}>
              <div className={styles.logo}>
                <img
                  src={logo}
                  alt="Rydixo Logo"
                  className={styles.logoImage}
                />
                <span className={styles.logoText}>Rydixo</span>
              </div>
            </div>
          </div>

          <div className={styles.linksAndInfo}>
            <div className={styles.column}>
              <h3 className={styles.columnTitle}>Company</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link to="/privacy-policy" className={styles.link}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-and-conditions" className={styles.link}>
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/refund-policy" className={styles.link}>
                    Refunds
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.column}>
              <h3 className={styles.columnTitle}>Services</h3>
              <ul className={styles.linkList}>
                <li>
                  <div className={styles.link}>Local Car Rentals</div>
                </li>
                <li>
                  <div className={styles.link}>Outstation Taxi</div>
                </li>
                <li>
                  <div className={styles.link}>One Way Cabs</div>
                </li>
              </ul>
            </div>

            <div className={styles.column}>
              <h3 className={styles.columnTitle}>Get In Touch</h3>
              <ul className={styles.linkList}>
                <li>
                  <div className={styles.link}>Contact Us</div>
                </li>
                <li>
                  <div className={styles.link}>Travel Agent</div>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.social}>
            {/*  icons */}
            <div className={styles.socialIcons}>
              <a href="/" target="_blank">
                <FaTwitter className={styles.socialIcon} />
              </a>
              <a href="/" target="_blank">
                <FaYoutube className={styles.socialIcon} />
              </a>
              <a href="/" target="_blank">
                <FaFacebookF className={styles.socialIcon} />
              </a>
              <a href="/" target="_blank">
                <FaInstagram className={styles.socialIcon} />
              </a>
            </div>

            <div className={styles.locationInfo}>
              <div className={styles.locationItem}>
                <FaGlobe className={styles.locationIcon} /> English
              </div>
              <div className={styles.locationItem}>
                <FaMapMarkerAlt className={styles.locationIcon} /> Location
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          &copy; Copyright 2025 RYDIXO. All Rights Reserved.
        </p>
        <div className={styles.bottomLinks}>
          <Link to="/" className={styles.bottomLink}>
            Notice
          </Link>
          <Link to="/privacy-policy" className={styles.bottomLink}>
            Privacy Policy
          </Link>
          <Link to="/terms-and-conditions" className={styles.bottomLink}>
            Term of services
          </Link>
          <div className={styles.countrySelector}>
            India &nbsp; <span className={styles.dropdownArrow}>&#9662;</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;

//showing footer links as modals
// import React, { useState } from "react";
// import styles from "./footer.module.css";
// import {
//   FaTwitter,
//   FaYoutube,
//   FaFacebookF,
//   FaInstagram,
//   FaGlobe,
//   FaMapMarkerAlt,
// } from "react-icons/fa";
// import logo from "../../../../public/assets/svgs/mainlogo.svg";
// import Modal from "../../local/modal/modal";
// import PrivacyPolicy from "./components/privacypolicy/privacyPolicy";
// import TermsAndConditions from "./components/terms/terms";
// import RefundPolicy from "./components/refund/refundPolicy";

// function Footer() {
//   const [openModal, setOpenModal] = useState(null);

//   const closeModal = () => setOpenModal(null);

//   return (
//     <>
//       <footer className={styles.footer}>
//         <div className={styles.footerContent}>
//           {/*Logo */}
//           <div className={styles.headerRow}>
//             <div className={styles.logoSection}>
//               <div className={styles.logo}>
//                 <img
//                   src={logo}
//                   alt="Rydixo Logo"
//                   className={styles.logoImage}
//                 />
//                 <span className={styles.logoText}>Rydixo</span>
//               </div>
//             </div>
//           </div>

//           {/* Column */}
//           <div className={styles.linksAndInfo}>
//             <div className={styles.column}>
//               <h3 className={styles.columnTitle}>Company</h3>
//               <ul className={styles.linkList}>
//                 <li>
//                   <div
//                     className={styles.link}
//                     onClick={() => setOpenModal("privacy")}
//                   >
//                     Privacy Policy
//                   </div>
//                 </li>
//                 <li>
//                   <div
//                     className={styles.link}
//                     onClick={() => setOpenModal("terms")}
//                   >
//                     Terms & Conditions
//                   </div>
//                 </li>
//                 <li>
//                   <div
//                     className={styles.link}
//                     onClick={() => setOpenModal("refund")}
//                   >
//                     Refunds
//                   </div>
//                 </li>
//               </ul>
//             </div>

//             <div className={styles.column}>
//               <h3 className={styles.columnTitle}>Services</h3>
//               <ul className={styles.linkList}>
//                 <li>
//                   <div className={styles.link}>Local Car Rentals</div>
//                 </li>
//                 <li>
//                   <div className={styles.link}>Outstation Taxi</div>
//                 </li>
//                 <li>
//                   <div className={styles.link}>One Way Cabs</div>
//                 </li>
//               </ul>
//             </div>

//             <div className={styles.column}>
//               <h3 className={styles.columnTitle}>Get In Touch</h3>
//               <ul className={styles.linkList}>
//                 <li>
//                   <div className={styles.link}>Contact Us</div>
//                 </li>
//                 <li>
//                   <div className={styles.link}>Travel Agent</div>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Icons*/}
//           <div className={styles.social}>
//             <div className={styles.socialIcons}>
//               <a href="/" target="_blank" rel="noreferrer">
//                 <FaTwitter className={styles.socialIcon} />
//               </a>
//               <a href="/" target="_blank" rel="noreferrer">
//                 <FaYoutube className={styles.socialIcon} />
//               </a>
//               <a href="/" target="_blank" rel="noreferrer">
//                 <FaFacebookF className={styles.socialIcon} />
//               </a>
//               <a href="/" target="_blank" rel="noreferrer">
//                 <FaInstagram className={styles.socialIcon} />
//               </a>
//             </div>

//             <div className={styles.locationInfo}>
//               <div className={styles.locationItem}>
//                 <FaGlobe className={styles.locationIcon} /> English
//               </div>
//               <div className={styles.locationItem}>
//                 <FaMapMarkerAlt className={styles.locationIcon} /> Location
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Bottom Bar */}
//       <div className={styles.bottomBar}>
//         <p className={styles.copyright}>
//           &copy; Copyright 2025 RYDIXO. All Rights Reserved.
//         </p>
//         <div className={styles.bottomLinks}>
//           <div className={styles.bottomLink}>Notice</div>
//           <div
//             className={styles.bottomLink}
//             onClick={() => setOpenModal("privacy")}
//           >
//             Privacy Policy
//           </div>
//           <div
//             className={styles.bottomLink}
//             onClick={() => setOpenModal("terms")}
//           >
//             Term of services
//           </div>
//           <div className={styles.countrySelector}>
//             India &nbsp; <span className={styles.dropdownArrow}>&#9662;</span>
//           </div>
//         </div>
//       </div>

//       {/* Modals  */}
//       <Modal isOpen={openModal === "privacy"} onClose={closeModal}>
//         <PrivacyPolicy />
//       </Modal>
//       <Modal isOpen={openModal === "terms"} onClose={closeModal}>
//         <TermsAndConditions />
//       </Modal>
//       <Modal isOpen={openModal === "refund"} onClose={closeModal}>
//         <RefundPolicy />
//       </Modal>
//     </>
//   );
// }

// export default Footer;
