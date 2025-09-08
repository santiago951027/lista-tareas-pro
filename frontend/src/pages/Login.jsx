import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, login } = useContext(AuthContext);
  const navigate = useNavigate();

  // 👇 Redirigir si ya está logueado
  useEffect(() => {
    if (token) {
      navigate("/tasks");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.token);
      navigate("/tasks");
    } catch (err) {
      alert("Credenciales inválidas: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
