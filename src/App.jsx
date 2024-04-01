import React from "react";
import { Routes, Route } from "react-router-dom";
import { getUserLogged, putAccessToken } from "./utils/network-data";
import LocaleContext from "./contexts/LocaleContext";
import Navigation from "./components/Navigation";

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
  const onLoginHandler = async ({ accessToken }) => {
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
              <Route path="/*" element={<p>login</p>} />
              <Route path="/register" element={<p>register</p>} />
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
            <Route path="/" element={<p>homepage</p>} />
            <Route path="/archived" element={<p>archivedpage</p>} />
            <Route path="/note/:id" element={<p>detailNote</p>} />
            <Route path="/note/add" element={<p>addpage</p>} />
            <Route path="*" element={<p>notfound</p>} />
          </Routes>
        </main>
      </div>
    </LocaleContext.Provider>
  );
}

export default App;
