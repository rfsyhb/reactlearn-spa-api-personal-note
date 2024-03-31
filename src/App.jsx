import React from "react";
import { Routes, Route } from "react-router-dom";
import { getUserLogged, putAccessToken } from "./utils/network-data";
import LocaleContext from "./contexts/LocaleContext";

function App() {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);
  const [language, setLanguage] = React.useState("id");
  const [darkMode, setDarkMode] = React.useState(false);

  // setLanguage
  const toggleLanguage = () => {
    setLanguage((prevLanguage) => {
      return prevLanguage === "id" ? "en" : "id";
    });
  };

  // setDarkMode
  const toggleDark = () => {
    setDarkMode((prevDarkMode) => {
      return prevDarkMode === false ? true : false;
    });
  };

  const contextValues = React.useMemo(() => {
    return {
      language,
      toggleLanguage,
      darkMode,
      toggleDark,
    };
  }, [language, darkMode]);

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
          <header></header>
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
