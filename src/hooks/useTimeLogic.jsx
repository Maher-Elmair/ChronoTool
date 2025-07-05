import { useState, useEffect } from "react";

// Custom hook to manage 24h → 12h time conversion
export function useTimeLogic(t) {
  // Store the selected time value from the picker
  const [timeValue, setTimeValue] = useState(null);

  // Store the converted time in 12-hour format
  const [convertedTime, setConvertedTime] = useState(`00:00 ${t("AM")}`);

  // Convert a Day.js time value to 12-hour format
  const convertTime = (value) => {
    if (!value) {
      // If value is null, reset to default 12 AM
      setConvertedTime(`00:00 ${t("AM")}`);
      return;
    }

    // Get hour and minute from the time object
    const hour = value.hour();
    const minute = value.minute();

    // Handle invalid hour (like empty input with minutes)
    if ((hour === 0 || isNaN(hour)) && minute > 0) {
      setConvertedTime(`${t("Invalid")}`);
      return;
    }

    // Convert hour to 12-hour format
    const hour12 = hour % 12 || 12;

    // Format minutes to always be two digits
    const minuteFormatted = (minute || 0).toString().padStart(2, "0");

    // Determine if it's AM or PM
    const period = hour < 12 || hour === 24 ? t("AM") : t("PM");

    // Set the final formatted time
    setConvertedTime(`${hour12}:${minuteFormatted} ${period}`);
  };

  // Handle time picker change event
  const handlePickerChange = (newValue) => {
    setTimeValue(newValue);      // Save the new time
    convertTime(newValue);       // Convert it to 12h format
  };
  // Re-run conversion when language changes (to update AM/PM text)
  useEffect(() => {
    convertTime(timeValue);
  }, [t]); // ← dependency is t()

  // Return time state and handlers
  return { timeValue, convertedTime, handlePickerChange, convertTime };
}
