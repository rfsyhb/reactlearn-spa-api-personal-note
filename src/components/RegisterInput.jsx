import React from "react";
import PropTypes from "prop-types";

function RegisterInput({ register }) {
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const onNameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

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
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="Masukkan email anda"
        value={email}
        onChange={onEmailChangeHandler}
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
