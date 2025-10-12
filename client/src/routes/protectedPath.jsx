import { useState, useEffect } from "react";
import LoginPopup from "../components/local/popUp/loginPopup.jsx";

function ProtectedPath({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
      setShowLoginPopup(false);
    } else {
      setIsAuthenticated(false);
      setShowLoginPopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    setShowLoginPopup(false);

    window.history.back();
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLoginPopup(false);
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {children}

      {showLoginPopup && (
        <LoginPopup
          isOpen={showLoginPopup}
          onClose={handleClosePopup}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}

export default ProtectedPath;
