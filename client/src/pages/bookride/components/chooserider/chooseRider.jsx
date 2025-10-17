// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Modal from "../../../../components/local/modal/modal";
// import styles from "./chooseRider.module.css";

// function ChooseRider({ isOpen, onClose }) {
//   const navigate = useNavigate();
//   const [selectedRider, setSelectedRider] = useState("me");
//   const [riders, setRiders] = useState([
//     { id: "Gurpreet", name: "Gurpreet", icon: "👤" },
//     { id: "bittu", name: "Bittu", icon: "👤" },
//   ]);

//   const handleRemoveRider = (id) => {
//     if (id !== "me") {
//       setRiders(riders.filter((rider) => rider.id !== id));
//     }
//   };

//   const handleDone = () => {
//     console.log("Selected rider:", selectedRider);
//     onClose();
//     navigate("/ride-book");
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <div className={styles.container}>
//         <h2 className={styles.title}>Choose a rider</h2>

//         <div className={styles.ridersList}>
//           {riders.map((rider) => (
//             <div
//               key={rider.id}
//               className={`${styles.riderItem} ${
//                 selectedRider === rider.id ? styles.selected : ""
//               }`}
//               onClick={() => setSelectedRider(rider.id)}
//             >
//               <div className={styles.riderInfo}>
//                 <span className={styles.icon}>{rider.icon}</span>
//                 <span className={styles.name}>{rider.name}</span>
//               </div>
//               {rider.id !== "me" && (
//                 <button
//                   className={styles.removeBtn}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleRemoveRider(rider.id);
//                   }}
//                 >
//                   ✕
//                 </button>
//               )}
//               {selectedRider === rider.id && (
//                 <span className={styles.checkmark}>●</span>
//               )}
//             </div>
//           ))}

//           <div className={styles.orderOption}>
//             <span className={styles.orderIcon}>👥</span>
//             <span>order a trip for someone else</span>
//           </div>
//         </div>

//         <button className={styles.doneBtn} onClick={handleDone}>
//           Done
//         </button>
//       </div>
//     </Modal>
//   );
// }

// export default ChooseRider;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../../components/local/modal/modal";
import styles from "./chooseRider.module.css";

function ChooseRider({ isOpen, onClose, onRiderSelected }) {
  const navigate = useNavigate();

  const getCurrentUser = () => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error getting user data:", error);
      return null;
    }
  };

  const getUserName = () => {
    return localStorage.getItem("userName");
  };

  const user = getCurrentUser();

  const [selectedRider, setSelectedRider] = useState("me");
  const [riders, setRiders] = useState([
    {
      id: "me",
      name: user?.name || getUserName() || "You",
      phone: user?.phone || "",
      icon: "👤",
    },
    { id: "Gurpreet", name: "Gurpreet", phone: "9876543210", icon: "👤" },
    { id: "bittu", name: "Bittu", phone: "9876543211", icon: "👤" },
  ]);

  const handleRemoveRider = (id) => {
    if (id !== "me") {
      setRiders(riders.filter((rider) => rider.id !== id));
    }
  };

  const handleDone = () => {
    const selectedRiderData = riders.find(
      (rider) => rider.id === selectedRider
    );
    console.log("Selected rider:", selectedRiderData);

    if (onRiderSelected && selectedRiderData) {
      onRiderSelected({
        riderName: selectedRiderData.name,
        riderPhone: selectedRiderData.phone,
      });
    }

    onClose();
  };

  const handleAddNewRider = () => {
    onClose();
    //dekhta baad m
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Choose a rider</h2>

        <div className={styles.ridersList}>
          {riders.map((rider) => (
            <div
              key={rider.id}
              className={`${styles.riderItem} ${
                selectedRider === rider.id ? styles.selected : ""
              }`}
              onClick={() => setSelectedRider(rider.id)}
            >
              <div className={styles.riderInfo}>
                <span className={styles.icon}>{rider.icon}</span>
                <div className={styles.riderDetails}>
                  <span className={styles.name}>{rider.name}</span>
                  {rider.phone && (
                    <span className={styles.phone}>{rider.phone}</span>
                  )}
                </div>
              </div>
              {rider.id !== "me" && (
                <button
                  className={styles.removeBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveRider(rider.id);
                  }}
                >
                  ✕
                </button>
              )}
              {selectedRider === rider.id && (
                <span className={styles.checkmark}>✓</span>
              )}
            </div>
          ))}

          <div className={styles.orderOption} onClick={handleAddNewRider}>
            <span className={styles.orderIcon}>👥</span>
            <span>Add new rider</span>
          </div>
        </div>

        <button className={styles.doneBtn} onClick={handleDone}>
          Done
        </button>
      </div>
    </Modal>
  );
}

export default ChooseRider;
