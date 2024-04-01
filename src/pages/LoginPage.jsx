import LoginInput from "../components/LoginInput";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { login } from "../utils/network-data";

function LoginPage({ loginSuccess }) {
  const onLogin = async ({ email, password }) => {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  };

  return (
    <div className="login-page">
      <h2>Silahkan masuk untuk melanjutkan ...</h2>
      <LoginInput login={onLogin} />
      <p>
        Belum memiliki akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </div>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
