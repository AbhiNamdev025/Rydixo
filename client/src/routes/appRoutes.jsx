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
import PrivacyPolicy from "../components/global/footer/components/privacypolicy/privacyPolicy";
import TermsAndConditions from "../components/global/footer/components/terms/terms";
import RefundPolicy from "../components/global/footer/components/refund/refundPolicy";
import Help from "../components/local/help/help";
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

      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
      <Route path="/help" element={<Help />} />
    </Routes>
  );
};

export default AppRoutes;
