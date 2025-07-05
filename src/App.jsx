import "./App.css";
import MainContent from "./components/MainContent";
import { ThemeProvider } from "@mui/material/styles";
import { Container, Box } from "@mui/material";

// Hook to manage theme mode (light/dark)
import { useThemeLogic } from "./hooks/useThemeLogic"; 

function App() {
  // Use custom hook to get current mode, theme object, and theme change function
  const { mode, currentTheme, changeTheme } = useThemeLogic();

  return (
    // Provide the selected theme to all child components
    <ThemeProvider theme={currentTheme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          minWidth: "100vw",
        }}
      >
        <Container maxWidth="md">
          {/* Pass theme mode and theme toggle function to child component */}
          <MainContent changeTheme={changeTheme} mode={mode} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
