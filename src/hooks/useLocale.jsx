import { useState } from "react";

function useLocale(initialLocale = "id") {
  const [locale, setLocale] = useState(
    localStorage.getItem("locale") || initialLocale
  );

  function toggleLocale() {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);
      return newLocale;
    });
  }

  return [locale, toggleLocale];
}

export default useLocale;
