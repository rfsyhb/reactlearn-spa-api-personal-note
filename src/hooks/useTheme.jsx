import { useState } from "react";

function useTheme(initialTheme = "light") {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || initialTheme
  );

  function toggleTheme() {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }

  return [theme, toggleTheme];
}

export default useTheme;
