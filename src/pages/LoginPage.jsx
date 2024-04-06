/*
? LoginPage
- handlers
  - login to API (for: LoginInput)
- child
  - LoginInput
*/

import * as NetworkData from "../api/network-data";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LoginInput from "../components/LoginInput";

function LoginPage({ onLoginSuccess }) {
  async function onLogin({ email, password }) {
    const { error, data } = await NetworkData.login({ email, password });

    // error merupakan boolean
    if (!error) {
      // memanggil onLoginSuccessHandler
      // untuk mengambil key-value {accessToken} dalam object data
      // onLoginSuccessHandler({ accessToken })
      onLoginSuccess(data);
    }
  }

  return (
    <div className="login-page">
      <h2>Autentikasi untuk melanjutkan</h2>
      <LoginInput onLogin={onLogin} />
      <p>
        Belum memiliki akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </div>
  );
}

LoginPage.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
