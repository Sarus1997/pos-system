import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    settings: "Settings",
    theme: "Theme",
    theme_light: "Light",
    theme_dark: "Dark",
    language: "Language",
  },
  th: {
    settings: "การตั้งค่า",
    theme: "ธีม",
    theme_light: "สว่าง",
    theme_dark: "มืด",
    language: "ภาษา",
  }
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
