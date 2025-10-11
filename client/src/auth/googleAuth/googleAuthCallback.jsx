import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function GoogleAuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const name = query.get("name");

    if (token && name) {
      localStorage.setItem("token", token);
      localStorage.setItem("userName", name);
      navigate("/");
      toast.success("Login successfull");
    } else {
      navigate("/login");
      toast.error("Try Again");
    }
  }, [location, navigate]);

  return <p>Logging in...</p>;
}

export default GoogleAuthCallback;
