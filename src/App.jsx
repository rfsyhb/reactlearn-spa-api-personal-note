import React from "react";
import useLocale from "./hooks/useLocale";
import useTheme from "./hooks/useTheme";

function App() {
  // inti App
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitialziing] = React.useState(true);

  // useContext: language / theme
  const [locale, toggleLocale] = useLocale();
  const [theme, toggleTheme] = useTheme();
}

export default App;
