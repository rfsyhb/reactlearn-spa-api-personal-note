import React from "react";
import LoginInput from "../components/LoginInput";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { login } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";

function LoginPage({ loginSuccess }) {
  const { locale } = React.useContext(LocaleContext);
  const onLogin = async ({ email, password }) => {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  };

  return (
    <div className="login-page">
      <h2>
        {locale === "id"
          ? "Autentikasi untuk melanjutkan..."
          : "Authenthicate before continue..."}
      </h2>
      <LoginInput login={onLogin} />
      {locale === "id" ? (
        <p>
          Belum memiliki akun? <Link to="/register">Daftar di sini</Link>
        </p>
      ) : (
        <p>
          Does not have account? <Link to="/register">Register here</Link>
        </p>
      )}
    </div>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
