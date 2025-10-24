import React, { useState, useEffect } from "react";
import { Star, Edit, Check, X, Car, Circle } from "lucide-react";
import styles from "./Profile.module.css";
import { FaStar } from "react-icons/fa";
import { BASE_URL_DRIVER } from "../../../../const/const";

const Profile = () => {
  const [driverData, setDriverData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [formData, setFormData] = useState({});
  const [updateStatus, setUpdateStatus] = useState({ type: "", message: "" });
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    fetchDriverData();
  }, []);

  const fetchDriverData = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const payload = JSON.parse(atob(token.split(".")[1]));
      const driverId = payload.id || payload.userId || payload._id;

      const response = await fetch(`${BASE_URL_DRIVER}/find/${driverId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDriverData(data);
        setFormData(data);
        setIsOnline(data.status === "online");
      }
    } catch (err) {
      console.error("Error fetching driver data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (section) => {
    setEditSection(section);
    setIsEditing(true);
    setUpdateStatus({ type: "", message: "" });
  };

  const handleSave = async () => {
    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token || !driverData?._id) return;

      setUpdateStatus({ type: "loading", message: "Updating profile..." });

      const updateData = {
        [editSection]: formData[editSection],
      };

      const response = await fetch(
        `${BASE_URL_DRIVER}/update/${driverData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setDriverData(updatedData);
        setIsEditing(false);
        setEditSection(null);
        setUpdateStatus({
          type: "success",
          message: "Profile updated successfully!",
        });

        setTimeout(() => {
          setUpdateStatus({ type: "", message: "" });
        }, 3000);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating driver:", error);
      setUpdateStatus({
        type: "error",
        message: "Update failed. Please try again.",
      });
    }
  };
  const handleOnlineToggle = async () => {
    const newStatus = isOnline ? "offline" : "online";
    setIsOnline(!isOnline);

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token || !driverData?._id) return;

      await fetch(`${BASE_URL_DRIVER}/status/${driverData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditSection(null);
    setFormData(driverData);
    setUpdateStatus({ type: "", message: "" });
  };

  const handleInputChange = (e, section, field) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleDateChange = (e, section, field) => {
    const value = e.target.value;
    const dateValue = value ? new Date(value).toISOString() : "";

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: dateValue,
      },
    }));
  };
  //gpt hlp

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading profile...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Status Message */}
      {updateStatus.message && (
        <div className={`${styles.statusMessage} ${styles[updateStatus.type]}`}>
          {updateStatus.message}
        </div>
      )}

      {/* Header Section */}

      <div className={styles.header}>
        <div className={styles.driverInfo}>
          <div className={styles.driverDetails}>
            <div className={styles.mainData}>
              <div>
                <div className={styles.avatar}>
                  {driverData?.name?.charAt(0).toUpperCase() || "D"}
                </div>
              </div>
              <div className={styles.driverName}>
                <h1 className={styles.name}>{driverData?.name || "Driver"}</h1>
                <p className={styles.rating}>
                  <FaStar color="#ffff00" />
                  <FaStar color="#ffff00" />
                  <FaStar color="#ffff00" />
                  <FaStar color="#ffff00" />
                  <FaStar color="#ccc" />
                </p>
              </div>
            </div>
            <div className={styles.employeeInfo}>
              <div className={styles.employeeType}>
                <h2 className={styles.employeeType}> Employee Type </h2>
                <p className={styles.employeeType}>Full Time Employee</p>
              </div>
              <div className={styles.onlineStatus}>
                <label>{isOnline ? "Online" : "Offline"}</label>
                <div className={styles.toggleSwitch}>
                  <input
                    type="checkbox"
                    checked={isOnline}
                    onChange={handleOnlineToggle}
                  />
                  <span className={styles.slider}></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.header}>
        <div className={styles.agreementSection}>
          <div>
            <div className={styles.agreementHeader}>
              <h3 className={styles.agreementTitle}>Annual agreement update</h3>
              <span className={styles.agreementBadge}>New</span>
            </div>
            <p className={styles.agreementText}>
              Don't forgot to send a new version of the agreement to be signed.
            </p>
          </div>
          <div className={styles.agreementActions}>
            <button className={styles.btnUpload}>Upload</button>
            <button className={styles.btnDone}>Done</button>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {/* Personal Information Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Personal Information</h2>
            <button
              className={styles.btnEdit}
              onClick={() => handleEdit("personal_info")}
              disabled={isEditing && editSection !== "personal_info"}
            >
              <Edit size={16} />
            </button>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Date Of Birth</span>
              {isEditing && editSection === "personal_info" ? (
                <input
                  type="date"
                  className={styles.input}
                  value={formatDateForInput(
                    formData.personal_info?.date_of_birth
                  )}
                  onChange={(e) =>
                    handleDateChange(e, "personal_info", "date_of_birth")
                  }
                />
              ) : (
                <span className={styles.infoValue}>
                  {formatDate(driverData?.personal_info?.date_of_birth) ||
                    "12 May 1999"}
                </span>
              )}
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Gender</span>
              {isEditing && editSection === "personal_info" ? (
                <select
                  className={styles.select}
                  value={formData.personal_info?.gender || ""}
                  onChange={(e) =>
                    handleInputChange(e, "personal_info", "gender")
                  }
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <span className={styles.infoValue}>
                  {driverData?.personal_info?.gender || "Male"}
                </span>
              )}
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Contact No.</span>
              {isEditing && editSection === "personal_info" ? (
                <input
                  type="tel"
                  className={styles.input}
                  value={formData.personal_info?.contact_number || ""}
                  onChange={(e) =>
                    handleInputChange(e, "personal_info", "contact_number")
                  }
                />
              ) : (
                <span className={styles.infoValue}>
                  {driverData?.personal_info?.contact_number || "9998856731"}
                </span>
              )}
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email Address</span>
              <span className={styles.infoValue}>
                {driverData?.email || "rahul.rydixo@gmail.com"}
              </span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Permanent Address</span>
              {isEditing && editSection === "personal_info" ? (
                <textarea
                  className={styles.textarea}
                  value={formData.personal_info?.permanent_address || ""}
                  onChange={(e) =>
                    handleInputChange(e, "personal_info", "permanent_address")
                  }
                  rows="3"
                />
              ) : (
                <span className={styles.infoValue}>
                  {driverData?.personal_info?.permanent_address ||
                    "#123, street no.5, sector 32,chandigarh"}
                </span>
              )}
            </div>
          </div>

          {isEditing && editSection === "personal_info" && (
            <div className={styles.editActions}>
              <button className={styles.btnSave} onClick={handleSave}>
                <Check size={16} />
                Save
              </button>
              <button className={styles.btnCancel} onClick={handleCancel}>
                <X size={16} />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Bank Details Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Bank Detail</h2>
            <button
              className={styles.btnEdit}
              onClick={() => handleEdit("bank_details")}
              disabled={isEditing && editSection !== "bank_details"}
            >
              <Edit size={16} />
            </button>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Bank Account Holder Name</span>
              {isEditing && editSection === "bank_details" ? (
                <input
                  type="text"
                  className={styles.input}
                  value={formData.bank_details?.account_holder_name || ""}
                  onChange={(e) =>
                    handleInputChange(e, "bank_details", "account_holder_name")
                  }
                />
              ) : (
                <span className={styles.infoValue}>
                  {driverData?.bank_details?.account_holder_name || "Rahul"}
                </span>
              )}
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Account Number</span>
              {isEditing && editSection === "bank_details" ? (
                <input
                  type="text"
                  className={styles.input}
                  value={formData.bank_details?.account_number || ""}
                  onChange={(e) =>
                    handleInputChange(e, "bank_details", "account_number")
                  }
                />
              ) : (
                <span className={styles.infoValue}>
                  {driverData?.bank_details?.account_number || "1234567890"}
                </span>
              )}
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>IFSC Code</span>
              {isEditing && editSection === "bank_details" ? (
                <input
                  type="text"
                  className={styles.input}
                  value={formData.bank_details?.ifsc_code || ""}
                  onChange={(e) =>
                    handleInputChange(e, "bank_details", "ifsc_code")
                  }
                />
              ) : (
                <span className={styles.infoValue}>
                  {driverData?.bank_details?.ifsc_code || "SBI1234"}
                </span>
              )}
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Bank & Branch Name</span>
              {isEditing && editSection === "bank_details" ? (
                <input
                  type="text"
                  className={styles.input}
                  value={formData.bank_details?.bank_name || ""}
                  onChange={(e) =>
                    handleInputChange(e, "bank_details", "bank_name")
                  }
                />
              ) : (
                <span className={styles.infoValue}>
                  {driverData?.bank_details?.bank_name || "XYZ"}
                </span>
              )}
            </div>
          </div>

          <div className={styles.uploadSection}>
            <button className={styles.btnUploadDocument}>
              <span>Upload Bank Account Detail</span>
              <span className={styles.uploadIcon}>▲</span>
            </button>
          </div>

          {isEditing && editSection === "bank_details" && (
            <div className={styles.editActions}>
              <button className={styles.btnSave} onClick={handleSave}>
                <Check size={16} />
                Save
              </button>
              <button className={styles.btnCancel} onClick={handleCancel}>
                <X size={16} />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.content}>
        {/* Identification Documents Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Identification Documents</h2>

          <div className={styles.documentsList}>
            <div className={styles.documentItem}>
              <span className={styles.documentLabel}>Driving Licence</span>
              <span className={styles.documentValue}>
                {driverData?.identification_documents?.driving_licence ||
                  "12 May 1999"}
              </span>
            </div>

            <div className={styles.documentItem}>
              <span className={styles.documentLabel}>Aadhaar Card</span>
              <span className={styles.documentValue}>***********</span>
            </div>

            <div className={styles.documentItem}>
              <span className={styles.documentLabel}>Pan Card</span>
              <span className={styles.documentValue}>***********</span>
            </div>

            <div className={styles.documentItem}>
              <span className={styles.documentLabel}>RC Number</span>
              <span className={styles.documentValue}>***********</span>
            </div>
          </div>

          <div className={styles.uploadSection}>
            <h3 className={styles.uploadTitle}>Document Upload</h3>
            <div className={styles.uploadButtons}>
              <button className={styles.btnUploadDocument}>
                <span>Upload Driving License</span>
                <span className={styles.uploadIcon}>▲</span>
              </button>
              <button className={styles.btnUploadDocument}>
                <span>Upload Aadhaar Card</span>
                <span className={styles.uploadIcon}>▲</span>
              </button>
              <button className={styles.btnUploadDocument}>
                <span>Upload Pan Card</span>
                <span className={styles.uploadIcon}>▲</span>
              </button>
              <button className={styles.btnUploadDocument}>
                <span>Upload RC</span>
                <span className={styles.uploadIcon}>▲</span>
              </button>
            </div>
          </div>
        </div>

        {/* Vehicle Details Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Vehicle Details</h2>
            <button
              className={styles.btnEdit}
              onClick={() => handleEdit("vehicle_details")}
              disabled={isEditing && editSection !== "vehicle_details"}
            >
              <Edit size={16} />
            </button>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Vehicle Name and Year</span>
              {isEditing && editSection === "vehicle_details" ? (
                <div className={styles.vehicleInputs}>
                  <input
                    type="text"
                    className={styles.vehicleInput}
                    placeholder="Vehicle Name"
                    value={formData.vehicle_details?.vehicle_name || ""}
                    onChange={(e) =>
                      handleInputChange(e, "vehicle_details", "vehicle_name")
                    }
                  />
                  <input
                    type="number"
                    className={styles.vehicleInput}
                    placeholder="Year"
                    value={formData.vehicle_details?.vehicle_year || ""}
                    onChange={(e) =>
                      handleInputChange(e, "vehicle_details", "vehicle_year")
                    }
                  />
                </div>
              ) : (
                <span className={styles.infoValue}>
                  {driverData?.vehicle_details?.vehicle_name &&
                  driverData?.vehicle_details?.vehicle_year
                    ? `${driverData.vehicle_details.vehicle_name} & ${driverData.vehicle_details.vehicle_year}`
                    : "Etios & 2024"}
                </span>
              )}
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Vehicle Number</span>
              {isEditing && editSection === "vehicle_details" ? (
                <input
                  type="text"
                  className={styles.input}
                  value={formData.vehicle_details?.vehicle_number || ""}
                  onChange={(e) =>
                    handleInputChange(e, "vehicle_details", "vehicle_number")
                  }
                />
              ) : (
                <span className={styles.infoValue}>
                  {driverData?.vehicle_details?.vehicle_number || "Hr-00-1657"}
                </span>
              )}
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Seat Availability</span>
              {isEditing && editSection === "vehicle_details" ? (
                <input
                  type="number"
                  className={styles.input}
                  value={formData.vehicle_details?.seat_availability || ""}
                  onChange={(e) =>
                    handleInputChange(e, "vehicle_details", "seat_availability")
                  }
                />
              ) : (
                <span className={styles.infoValue}>
                  {driverData?.vehicle_details?.seat_availability
                    ? `${driverData.vehicle_details.seat_availability} seater`
                    : "5 seater"}
                </span>
              )}
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>RC Validity</span>
              {isEditing && editSection === "vehicle_details" ? (
                <input
                  type="text"
                  className={styles.input}
                  value={formData.vehicle_details?.rc_validity || ""}
                  onChange={(e) =>
                    handleInputChange(e, "vehicle_details", "rc_validity")
                  }
                />
              ) : (
                <span className={styles.infoValue}>
                  {driverData?.vehicle_details?.rc_validity || "Validunit"}
                </span>
              )}
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Insurance Details</span>
              {isEditing && editSection === "vehicle_details" ? (
                <input
                  type="date"
                  className={styles.input}
                  value={formatDateForInput(
                    formData.vehicle_details?.insurance_details
                  )}
                  onChange={(e) =>
                    handleDateChange(e, "vehicle_details", "insurance_details")
                  }
                />
              ) : (
                <span className={styles.infoValue}>
                  {formatDate(driverData?.vehicle_details?.insurance_details) ||
                    "21-Dec-2025"}
                </span>
              )}
            </div>
          </div>

          <section className={styles.vehicleCard}>
            <div className={styles.vehicleHeader}>
              <div className={styles.vehicleHeaderLeft}>
                <Car size={18} className={styles.vehicleIcon} />
                <h3>Vehicle</h3>
              </div>
              <span className={styles.activeBadge}>
                Active
                <Circle
                  size={8}
                  fill="#4caf50"
                  className={styles.activeIndicator}
                />
              </span>
            </div>
            <div className={styles.vehicleInfo}>
              <div className={styles.vehicleData}>
                <h4>{driverData?.vehicle_details?.vehicle_name || "Etios"}</h4>
                <p className={styles.vehicleNumber}>
                  {driverData?.vehicle_details?.vehicle_number || "HR 09-2026"}
                </p>
                <p className={styles.fuelType}>Petrol</p>
              </div>
              <div className={styles.vehicleImage}>
                <img
                  src="https://www.group1mahindra.co.za/wp-content/uploads/mahindra-scorpio-n-review.jpg"
                  className={styles.carImage}
                  alt="Vehicle"
                />
              </div>
            </div>
          </section>

          {isEditing && editSection === "vehicle_details" && (
            <div className={styles.editActions}>
              <button className={styles.btnSave} onClick={handleSave}>
                <Check size={16} />
                Save
              </button>
              <button className={styles.btnCancel} onClick={handleCancel}>
                <X size={16} />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
