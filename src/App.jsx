import React from "react";
import useLocale from "./hooks/useLocale";
import useTheme from "./hooks/useTheme";
import * as NetworkData from "./api/network-data";
import AppContext from "./contexts/AppContext";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ArchivedPage from "./pages/ArchivedPage";
import NavigationBar from "./components/NavigationBar";
import DetailPage from "./pages/DetailPage";

function App() {
  // App state
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitialziing] = React.useState(true);

  // useContext: custom hooks for language / theme
  const [locale, toggleLocale] = useLocale();
  const [theme, toggleTheme] = useTheme();

  // useContext: useMemo
  const contextValues = React.useMemo(() => {
    return { locale, toggleLocale, theme, toggleTheme };
  }, [locale, theme, toggleLocale, toggleTheme]);

  // Login Success
  async function onLoginSuccessHandler({ accessToken }) {
    NetworkData.putAccessToken(accessToken);
    const { data } = await NetworkData.getUserLogged();

    setAuthedUser(data);
  }

  // User Logout
  function onLogoutHandler() {
    setAuthedUser(null);
    NetworkData.putAccessToken("");
  }

  // Fetch data user yang login
  React.useEffect(() => {
    const fetchUser = async () => {
      const { data } = await NetworkData.getUserLogged();
      setAuthedUser(data);
      setInitialziing(false);
    };

    fetchUser();
  }, []);

  // Merubah theme setiap state berubah
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Saat loading
  if (initializing) {
    // return null;
    return <p>initializing data</p>;
  }

  // Jika user belum authenticate
  if (authedUser === null) {
    return (
      <AppContext.Provider value={contextValues}>
        <div className="app-container">
          <header></header>
          <main>
            <Routes>
              <Route path="/*" element={<LoginPage onLoginSuccess={onLoginSuccessHandler} />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
      </AppContext.Provider>
    );
  }

  // User authenticated
  return (
    <AppContext.Provider value={contextValues}>
      <div className="app-container">
        <header>
          <h1>
            <Link to="/">{locale === "id" ? "Aplikasi Catatan" : "Notes App"}</Link>
          </h1>
          <NavigationBar logout={onLogoutHandler} name={authedUser.name}/>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/archived" element={<ArchivedPage />} />
            <Route path="/notes/:id" element={<DetailPage />} />
            <Route path="/note/add" element={<p>Register</p>} />
            <Route path="/*" element={<p>notfound</p>} />
          </Routes>
        </main>
      </div>
    </AppContext.Provider>
  );
}

export default App;
