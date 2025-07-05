import { createTheme } from "@mui/material/styles";

export const theme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: {
              default: "#f2f4f7", // Full page background
              paper: "#ffffff", // Cards and content areas
            },
            text: {
              primary: "#1c1c1e", // Main text color (dark)
            },
            primary: {
              main: "#6c63ff", // Primary violet color
              contrastText: "#ffffff", // Text inside primary buttons
            },
            secondary: {
              main: "#a29bfe", // Lighter violet shade
              contrastText: "#ffffff", // Text inside secondary buttons
            },
            action: {
              hover: "#5a53e0", // Slightly darker violet for hover
              focus: "#4b45c7", // Even darker for focus
            },
            shadows: ["none", "0px 2px 6px rgba(0, 0, 0, 0.06)"], // Soft shadow
          }
        : {
            background: {
              default: "#0f1115", // Full page background (dark mode)
              paper: "#1a1c22", // Cards and containers (dark mode)
            },
            text: {
              primary: "#f5f5f5", // Light text for dark background
            },
            primary: {
              main: "#6c63ff", // Same primary violet
              contrastText: "#0f1115", // Text on violet in dark mode
            },
            secondary: {
              main: "#9e90ffad", // Softer violet
              contrastText: "#1a1c22", // Text on secondary buttons
            },
            action: {
              hover: "#5a53e0", // Hover color for buttons
              focus: "#4b45c7", // Focus color for buttons
            },
            shadows: ["none", "0px 2px 6px rgba(255, 255, 255, 0.03)"], // Soft shadow in dark mode
          }),
    },
    typography: {
      fontFamily: `"Tajawal", sans-serif`, // Custom Arabic-friendly font
    },
  });
