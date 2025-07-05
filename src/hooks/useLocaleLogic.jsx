import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

//  Custom hook to manage language/locale switching
export function useLocaleLogic() {
  // Get translation functions from i18next
  const { i18n, t } = useTranslation();

  // Load saved language from localStorage or default to "en"
  const [locale, setLocale] = useState(localStorage.getItem("lang") || "en");

  // Set text direction based on selected language
  const direction = locale === "ar" ? "rtl" : "ltr";

  // Set flex direction for UI layout (e.g., button groups)
  const flexDir = locale === "ar" ? "row-reverse" : "row";

  // Handle language switch on button click
  const handleLanguageClick = (event) => {
    const selectedLanguage = event.target.value;

    // Only update if language has changed
    if (selectedLanguage !== locale) {
      setLocale(selectedLanguage); // Update local state
      // i18n.changeLanguage(selectedLanguage); // Change i18n language
      localStorage.setItem("lang", selectedLanguage); // Save to localStorage
    }
  };

  // Update i18n when locale changes
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // Return all needed values and handlers
  return { locale, direction, flexDir, handleLanguageClick, t };
}
