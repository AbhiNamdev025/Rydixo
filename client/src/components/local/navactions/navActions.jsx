// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import styles from "./navaction.module.css";
// import bellIcon from "../../../../public/assets/svgs/bell.svg";
// import searchIcon from "../../../../public/assets/svgs/search.svg";
// import userAvatar from "../../../../public/assets/images/header/userAvtar.png";
// import menuIcon from "../../../../public/assets/svgs/menu.svg";

// function NavActions({ userName, onLogout }) {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

//   const handleLogout = () => {
//     if (onLogout) onLogout();
//     setIsDropdownOpen(false);
//   };

//   return (
//     <div className={styles.navActions}>
//       <img
//         src={bellIcon}
//         alt="Notifications"
//         className={styles.icon}
//         title="Notifications"
//       />

//       <img
//         src={searchIcon}
//         alt="Search"
//         className={styles.icon}
//         title="Search"
//       />

//       {userName ? (
//         <div className={styles.userDropdown}>
//           <img
//             src={userAvatar}
//             alt={userName}
//             className={styles.avatar}
//             onClick={toggleDropdown}
//             title={`Logged in as ${userName}`}
//           />

//           <img
//             src={menuIcon}
//             alt="menu"
//             className={styles.menuIcon}
//             title="menu"
//           />

//           {isDropdownOpen && (
//             <div className={styles.dropdownMenu}>
//               <div className={styles.dropdownHeader}>
//                 Signed in as <strong>{userName}</strong>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className={styles.dropdownItem}
//                 aria-label="Logout"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <>
//           <NavLink
//             to="/signup"
//             className={({ isActive }) =>
//               `${styles.navlink} ${isActive ? styles.active : ""}`
//             }
//           >
//             Sign Up
//           </NavLink>
//           <NavLink
//             to="/login"
//             className={({ isActive }) =>
//               `${styles.navlink} ${isActive ? styles.active : ""}`
//             }
//           >
//             Sign In
//           </NavLink>
//         </>
//       )}
//     </div>
//   );
// }

// export default NavActions;

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./navaction.module.css";
import bellIcon from "../../../../public/assets/svgs/bell.svg";
import searchIcon from "../../../../public/assets/svgs/search.svg";
import userAvatar from "../../../../public/assets/images/header/userAvtar.png";
import menuIcon from "../../../../public/assets/svgs/menu.svg";
import arrowIcon from "../../../../public/assets/images/header/arrow-right.svg";

function NavActions({ userName, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMyRidesOpen, setIsMyRidesOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    if (onLogout) onLogout();
    setIsDropdownOpen(false);
  };

  const handleMyRides = () => {
    navigate("/my-rides");
    setIsDropdownOpen(false);
  };

  const handleHelp = () => {
    navigate("/help");
    setIsDropdownOpen(false);
  };

  const handleViewPreviousRides = () => {
    navigate("/my-rides/previous");
    setIsDropdownOpen(false);
    setIsMyRidesOpen(false);
  };

  const handleCancelRide = () => {
    console.log("Cancel ride ");
    setIsDropdownOpen(false);
  };

  const toggleMyRides = () => {
    setIsMyRidesOpen(!isMyRidesOpen);
  };

  return (
    <div className={styles.navActions}>
      <img
        src={bellIcon}
        alt="Notifications"
        className={styles.icon}
        title="Notifications"
      />

      <img
        src={searchIcon}
        alt="Search"
        className={styles.icon}
        title="Search"
      />

      {userName ? (
        <div className={styles.userDropdown}>
          <img
            src={userAvatar}
            alt={userName}
            className={styles.avatar}
            onClick={toggleDropdown}
            title={`Logged in as ${userName}`}
          />

          <img
            src={menuIcon}
            alt="menu"
            className={styles.menuIcon}
            onClick={toggleDropdown}
            title="menu"
          />

          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownHeader}>
                Signed in as <strong>{userName}</strong>
              </div>

              {/* My Rides */}
              <div className={styles.dropdownItemWithNested}>
                <button
                  onClick={toggleMyRides}
                  className={`${styles.dropdownItem} ${styles.hasNested}`}
                  aria-label="My Rides"
                >
                  My Rides
                  <img
                    src={arrowIcon}
                    alt="expand"
                    className={`${styles.arrowIcon} ${
                      isMyRidesOpen ? styles.rotated : ""
                    }`}
                  />
                </button>

                {isMyRidesOpen && (
                  <div className={styles.nestedDropdown}>
                    <button
                      onClick={handleMyRides}
                      className={styles.nestedItem}
                      aria-label="My Rides"
                    >
                      My Rides
                    </button>
                    <button
                      onClick={handleViewPreviousRides}
                      className={styles.nestedItem}
                      aria-label="View My Previous Rides"
                    >
                      View My Previous Rides
                    </button>
                    {/* <button
                      onClick={handleCancelRide}
                      className={styles.nestedItem}
                      aria-label="Cancel Ride"
                    >
                      Cancel
                    </button> */}
                  </div>
                )}
              </div>

              {/* Help */}
              <button
                onClick={handleHelp}
                className={styles.dropdownItem}
                aria-label="Help"
              >
                Help
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className={styles.dropdownItem}
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `${styles.navlink} ${isActive ? styles.active : ""}`
            }
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${styles.navlink} ${isActive ? styles.active : ""}`
            }
          >
            Sign In
          </NavLink>
        </>
      )}
    </div>
  );
}

export default NavActions;
