import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/homepage/homePage";
import AboutPage from "../pages/aboutpage/aboutPage";
import ContactPage from "../pages/contactpage/contactPage";
import LoginForm from "../auth/login/loginForm";
import SignUpForm from "../auth/signup/signup";
import ForgotPassword from "../components/local/formactions/forgotpass/forgotpass";
import ResetPassword from "../components/local/formactions/resetpass/resetpass";
import BookRide from "../pages/bookride/bookRide";
import VerificationCode from "../components/local/formactions/verification/verification";
import GoogleAuthCallback from "../auth/googleAuth/googleAuthCallback";
import ProtectedPath from "./protectedPath";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route
        path="book-ride"
        element={
          <ProtectedPath>
            <BookRide />
          </ProtectedPath>
        }
      />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/verification" element={<VerificationCode />} />
      <Route path="/auth/google/success" element={<GoogleAuthCallback />} />
    </Routes>
  );
};

export default AppRoutes;
