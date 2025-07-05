// MUI core components for layout and structure
import {
  Card,
  Divider,
  Typography,
  Stack,
  Button,
  Box,
  ButtonGroup,
} from "@mui/material";

// MUI icons for dark/light theme toggle and result arrow
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SunnyIcon from "@mui/icons-material/Sunny";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

// MUI Date Picker components (used for selecting time)
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Access the current theme object (colors, spacing, etc.)
import { useTheme } from "@mui/material/styles";

// Internationalization hook for translations
import { useTranslation } from "react-i18next";

// Hook to manage language/direction
import { useLocaleLogic } from "../hooks/useLocaleLogic";

// Hook to manage time input and conversion
import { useTimeLogic } from "../hooks/useTimeLogic";

// Main UI component that uses theme, locale, and time logic
export default function BasicCard({ mode, changeTheme }) {
  const { t, i18n } = useTranslation();
  const theme = useTheme(); // Access current theme from MUI

  // Get language, direction, and handler from locale hook
  const { locale, direction, flexDir, handleLanguageClick } = useLocaleLogic();

  // Get time value, result, and handlers from time logic hook
  const { timeValue, convertedTime, handlePickerChange, convertTime } =
    useTimeLogic(t);

  // Wrap theme change logic from parent
  const handleThemeChange = (selectedMode) => {
    changeTheme(selectedMode); // Delegate to App-level theme logic
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card
        sx={{
          width: 420,
          p: 4,
          mx: "auto",
          mt: 4,
          borderRadius: "15px",
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.palette.shadows,
        }}
        dir={direction} // Apply text direction based on current locale
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction="row" alignItems="center">
            <img
              style={{ width: "30px", marginRight: "4px" }}
              src="./src/assets/icon/ChronoTool.svg"
              alt="ChronoTool"
              loading="lazy"
            />
            <Typography variant="h4">{t("ChronoTool")}</Typography>
          </Stack>

          {/* Language Switch Buttons */}
          <ButtonGroup
            size="small"
            color="secondary"
            sx={{ flexDirection: flexDir }}
          >
            <Button
              sx={{
                color:
                  locale === "en"
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
              }}
              value="en"
              onClick={handleLanguageClick} // Change to English
            >
              English
            </Button>
            <Button
              sx={{
                color:
                  locale === "ar"
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
              }}
              value="ar"
              onClick={handleLanguageClick} // Change to Arabic
            >
              العربية
            </Button>
          </ButtonGroup>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Time Picker Section */}
        <Box>
          <Typography variant="h6" sx={{ paddingBottom: 2 }}>
            {t("Convert Time from 24h to 12h")}
          </Typography>
          <Stack spacing={2}>
            <TimePicker
              sx={{
                ".MuiPickersInputBase-root ": {
                  flexDirection: flexDir, // Adjust input direction based on language
                },
              }}
              label={t("Select Time (24h)")}
              ampm={false}
              value={timeValue} // Current selected time
              onChange={handlePickerChange} // Handle time change
              slotProps={{
                textField: { fullWidth: true },
              }}
            />

            <Button
              variant="contained"
              onClick={() => convertTime(timeValue)} // Convert on click
            >
              {t("Convert")}
            </Button>
          </Stack>
        </Box>

        {/* Result Display */}
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <ArrowRightAltIcon
            sx={{
              color: theme.palette.primary.main,
              mr: 1,
              fontSize: 32,
              transform:
                locale === "en" ? "none" : "rotate(180deg) translateX(-6px)", // Flip arrow in RTL
            }}
          />
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: "normal",
            }}
          >
            {convertedTime} {/* Show converted result */}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Theme Toggle Section */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ButtonGroup
            size="small"
            color="secondary"
            sx={{ flexDirection: flexDir }}
          >
            <Button
              onClick={() => handleThemeChange("dark")} // Switch to dark mode
              sx={{ borderRadius: "16px" }}
            >
              <DarkModeIcon
                sx={{
                  color:
                    mode === "dark"
                      ? theme.palette.secondary.main
                      : theme.palette.primary.main,
                }}
              />
            </Button>
            <Button
              onClick={() => handleThemeChange("light")} // Switch to light mode
              sx={{ borderRadius: "16px" }}
            >
              <SunnyIcon
                sx={{
                  color:
                    mode === "light"
                      ? theme.palette.secondary.main
                      : theme.palette.primary.main,
                }}
              />
            </Button>
          </ButtonGroup>
        </Box>
      </Card>
    </LocalizationProvider>
  );
}
