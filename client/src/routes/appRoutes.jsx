import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/homepage/homePage";
import AboutPage from "../pages/aboutpage/aboutPage";
import ContactPage from "../pages/contactpage/contactPage";
import LoginForm from "../auth/login/loginForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
};

export default AppRoutes;
