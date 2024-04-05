import useInput from "../hooks/useInput";
import PropTypes from "prop-types";

function RegisterInput({ onRegister }) {
  // * dokumentasi API: /register
  // request body
  // "name" as string
  // "email" as string, must be unique
  // "password" as string, must be at least 6 char
  const [name, onNameChangeHandler] = useInput("");
  const [email, onEmailChangeHandler] = useInput("");
  const [password, onPasswordChangeHandler] = useInput("");

  function onSubmitFormHandler(event) {
    event.preventDefault();

    // function yang berasal dari network-data
    // async function register({ name, email, password })
    onRegister({ name, email, password });
  }

  return (
    <form className="input-register" onSubmit={onSubmitFormHandler}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        placeholder="Masukkan nama anda"
        value={name}
        onChange={onNameChangeHandler}
        autoComplete="off"
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Masukkan email anda"
        value={email}
        onChange={onEmailChangeHandler}
        autoComplete="off"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        placeholder="Masukkan password anda"
        value={password}
        onChange={onPasswordChangeHandler}
      />
      <button>Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegisterInput;
