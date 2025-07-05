import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend) // Load translations using HTTP
  .use(LanguageDetector) // Detect user language from browser/localStorage
  .use(initReactI18next) // Bind react-i18next to i18n instance
  .init({
    fallbackLng: "en", // Use English if translation not found
    debug: false, // Disable console debug logs
    interpolation: {
      escapeValue: false, // React already escapes
    },
    backend: {
      // Path to your public folder
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/translation.json`,
    },
  });

export default i18n;
