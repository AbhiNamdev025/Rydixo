import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/homepage/homePage";
import AboutPage from "../pages/aboutpage/aboutPage";
import ContactPage from "../pages/contactpage/contactPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
       <Route path="/contact" element={<ContactPage/>} />
    </Routes>
  );
};

export default AppRoutes;
