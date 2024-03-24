import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "screens/login";

const NonLoggedNavigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
      </Routes>
    </Router>
  );
};

export default NonLoggedNavigation;
