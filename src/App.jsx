import React from "react";
import { Routes, Route } from "react-router-dom";
import { getUserLogged, putAccessToken } from "./utils/network-data";
import LocaleContext from "./contexts/LocaleContext";
import Navigation from "./components/Navigation";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import ArchivedPage from "./pages/ArchivedPage";

function App() {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  const [locale, setLocale] = React.useState(
    localStorage.getItem("locale") || "id"
  );
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") || "light"
  );

  // setLocale
  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);
      return newLocale;
    });
  };

  // setTheme
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const contextValues = React.useMemo(() => {
    return {
      locale,
      toggleLocale,
      theme,
      toggleTheme,
    };
  }, [locale, theme]);

  // login sukses
  const onLoginSuccessHandler = async ({ accessToken }) => {
    // menaruh token ke localStorage
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    setAuthedUser(data);
  };

  // user logout
  const onLogoutHandler = () => {
    setAuthedUser(null);

    // reset token pada localStorage
    putAccessToken("");
  };

  // ketika component telah di-load untuk pertama kali
  React.useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    };

    fetchUser();
  }, []);

  if (initializing) {
    return null;
  }

  // belum authed
  if (authedUser === null) {
    return (
      <LocaleContext.Provider value={contextValues}>
        <div className="app-container">
          <header>
            <h1>Notes App</h1>
            {/* <Navigation logout={onLogoutHandler} name={authedUser.name}/> */}
          </header>
          <main>
            <Routes>
              <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccessHandler} />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
      </LocaleContext.Provider>
    );
  }

  // user authed
  return (
    <LocaleContext.Provider value={contextValues}>
      <div className="app-container">
        <header>
          <h1>Notes App</h1>
          <Navigation logout={onLogoutHandler} name={authedUser.name} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/archived" element={<ArchivedPage />} />
            <Route path="/notes/:id" element={<DetailPage />} />
            <Route path="/note/add" element={<p>addpage</p>} />
            <Route path="*" element={<p>notfound</p>} />
          </Routes>
        </main>
      </div>
    </LocaleContext.Provider>
  );
}

export default App;
