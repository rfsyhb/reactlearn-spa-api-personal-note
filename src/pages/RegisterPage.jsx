import { register } from "../utils/network-data";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";

function RegisterPage() {
  const navigate = useNavigate();

  const onRegisterHandler = async (userData) => {
    const { error } = await register(userData);

    if (!error) {
      navigate("/");
    }
  };

  return (
    <section className="register-page">
      <h2>Registrasi untuk API</h2>
      <RegisterInput register={onRegisterHandler} />
      <p>
        Kembali ke <Link to="/">Login</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
