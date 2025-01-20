import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { FaSun, FaMoon } from "react-icons/fa";
import UserDetail from "./pages/UserDetail";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <Router>
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <button
          onClick={toggleTheme}
          className={`fixed top-4 right-4 w-14 h-14 flex items-center justify-center rounded-full shadow-xl transition-transform duration-300 ease-in-out transform ${
            isDarkMode
              ? "bg-yellow-500 hover:bg-yellow-400 text-gray-900"
              : "bg-blue-500 hover:bg-blue-400 text-white"
          }`}
        >
          {isDarkMode ? (
            <FaSun size={28} className="animate-spin-slow" />
          ) : (
            <FaMoon size={28} />
          )}
        </button>

        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
          <Route
            path="/user/:id"
            element={<UserDetail isDarkMode={isDarkMode} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
