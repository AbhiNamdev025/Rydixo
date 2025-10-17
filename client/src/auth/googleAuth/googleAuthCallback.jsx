import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function GoogleAuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    // Get all parameters
    const token = query.get("token");
    const name = query.get("name");
    const email = query.get("email");
    const userId = query.get("userId");
    const id = query.get("id");
    const _id = query.get("_id");

    console.log("🔍 Debug - All URL parameters:", {
      token,
      name,
      email,
      userId,
      id,
      _id,
      fullURL: window.location.href,
      searchString: location.search,
    });

    if (token && name) {
      const userIdentifier = userId || id || _id;

      localStorage.setItem("token", token);
      localStorage.setItem("userName", name);

      const userData = {
        _id: userIdentifier,
        name: name,
        email: email || "",
      };
      localStorage.setItem("user", JSON.stringify(userData));

      console.log("Google Auth Success ", userData);
      navigate("/");
      toast.success("Login successful");
    } else {
      console.log(" Google Auth Failed ");
      navigate("/login");
      toast.error("Authentication failed. Please try again.");
    }
  }, [location, navigate]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <p>Processing Google login...</p>
      <p>Check console for debug information</p>
    </div>
  );
}

export default GoogleAuthCallback;
