// src/ThemeContext.js
import React, { createContext, useState, useContext } from "react";

// Create a context for theme management
const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Default mode is light

  // Toggle theme between light and dark modes
  const toggleTheme = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easy access to the context
export const useTheme = () => {
  return useContext(ThemeContext);
};
