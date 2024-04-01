import React from "react";
import PropTypes from "prop-types";

function LoginInput({ login }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    login({ email, password });
  };

  return (
    <form className="input-login" onSubmit={onSubmitHandler}>
      <input type="email" value={email} onChange={onEmailChangeHandler} />
      <input
        type="password"
        value={password}
        onChange={onPasswordChangeHandler}
      />
      <button>Login</button>
    </form>

    // kemdudian akan update sendiri karena state updated
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
