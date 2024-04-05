import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/network-data";
import RegisterInput from "../components/RegisterInput";

function RegisterPage() {
  const navigate = useNavigate();

  async function onRegisterHandler(userData) {
    const { error } = await register(userData);

    // pindah ke halaman utama
    if (!error) {
      navigate("/");
    }
  }

  return (
    <section className="register-page">
      <h2>Registrasi pada API</h2>
      <RegisterInput onRegister={onRegisterHandler}/>
      <p>
        Kembali ke <Link to="/">Login</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
