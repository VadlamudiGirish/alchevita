import { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

const ThemeContext = createContext();

export const themes = {
  light: {
    background: "#FFFFFF",
    surface: "#D7FBE8",
    text: "#0E6F5D",
    primary: "#1FAB89",
    secondary: "#62D2A2",
    danger: {
      background: "#f8d7da",
      text: "#e20a40",
      border: "#eb979f",
      hoverBg: "#f1c0c4",
    },
    disabled: "#92a29f",
    modalOverlay: "rgba(0, 0, 0, 0.4)",
    cardBg: "#D7FBE8",
  },
  dark: {
    background: "#1a1a1a",
    surface: "#2d2d2d",
    text: "#e0e0e0",
    primary: "#1FAB89",
    secondary: "#62D2A2",
    danger: {
      background: "#3f1f1f",
      text: "#ff4d4d",
      border: "#662929",
      hoverBg: "#4d2626",
    },
    disabled: "#666666",
    modalOverlay: "rgba(0, 0, 0, 0.6)",
    cardBg: "#2d2d2d",
  },
};

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setIsDarkMode(savedTheme === "dark");
      } else {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setIsDarkMode(prefersDark);
      }
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme ? "dark" : "light");
      }
      return newTheme;
    });
  };

  const theme = isDarkMode ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
