import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

function LoginInput({ onLogin }) {
  // * dokumentasi API: /login
  // request body
  // "name" as string
  // "email" as string
  const [email, onEmailChangeHandler] = useInput("");
  const [password, onPasswordChangeHandler] = useInput("");

  function onSubmitFormHandler(event) {
    event.preventDefault();

    onLogin({ email, password });
  }

  return (
    <form className="input-login" onSubmit={onSubmitFormHandler}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="masukkan email anda"
        value={email}
        onChange={onEmailChangeHandler}
        autoComplete="off"
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="masukkan password anda"
        value={password}
        onChange={onPasswordChangeHandler}
      />
      <button>Login</button>
    </form>
  );
}

LoginInput.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginInput;
