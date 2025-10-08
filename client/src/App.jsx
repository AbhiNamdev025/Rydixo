import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./pages/homepage/homePage";
import AppRoutes from "./routes/appRoutes";
function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
