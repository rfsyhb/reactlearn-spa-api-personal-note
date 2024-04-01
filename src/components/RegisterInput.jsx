import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

function RegisterInput({ register }) {
  const [name, onNameChangeHandler] = useInput("");
  const [email, onEmailChangeHandler] = useInput("");
  const [password, onPasswordChangeHandler] = useInput("");

  const onSubmitFormHandler = (e) => {
    e.preventDefault();

    // props yang diambil dari RegisterPage
    // untuk melakukan API
    register({ name, email, password });
  };

  return (
    <form className="input-register" onSubmit={onSubmitFormHandler}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        placeholder="Masukkan nama anda"
        value={name}
        onChange={onNameChangeHandler}
        autoComplete="off"
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="Masukkan email anda"
        value={email}
        onChange={onEmailChangeHandler}
        autoComplete="off"
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Masukkan password anda"
        value={password}
        onChange={onPasswordChangeHandler}
      />
      <button>Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
